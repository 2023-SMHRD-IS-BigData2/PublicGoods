import pandas as pd
import os
import uuid
import json
import time
import re
import requests
from typing import Dict
from typing import List
from typing import Union


def read_json(data_path: str) -> dict:
    with open(data_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data


def get_ocr_meta(data: Dict) -> List[Dict]:
    num_of_images = len(data["images"])
    succeed_images = []
    for idx in range(num_of_images):
        image = data["images"][idx]
        if image["inferResult"] == "SUCCESS":
            succeed_images.append(image["fields"])
    return succeed_images


def split_dataframe(data: List[Dict]) -> List[Dict[str, pd.DataFrame]]:
    results = []
    for idx, d in enumerate(data):
        d = pd.DataFrame(d)
        split_str = "단위"
        split_index = d[d.inferText.str.contains(split_str)].index[0]
        after, before = d.iloc[:split_index, ], d.iloc[split_index:, ]
        results.append({"after": after, "before": before})
    return results


def parse_dates_from_series(series):
    # 날짜 형식을 식별하기 위한 정규 표현식
    date_pattern_1 = re.compile(r'\d{4}[-.]\d{2}[-.]\d{2}')  # yyyy.mm.dd 혹은 yyyy-mm-dd
    date_pattern_2 = re.compile(r'(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일')  # yyyy년 mm월 dd일

    dates = []
    # 첫 번째 패턴에 대해 검사
    for value in series:
        if re.match(date_pattern_1, str(value)):
            dates.append(value)

    # 두 번째 패턴에 대해 검사
    temp_date = ''
    for value in series:
        if '년' in value or '월' in value or '일' in value:
            temp_date += re.sub(r'\s+', '', value)  # 공백 제거
            if '일' in value:
                dates.append(temp_date)
                temp_date = ''

    return dates


def dataframe_to_str_list(data: pd.DataFrame) -> List:
    # 새로운 리스트를 준비합니다.
    combined_lines = []
    temp_line = ''  # 임시 문자열 초기화

    # 데이터 프레임을 순회합니다.
    for index, row in data.iterrows():
        # 현재 row의 inferText가 문자로만 구성되었는지 확인합니다.
        if row['inferText'].replace(" ", "").isalpha():  # 공백을 제거하고 알파벳 문자로만 구성되었는지 확인
            # 문자로만 구성된 경우, 바로 temp_line에 추가합니다.
            if temp_line and not temp_line.endswith('|'):
                temp_line += ' '  # 이전 문자열이 '|'로 끝나지 않으면 공백 추가
            temp_line += row['inferText']
        else:
            # 숫자 또는 그 외의 경우, '|'를 앞에 추가합니다.
            temp_line += '|' + row['inferText']

        # lineBreak가 True인 경우, 현재까지의 임시 문자열을 리스트에 추가하고 임시 문자열을 초기화합니다.
        if row['lineBreak']:
            combined_lines.append(temp_line.strip())  # strip()을 사용하여 문자열 양 끝의 공백을 제거
            temp_line = ''  # 임시 문자열 초기화

    return combined_lines


def post_processing(data: List, num_of_cols: int):
    post_processing = []
    for line in data:
        parts = line.split('|')
        parts = [p for p in parts if len(p) > 0]
        if len(parts) > num_of_cols:
            post_processing.append(parts)
    return post_processing


class OcrResultPostProcessing(object):

    def __init__(
            self,
    ):
        self._ocr_result = None
        self._num_of_images = None
        self._final_result = None

    @property
    def ocr_result(self) -> Dict:
        return self._ocr_result

    @property
    def final_result(self) -> Dict:
        return self._final_result

    @ocr_result.setter
    def ocr_result(self, result: Union[str, Dict]):
        if isinstance(result, Dict):
            self._ocr_result = result
        else:
            if isinstance(result, str):
                if os.path.isfile(result):
                    self._ocr_result = read_json(result)
                else:
                    raise ValueError(f"Invalid file path: {result}")

    def postprocess(self):
        if self._ocr_result is None:
            raise ValueError("No OCR result setup")
        else:
            results = {}
            ocr_result = self._ocr_result.copy()
            images_dict = get_ocr_meta(ocr_result)

            self._num_of_images = len(images_dict)

            dataframes = split_dataframe(images_dict)

            for idx, dataframe in enumerate(dataframes):  # loop for num of images
                dates = parse_dates_from_series(dataframe["after"].inferText)
                data_list = dataframe_to_str_list(dataframe["before"])
                final_data = post_processing(data_list, num_of_cols=len(dates))
                column_names = ["Indicator"] + dates
                final_dataframe = pd.DataFrame(data=final_data, columns=column_names)
                results[f"image_{idx}"] = final_dataframe
            self._final_result = results
            return self._final_result


class NaverOCR(object):

    def __init__(
            self,
            api_url: str,
            secret_key: str):

        self.api_url = api_url
        self.secret_key = secret_key

    def get_result(self, img_path: str) -> dict:
        """
        :param img_path: 여기에 이미지 경로가 들어온다. 사용자에게 받을 때에는 서버내 저장된 이미지 경로를 입력한다.
        """
        try:
            if not os.path.isfile(img_path):
                raise FileNotFoundError("img_path does not exist")
            files = [(
                'file', open(img_path, 'rb')
            )]
            _payload = {'images': [{'format': 'jpg', 'name': 'demo'}],
                        'requestId': str(uuid.uuid4()),
                        'version': 'V2',
                        'timestamp': int(round(time.time() * 1000))}
            payload = {'message': json.dumps(_payload).encode('UTF-8')}
            headers = {
                'X-OCR-SECRET': self.secret_key,
            }
            response = requests.request("POST", self.api_url, headers=headers, data=payload, files=files)
            result = response.json()
            return result
        except Exception as e:
            print(f"{e} 알수 없는 에러가 발생하였습니다")
            return {}


if __name__ == '__main__':
    ocr = NaverOCR(
        api_url="https://5jhnjwjjza.apigw.ntruss.com/custom/v1/28004/94c60e18d0f07e16d2c25442c7a6c7dc86a8e362f8dc888c4cc5c71886cb8278/general",
        secret_key="eG93a2ZjYlNhaXFCSWJSTVdueWFxWWVrTFRkT0NnWXc=")
    post_processor = OcrResultPostProcessing()

    # Test 수행시
    result = ocr.get_result(img_path="bs_2years.jpg")
    post_processor.ocr_result = result
    ocr_dataframes = post_processor.postprocess()
    print(ocr_dataframes)

    # 실제 서비스 수행시
    result = ocr.get_result(img_path="해당 경로에는 서버 안에서 해당 사용자가 올린 재무제표 image 파일 경로를 가져와야 함")
    post_processor.ocr_result = result
    ocr_dataframes = post_processor.postprocess()
    print(ocr_dataframes)  # 데이터프레임으로 변경된 해당 파일을 DB에 저장해야 함

