from sqlalchemy.dialects.mysql import CHAR, VARCHAR, DATETIME, TEXT, INTEGER, FLOAT, TINYINT, DOUBLE
from sqlalchemy import create_engine, Column, ForeignKeyConstraint
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError
from passlib.hash import sha512_crypt
from datetime import datetime
from uuid import uuid4

from app.analysis_module import NAICS_DEFAULT_RATES

from typing import Union, Dict
import json

class RandomNumber :
    def __init__(self) :
        self.numberCode = datetime.now().strftime("%Y%m%d") + str(uuid4()).replace('-', '').upper()

    def getNumber(self) -> str :
        return self.numberCode

Base = declarative_base()  # class

class DatabaseHandler:  # SQLAlchemy 세션 시작 부분
    def __init__(self):
        self.engine = create_engine(
            "mysql+pymysql://publicgoods:publicgoods01@project-db-campus.smhrd.com:3307/publicgoods", echo=True)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

class moolLoan_user_table(Base):  # moolLoan_user_table 매핑
    __tablename__ = 'moolLoan_user_table'
    __table_args__ = {'comment': '사용자_정보_테이블'}

    user_unique_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='사용자_고유정보',
                                default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    user_id = Column(VARCHAR(30), nullable=False, unique=True, comment='사용자_아이디')
    user_password = Column(VARCHAR(128), nullable=False, comment='사용자 비밀번호')
    user_type = Column(VARCHAR(10), nullable=False, comment='사용자_회원타입')
    business_num = Column(INTEGER, comment='사업자_번호')
    user_joinDate = Column(DATETIME, nullable=False, default=datetime.now(), comment='사용자_가입일자')

class moolLoan_user_documents_table(Base):  # moolLoan_user_documents_table 매핑
    __tablename__ = 'moolLoan_user_documents_table'
    __table_args__ = {'comment': '사용자_문서평가_테이블'}

    user_unique_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='사용자 고유번호')
    non_finance_unique_number = Column(VARCHAR(50), nullable=False, unique=True, comment='비재무문서번호',
                                       default=(str(datetime.now().year) + str(uuid4()).replace('-', '').upper()))
    finance_unique_number = Column(VARCHAR(50), nullable=False, unique=True, comment='재무문서번호',
                                   default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    deep_result = Column(TEXT, nullable=True, comment='분석결과')
    approval_status = Column(CHAR(1), nullable=False, comment='승인상태')

    ForeignKeyConstraint(['user_unique_number'], ['moolLoan_user_table.user_unique_number'], onupdate='CASCADE')

# class non_financial_documents_table(Base):  # non_financial_documents_table 매핑
#     __tablename__ = 'non_financial_documents_table'
#     __table_args__ = {'comment': '비재무_문서_테이블'}

#     document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호',
#                              default=(datetime.now().strftime('%Y%m%d') + str(uuid4()).replace('-', '')).upper())
#     non_finance_unique_number = Column(VARCHAR(50), nullable=False, comment='비재무문서번호')
#     delinquency_status = Column(CHAR(1), nullable=True, comment='연체여부')
#     pay_pre_loan_status = Column(CHAR(1), nullable=True, comment='대출청산여부')
#     loan_period = Column(INTEGER, nullable=True, comment='대출보유기간(월)')
#     franchaise = Column(CHAR(1), nullable=True, comment='계열사여부')
#     loan_amount = Column(INTEGER, nullable=True, comment='보증금액(만원)')
#     city = Column(CHAR(1), nullable=True, comment='수도권여부')
#     employee_no = Column(INTEGER, nullable=True, comment='고용인원수')
#     bank_loan_amount = Column(INTEGER, nullable=True, comment='대출금액')
#     ForeignKeyConstraint(['non_finance_unique_number'], ['moolLoan_user_documents_table.non_finance_unique_number'],
#                          onupdate='CASCADE')
    
class non_financial_documents_table(Base):
    __tablename__ = 'non_financial_documents_table'
    __table_arge__ = {'comment': '비재무_문서_테이블'}

    document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호')
    non_finance_unique_number = Column(VARCHAR(50), nullable=False, comment='비재무문서번호')
    ChgOffDate = Column(TINYINT, nullable=True, comment='연체여부')
    ChgOffPrinGr = Column(TINYINT, nullable=True, comment='대출청산')
    Term = Column(DOUBLE, nullable=True, comment='대출기간(월)')
    FranchiseCode = Column(TINYINT, nullable=True, comment='계열사여부')
    SBA_Appv = Column(DOUBLE, nullable=True, comment='보증금(만원)')
    UrbanRural = Column(TINYINT, nullable=True, comment='수도권')
    RetainedJob = Column(INTEGER, nullable=True, comment='고용인원수')
    GrAppv = Column(DOUBLE, nullable=True, comment='대출금액(만원)')
    naics_code = Column(VARCHAR(10), nullable=True, comment='NAICS')
    default_rate = Column(INTEGER, nullable=True, comment='DEFAULT_RATE')
    sba_appv_rate = Column(DOUBLE, nullable=True, comment='대출승인비율')
    ForeignKeyConstraint(['non_finance_unique_number'], ['moolLoan_user_documents_table.non_finance_unique_number'],
                         onupdate='CASCADE')

class financial_documents_table(Base):  # financial_documents_table 매핑
    __tablename__ = 'financial_documents_table'
    __table_args__ = {'comment': '재무_문서_테이블'}

    document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호',
                             default=(datetime.now().strftime('%Y%m%d') + str(uuid4()).replace('-', '')).upper())
    finance_unique_number = Column(VARCHAR(50), nullable=False, comment='재무문서번호')
    revenue = Column(FLOAT, nullable=False, comment='매출액')
    operating_profit = Column(FLOAT, nullable=False, comment='영업이익')
    operating_profit_reported_basis = Column(FLOAT, nullable=False, comment='영업이익(발표기준)')
    net_income = Column(FLOAT, nullable=False, comment='당기순이익')
    NIACI = Column(FLOAT, nullable=False, comment='지배주주순이익')
    total_assets = Column(FLOAT, nullable=False, comment='자산총계')
    total_liabilities = Column(FLOAT, nullable=False, comment='부채총계')
    total_equity = Column(FLOAT, nullable=False, comment='자본총계')
    EACI = Column(FLOAT, nullable=False, comment='지배주주지분')
    EANCI = Column(FLOAT, nullable=False, comment='비지배주주지분')
    capital_stock = Column(FLOAT, nullable=False, comment='자본금')
    debt_ratio = Column(FLOAT, nullable=False, comment='부채비율')
    retention_ratio = Column(FLOAT, nullable=False, comment='유보율')
    operating_profit_margin = Column(FLOAT, nullable=False, comment='영업이익률')
    NIMACI = Column(FLOAT, nullable=False, comment='지배주주순이익률')
    PER = Column(FLOAT, nullable=False, comment='PER')
    EPS = Column(FLOAT, nullable=False, comment='EPS(원)')
    PBR = Column(FLOAT, nullable=False, comment='PBR')
    Sector_Code = Column(VARCHAR(10), nullable=False, comment='Sector_Code')
    ForeignKeyConstraint(['finance_unique_number'], ['moolLoan_user_documents_table.finance_unique_number'],
                         onupdate='CASCADE')

class simple_financial_documents_table(Base):
    __tablename__ = 'simple_financial_documents_table'
    __table_args__ = {'comment': '간단_재무_문서_테이블', 'extend_existing': True}

    document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호',
                             default=(datetime.now().strftime('%Y%m%d') + str(uuid4()).replace('-', '')).upper())
    finance_unique_number = Column(VARCHAR(50), nullable=False, comment='재무문서번호')
    finance_ocr_info = Column(TEXT, nullable=False, comment='OCR_재무정보')
    ForeignKeyConstraint(['finance_unique_number'], ['moolLoan_user_documents_table.finance_unique_number'], onupdate='CASCADE')

def insertUser(user_id : str, user_password : str, user_type : str, business_num : str = None) -> bool :
    row = 0
    rowBoolean = False

    with DatabaseHandler().session as session:
        user_unique_number = RandomNumber().getNumber()
        user_password = sha512_crypt.hash(str(user_password))
        newAccount = moolLoan_user_table(
            user_unique_number=user_unique_number,
            user_id=user_id,
            user_password=user_password,
            user_type=user_type,
            business_num = business_num
        )
        newDocuTable = moolLoan_user_documents_table(
            user_unique_number=user_unique_number,
            non_finance_unique_number = RandomNumber().getNumber(),
            finance_unique_number = RandomNumber().getNumber(),
            deep_result='결과없음',
            approval_status='N'
        )
        try:
            session.begin(); session.add(newAccount); row = len(session.new)
        except SQLAlchemyError as e:
            print('SQLAlchemyUserInsertError! : ' + str(e))
            session.rollback()
        except Exception as e:
            print('ERROR! : ' + str(e))
            session.rollback()
        finally:
            if row == 1:
                try:
                    session.commit(); session.add(newDocuTable); row = len(session.new)
                    if row == 1:
                        session.commit(); rowBoolean = True
                    else:
                        session.rollback()
                except SQLAlchemyError as e:
                    print('SQLAlchemyUserDocumnetsInsertError! : ' + str(e))
                    session.rollback()
                    session.delete(newAccount)
                    session.commit()
                except Exception as e:
                    print('ERROR! : ' + str(e))
                    session.rollback()
                    session.delete(newAccount)
                    session.commit()

    return rowBoolean


def selectUser(user_id : str, user_password : str) -> Dict :
    userInfo = None

    with DatabaseHandler().session as session:
        try:
            session.begin()
            loginUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
            if loginUser and sha512_crypt.verify(user_password, loginUser.user_password):
                userInfo = {'user_id': loginUser.user_id, 'user_password': loginUser.user_password, 'user_type' : loginUser.user_type}
            session.commit()
        except SQLAlchemyError as e:
            print('SQLAlchemyUserSelectError! : ' + str(e))
            session.rollback()
            userInfo = {'user_id' : None}
        except Exception as e:
            print('ERROR! : ' + str(e))
            session.rollback()
            userInfo = {'user_id' : None}

    return userInfo


def updateUser(user_id : str, user_password : str, new_id : str = None , new_password : str = None) -> bool :
    row = 0
    updateBoolean = False
    changeUser = selectUser(user_id, user_password)

    if changeUser:
        with DatabaseHandler().session as session:
            try:
                if new_id is None: new_id = user_id
                if new_password is None:
                    new_password = user_password
                else:
                    new_password = sha512_crypt.hash(str(new_password))
                session.begin()
                session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).update({
                    moolLoan_user_table.user_id: new_id,
                    moolLoan_user_table.user_password: new_password
                })
                row = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).count()
                if row == 1:
                    session.commit(); updateBoolean = True
                else:
                    session.rollback()
            except SQLAlchemyError as e:
                print('SQLAlchemyUpdateUserError! : ' + str(e))
                session.rollback()
            except Exception as e:
                print('ERROR! : ' + str(e))
                session.rollback()

    return updateBoolean


def findDocuNum(user_id : str) -> Union[bool, Dict] :
    result = None

    with DatabaseHandler().session as session:
        try:
            session.begin()
            FindUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
            if FindUser:
                findDocuNum = session.query(moolLoan_user_documents_table).filter(
                    moolLoan_user_documents_table.user_unique_number == FindUser.user_unique_number).first()
                if findDocuNum: result = {'NonFinNum': findDocuNum.non_finance_unique_number,
                                          'FinNum': findDocuNum.finance_unique_number}
            session.commit()
        except SQLAlchemyError as e:
            print('SQLAlchemyFindDocuNumError! : ' + str(e))
            session.rollback()
        except Exception as e:
            print('ERROR! : ' + str(e))
            session.rollback()

    return result

def insertSimpleFinancial(user_id : str, SimpleFin : str) -> bool :
    FinNum = findDocuNum(user_id)['FinNum']
    insertBoolean = False
    row = 0
    
    if not FinNum :
        return insertBoolean
    else :
        with DatabaseHandler().session as session :
            SimpleFinDocu = simple_financial_documents_table(
                 finance_unique_number = FinNum,
                finance_ocr_info = SimpleFin
            )
            try :
                session.begin(); session.add(SimpleFinDocu); row = len(session.new)
                if row == 1 : 
                    session.commit(); insertBoolean = True
                else :
                    session.rollback()
            except SQLAlchemyError as e :
                print('SQLAlchemyinsertSimpleFinDocuError! : ' + str(e))
            except Exception as e :
                print('ERROR! : ' + str(e))
            
    return insertBoolean
            


def insertFinancial(user_id : str, FinJson : str) -> bool :
    FinNum = findDocuNum(user_id)['FinNum']
    insertBoolean = False
    row = 0

    if not FinNum:
        return insertBoolean
    else:
        with DatabaseHandler().session as session:
            FinJson = json.loads(FinJson)
            FinDocu = financial_documents_table(
                finance_unique_number=FinNum,
                revenue=FinJson['매출액'],
                operating_profit=FinJson['영업이익'],
                operating_profit_reported_basis=FinJson['영업이익(발표기준)'],
                net_income=FinJson['당기순이익'],
                NIACI=FinJson['지배주주순이익'],
                EANCI=FinJson['비지배주주순이익'],
                total_assets=FinJson['자산총계'],
                total_liabilities=FinJson['부채총계'],
                total_equity=FinJson['자본총계'],
                EACI=FinJson['지배주주지분'],
                capital_stock=FinJson['자본금'],
                debt_ratio=FinJson['부채비율'],
                retention_ratio=FinJson['유보율'],
                operating_profit_margin=FinJson['영업이익률'],
                NIMACI=FinJson['지배주  주순이익률'],
                PER=FinJson['PER'],
                EPS=FinJson['EPS(원)'],
                PBR=FinJson['PBR'],
                Sector_Code=FinJson['Sector_Code']
            )
            try:
                session.begin(); session.add(FinDocu); row = len(session.new)
                if row == 1:
                    session.commit(); insertBoolean = True
                else:
                    session.rollback()
            except SQLAlchemyError as e:
                print('SQLAlchemyinsertFinDocuError! : ' + str(e))
                session.rollback()
            except Exception as e:
                print('ERROR! : ' + str(e))
                session.rollback()

    return insertBoolean


def insertNonFinancial(user_id : str, NonFinJson : str) -> bool :
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    insertBoolean = False
    row = 0
    if not NonFinNum:
        return insertBoolean
    else:
        with DatabaseHandler().session as session:
            NonFinJson = json.loads(NonFinJson)
            NonFinDocu = non_financial_documents_table(
                non_finance_unique_number=NonFinNum,
                delinquency_status=NonFinJson['연체여부'],
                pay_pre_loan_status=NonFinJson['대출청산여부'],
                loan_period=NonFinJson['대출보유기간(월)'],
                franchaise=NonFinJson['계열사여부'],
                loan_amount=NonFinJson['보증금액(만원)'],
                city=NonFinJson['수도권여부'],
                employee_no=NonFinJson['고용인원수'],
                bank_loan_amount=NonFinJson['대출금액']
            )
            try:
                session.begin(); session.add(NonFinDocu); row = len(session.new)
                if row == 1:
                    session.commit(); insertBoolean = True
                else:
                    session.rollback()
            except SQLAlchemyError as e:
                print('SQLAlchemyInsertNonFinDocuError! : ' + str(e))
                session.rollback()
            except Exception as e:
                print('ERROR! : ' + str(e))
                session.rollback()

    return insertBoolean


def updateNonFinancial(user_id : str, NonFinJson : str) -> bool :  # return Boolean
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    updateBoolean = False
    row = 0
    if not NonFinNum:
        return updateBoolean
    else:
        with DatabaseHandler().session as session:
            NonFinJson = json.loads(NonFinJson)
            naics_code = NonFinJson['NAICS']
            default_rate = None
            sba_appv_rate = None
            try :
                default_rate = naics_code.map(NAICS_DEFAULT_RATES)
            except ValueError as e :
                print('ValueError! : ' + str(e))
                default_rate = 19
            i = NonFinJson['대출금액']; j = NonFinJson['보증금액(만원)']
            try:
                sba_appv_rate = (i - j) / i
            except ValueError as e :
                print('ValueError! : ' + str(e))
                sba_appv_rate = 0

            try:
                session.begin()
                # TODO : 구현완료하시면 주석은 제외해주세요
                # 1. 프론트에서 NAICS 코드 입력받아야 하죠 (한국산업대분류코드)
                # 2. NAICS 코드를 잘 모를 경우 그냥 '00'
                # 3. naics_code 컬럼 추가
                # 4. default_rate 컬럼 추가
                # 5. sba_appv_rate 컬럼 추가
                session.query(non_financial_documents_table). \
                    filter(non_financial_documents_table.non_finance_unique_number == NonFinNum).update({
                    non_financial_documents_table.delinquency_status: NonFinJson['연체여부'],  # ChgOffDate
                    non_financial_documents_table.pay_pre_loan_status: NonFinJson['대출청산여부'],  # ChgOffPrinGr
                    non_financial_documents_table.loan_period: NonFinJson['대출보유기간(월)'],  # Term
                    non_financial_documents_table.franchaise: NonFinJson['계열사여부'],       # FranchiseCode
                    non_financial_documents_table.loan_amount: NonFinJson['보증금액(만원)'],    # SBA_Appv
                    non_financial_documents_table.city: NonFinJson['수도권여부'],   # UrbanRural
                    non_financial_documents_table.employee_no: NonFinJson['고용인원수'],   # RetainedJob
                    non_financial_documents_table.bank_loan_amount: NonFinJson['대출금액'],  # GrAppv
                    non_financial_documents_table.naics_code: naics_code,  # 새로 추가됨
                    non_financial_documents_table.default_rate: default_rate,  # 새로 추가됨
                    non_financial_documents_table.sba_appv_rate: sba_appv_rate,   # 새로 추가됨
                })
                row = session.query(non_financial_documents_table). \
                    filter(non_financial_documents_table.non_finance_unique_number == NonFinNum).count()
                if row == 1:
                    session.commit(); updateBoolean = True
                else:
                    session.rollback()
            except SQLAlchemyError as e:
                print('SQLAlchemyUpdateNonDocuError! : ' + str(e))
                session.rollback()
            except Exception as e:
                print('ERROR! : ' + str(e))
                session.rollback()
    return updateBoolean

# def validateNonFinancialJson(NonFinJson):
#     required_keys = ['연체여부', '대출청산여부', '대출보유기간(월)', '계열사여부', '보증금액(만원)', '수도권여부', '고용인원수', '대출금액']
#     for key in required_keys:
#         if key not in NonFinJson:
#             return False
#     return True
