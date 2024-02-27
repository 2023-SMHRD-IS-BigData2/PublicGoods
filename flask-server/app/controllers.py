from app.analysis_module import NonFinancialModel
from app.analysis_module import FinancialModel
from app.analysis_module import NAICS_DEFAULT_RATES, KOR_NAICS_MAPPER

from app.models import selectUserType
from app.ocr import OcrResultPostProcessing
from app.ocr import NaverOCR
from typing import Union, Tuple
import pandas as pd
import numpy as np
import json
import os

def changeAnswer(answer : Union[str, float, int]) -> Union[str, float] :
        answer = answer[:4]
        if answer == '있습니다' : return 1
        elif answer == '없습니다' : return 0
        elif answer == '모릅니다' : return None
        else :
            float_answer = float(answer)
            if isinstance(float_answer, float) : return float_answer
            else : answer

class JsonDataProcessing :
    def __init__(self, AnyFinJson : Union[str, dict]) -> None :
        if isinstance(AnyFinJson, str) : self.AnyFinDict = json.loads(AnyFinJson)
        elif isinstance(AnyFinJson, dict) : self.AnyFinDict = AnyFinJson
    
        # self.NonFinNewKey = ['연체여부', '대출청산여부', '대출보유기간(월)', '계열사여부', '보증금액(만원)', '수도권여부', '고용인원수', '대출금액']
        self.NonFinNewKey = ['ChgOffDate', 'ChgOffPrinGr', 'Term', 'FranchiseCode', 'SBA_Appv', 'UrbanRural', 'RetainedJob', 'GrAppv']
        # naics_code, default_rate, sba_appv_rate
        self.NonFinaddKey = ['naics_code', 'default_rate', 'sba_appv_rate']

        self.FinNewKey = ['매출액', '영업이익', '영업이익(발표기준)', '당기순이익', '지배주주순이익', '비지배주주순이익', '자산총계', 
                          '부채총계', '자본총계', '지배주주지분', '비지배주주지분', '자본금', '부채비율', '유보율', '영업이익률',
                          '지배주주순이익률', 'PER', 'EPS(원)', 'PBR', 'Sector_Code']

    def changeNonFinKey(self) -> dict :
        if len(self.AnyFinDict) != len(self.NonFinNewKey) : return None
        NonFinOldKey = list(self.AnyFinDict.keys())

        for old, new in zip(NonFinOldKey, self.NonFinNewKey) :
            self.AnyFinDict[new] = self.AnyFinDict.pop(old)

        return self.AnyFinDict
    
    def changeFinKey(self) -> dict :
        if len(self.AnyFinDict) != len(self.FinNewKey) : return None
        FinOldKey = list(self.AnyFinDict.keys())

        for old, new in zip(FinOldKey, self.FinNewKey) :
            self.AnyFinDict[new] = self.AnyFinDict.pop(old)
        
        return self.AnyFinDict
    
    def changeNonFinValue(self, user_id) -> dict :
        if len(self.AnyFinDict) != len(self.NonFinNewKey) : return None 

        for temp in self.NonFinNewKey :
            self.AnyFinDict[temp] = changeAnswer(self.AnyFinDict[temp])

        code = selectUserType(user_id)

        if code == 'Bank' : return None
        else : self.AnyFinDict['naics_code'] = code

        try : code = NAICS_DEFAULT_RATES[code]
        except KeyError : code = 19
        self.AnyFinDict['default_rate'] = code

        try : 
            sba_appv_rate = (self.AnyFinDict['GrAppv'] - self.AnyFinDict['SBA_Appv']) /  self.AnyFinDict['GrAppv']
        except (TypeError, ValueError, ZeroDivisionError) as e :
            print('ERROR! : ' + str(e))
            sba_appv_rate = 0

        self.AnyFinDict['sba_appv_rate'] = sba_appv_rate

        return self.AnyFinDict
    
    def runningNonFinModel(self) -> np.ndarray :
        data = pd.DataFrame([self.AnyFinDict])
        model = NonFinancialModel.load('파일경로')
        predictions = model.predict(data, pred_prob=False)

        return predictions

    def runningFinModel(self) -> Union[np.ndarray, Tuple[np.ndarray, np.ndarray]] :
        data = pd.DataFrame([self.AnyFinDict])
        model = FinancialModel.load('./analysis_module/FinModel/')
        predictions = model.predict(data, pred_prob=False)

        return predictions
    
class SimpleDocuProcessing : 
    def __init__(self, SimpleFinJson : Union[str, dict]) -> None :
        if isinstance(SimpleFinJson, str) : self.SimpleFinDict = json.loads(SimpleFinJson)
        elif isinstance(SimpleFinJson, dict) : self.SimpleFinDict = SimpleFinJson
        temp = next(iter(self.SimpleFinDict.keys()))
        self.SimpleFinDict = self.SimpleFinDict[temp]

        self.SimpleFinNewKey = ['매출액', '영업이익', '총자산', '총부채']

    def CombineData(self) -> dict :
        # 데이터 결합 부분
        return None
    
    def runningSimpleFinModel(self) :
        # 데이터 모델에 넣고 돌리는 부분
        return None
    
def getOCRresult(path : str, url : str, key : str) :

    ocr = NaverOCR(api_url = url, secret_key = key)
    post_processor = OcrResultPostProcessing()
    result = ocr.get_result(img_path = path)
    post_processor.ocr_result = result
    ocr_dataframes = post_processor.postprocess()

    final_result = {}
    for key, df in ocr_dataframes.items():
            final_result[key] = df.to_json(orient='records')
    
    final_result = json.loads(final_result['image_0'])

    return final_result

filepath = {
    '건강 관리 및 사회 지원_growth_result' : '71',
    '건설업_growth_result' : '23',
    '공익_공과 사업(수도·전기·가스)_growth_result' : '92',
    '광업_growth_result' : '21',
    '교육 서비스업_growth_result' : '61',
    '금융 및 보험업_growth_result' : '52',
    '기타 서비스(공공행정 제외)_growth_result' : '81',
    '농업, 임업 및 어업_growth_result' : '11',
    '소매_growth_result' : '42',
    '숙박 및 음식점업_growth_result' : '72',
    '예술, 스포츠 및 여가관련 서비스업_growth_result' : '62',
    '운수 및 창고업_growth_result' : '22',
    '운수 및 창고업_growth_result' : '48',
    '전기, 가스, 증기 및 공기 조절 공급업_growth_result' : '22',
    '전문, 과학 및 기술 서비스업_growth_result' : '54',
    '정보_통신_growth_result' : '51',
    '제조업_growth_result' : '31'
}

def getKORNAICSmapper(user_id : str) -> str :
    userTypeString = None
    user_type = selectUserType(user_id)
    if not user_type : return None
    if user_type == 'BBB' : return None
    for key, val in filepath.items() :
        if val == user_type :
            path = key
    if not path : return None
    return path
