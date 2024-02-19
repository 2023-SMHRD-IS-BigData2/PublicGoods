import pandas as pd
import numpy as np
from typing import List
from sklearn.preprocessing import minmax_scale

NEED_TO_CHECK_COLUMNS = ["ChgOffPrinGr", "GrAppv", "DisbursementGross", "BalanceGross", "SBA_Appv", "NAICS",
                         "MIS_Status"]

DELETE_COLUMNS = ["LoanNr_ChkDgt", "Name", "City", "State", "Zip", "Bank", "BankState",
                  "ApprovalDate", "ApprovalFY", "DisbursementDate"]

NON_FINANCIAL_COLUMNS = ['NAICS', 'Term', 'NoEmp', 'RetainedJob', 'FranchiseCode', 'UrbanRural',
                         'ChgOffDate', 'MIS_Status', 'ChgOffPrinGr', 'GrAppv', 'SBA_Appv',
                         'default_rate', 'SBA_Appv_Rate']

NAICS_DEFAULT_RATES = {
    '21': 8, '11': 9, '55': 10, '62': 10,
    '22': 14, '92': 15, '54': 19, '42': 19,
    '31': 19, '32': 16, '33': 14, '81': 20,
    '71': 21, '72': 22, '44': 22, '45': 23,
    '23': 23, '56': 24, '61': 24, '51': 25,
    '48': 27, '49': 23, '52': 28, '53': 29}

KOR_NAICS_MAPPER = {
    "기타 서비스(공공행정 제외)": "81",
    "제조": "31",
    "광업, 채석, 석유 및 가스 추출": "21",
    "광업, 채석, 석유 및 가스 추출, 채석, 석유 및 가스 추출": "21",
    "금융 및 보험": "52",
    "금융 및 금융 및 보험": "52",
    "금융 및 금융 및 금융 및 보험": "52",
    "소매": "42",
    "운수장비": "22",
    "건강 관리 및 사회 지원": "71",
    "숙박 및 음식 서비스": "72",
    "건설": "23",
    "운수창고업": "48",
    "섬유의복": "11",
    "공익/공과 사업(수도·전기·가스)": "92",
    "농업, 임업(산림업), 어업 및 수렵": "11",
    "정보/통신": "51"}

TARGET_YEARS = ["2018", "2019", "2020", "2021", "2022"]

FIXED_INDICATORS = ["매출액", "영업이익", "영업이익(발표기준)", "당기순이익", "지배주주순이익", "비지배주주순이익", "자산총계",
                    "부채총계", "자본총계", "지배주주지분", "비지배주주지분", "자본금", "부채비율", "유보율", "영업이익률",
                    "지배주주순이익률", "PER", "EPS(원)", "PBR"]


def convert_dollar_str_to_float(x: pd.Series) -> pd.Series:
    try:
        x = x.str.replace("$", "")
        x = x.str.replace(r"\s+", "", regex=True)
        x = x.str.replace(",", "").astype("float")
        return x
    except AttributeError as e:
        print(e)
    except TypeError as e:
        print(e)


def score_lr(data: pd.DataFrame, indicator_name: str, years: List[str]) -> float:
    sub_data = data.loc[data["Indicators"] == indicator_name, years].copy()
    sub_data = sub_data.T.dropna()

    try:
        if len(sub_data) < 3:
            raise Exception("can't calculate")

        sub_data = sub_data.apply(lambda x: minmax_scale(x))

        y = sub_data.values.ravel()
        y = y.astype("float")

        x = np.arange(1, len(y) + 1, 1)
        X = np.vstack([x, np.ones(len(x))]).T

        # 최소제곱법을 사용하여 선형 회귀 파라미터 계산 -> m : 계수, b : 절편
        m, b = np.linalg.lstsq(X, y, rcond=None)[0]

    except Exception:
        return -np.inf

    return m


def replace_inf_and_nan_with_smaller(row):
    # -np.inf와 NaN을 제외한 최소값 찾기
    valid_values = row.replace(-np.inf, np.nan)  # -np.inf를 NaN으로 일시적으로 변환
    min_value = valid_values.min(skipna=True)  # NaN을 무시하고 최소값 계산

    if pd.isna(min_value):  # 모든 값이 -np.inf 또는 NaN인 경우
        min_value = -1  # 기본값 설정

    # -np.inf와 NaN을 최소값보다 더 작은 값으로 대체
    row[row == -np.inf] = min_value - 1
    row[row.isna()] = min_value - 1

    return row


def preprocess_non_financial_data(data: pd.DataFrame) -> pd.DataFrame:
    not_exist_columns = list(set(NEED_TO_CHECK_COLUMNS) - set(data.columns))
    if len(not_exist_columns) > 0:
        str_not_exist_columns = ", ".join(not_exist_columns)
        raise ValueError(f"{str_not_exist_columns} not existed")

    data.ChgOffPrinGr = convert_dollar_str_to_float(data.ChgOffPrinGr)
    data.GrAppv = convert_dollar_str_to_float(data.GrAppv)
    data.DisbursementGross = convert_dollar_str_to_float(data.DisbursementGross)
    data.BalanceGross = convert_dollar_str_to_float(data.BalanceGross)
    data.SBA_Appv = convert_dollar_str_to_float(data.SBA_Appv)
    data.NAICS = data.NAICS.str[0:2]  # 앞 두 문자만 선택

    # CHGOFF => 'Loan status charged off' 대출 상태 청산 (대출회수 불가능)
    # PIF => 'Paid in full' 전액 상환 (대출 회수)
    data.MIS_Status = data.MIS_Status.str.replace(r"\s+", "", regex=True)

    # Drop NaN label
    label_na_index = data[data.MIS_Status.isna()].index
    data = data.drop(index=label_na_index)

    # Make Columns
    data['default_rate'] = data['NAICS'].map(NAICS_DEFAULT_RATES)
    data['default_rate'].fillna(np.floor(np.mean(list(NAICS_DEFAULT_RATES.values()))), inplace=True)

    # 대출 연제 일자 존재시 1 아닌 경우 0
    data.ChgOffDate = data.ChgOffDate.apply(lambda x: 0 if pd.isna(x) else 1)

    data["SBA_Appv_Rate"] = (data.GrAppv - data.SBA_Appv) / data.GrAppv  # (은행 승인 금액 - 대출 보증액) / 대출 보증액

    data = data.drop(columns=DELETE_COLUMNS)

    data.MIS_Status = data.MIS_Status.apply(lambda x: 0 if x == "PIF" else 1)

    data.RevLineCr = data.RevLineCr.apply(lambda x: 1 if x == 'Y' else 0)

    data.LowDoc = data.LowDoc.apply(lambda x: 1 if x == 'Y' else 0)

    data.NewExist = data.NewExist.fillna(0)

    return data


def preprocess_financial_data(data: pd.DataFrame) -> pd.DataFrame:
    # column name to string
    data.columns = [str(x) for x in data.columns.tolist()]
    data["Sector_Code"] = data["Company sector"].map(KOR_NAICS_MAPPER)

    # renames
    data = data.rename(columns={'IFRS(연결)': 'Indicators', '성장평가 (1: good, 0:bad)': 'Financial Evaluation'})
    # convert to numeric values
    data[TARGET_YEARS] = data[TARGET_YEARS].apply(lambda x: pd.to_numeric(x, errors='coerce'))

    # Sector Data
    company_sector = data[["Company code", "Sector_Code"]].drop_duplicates()
    company_meta = data[["Company code", "Financial Evaluation"]]

    merged_df = []
    for group_name, group_data in data.groupby("Company code"):

        results = {}
        for indicator in FIXED_INDICATORS:
            # Scoring from linear regression (coefficients score)
            results[indicator] = score_lr(group_data, indicator, TARGET_YEARS)

        group_data = group_data.set_index("Indicators")
        results = pd.DataFrame([results]).T
        results.columns = ["Slope_Score"]

        group_data_result = pd.concat([group_data, results], axis=1)
        merged_df.append(group_data_result)

    # Concatenation group dataset
    score_df = pd.concat(merged_df, axis=0)

    input_data = score_df.drop(columns=TARGET_YEARS)
    input_data = input_data.reset_index(names=["Indicators"])

    # Aggregation
    pivoted_input_data = input_data.pivot_table(index='Company code', columns='Indicators', values='Slope_Score',
                                                aggfunc='first')
    pivoted_input_data = pivoted_input_data[FIXED_INDICATORS]

    inf_count = (pivoted_input_data == -np.inf).sum(axis=1)

    # -inf 가 전체 컬럼에서 50% 이상인 것들은 제외함
    threshold = len(pivoted_input_data.columns) * 0.5
    rows_to_drop = inf_count[inf_count > threshold].index
    pivoted_input_data_cleaned = pivoted_input_data.drop(index=rows_to_drop)

    # apply 함수를 사용하여 각 행에 대해 함수 적용
    pivoted_input_data_cleaned = pivoted_input_data_cleaned.apply(replace_inf_and_nan_with_smaller, axis=1)

    # Generation Labels -> Financial Evaluation 50% 이상인 경우 1, else 0
    # 0 이면 Evaluation 이 좋은 기업 -> 대출 O
    # 1 이면 Evaluation 이 나쁜 기업 -> 대출 X
    company_meta = company_meta.groupby('Company code')['Financial Evaluation'].mean().reset_index()
    company_meta['Label'] = np.where(company_meta['Financial Evaluation'] > 0.5, 0, 1)

    company_meta = company_meta.set_index("Company code")
    company_sector = company_sector.set_index("Company code")

    company_meta_final = pd.concat([company_meta, company_sector], axis=1)

    final_input_data = pd.merge(
        pivoted_input_data_cleaned, company_meta_final[["Sector_Code", "Label"]], how="left", right_index=True,
        left_index=True)

    return final_input_data
