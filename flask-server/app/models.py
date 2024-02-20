from sqlalchemy import create_engine, Column, ForeignKeyConstraint
from sqlalchemy.dialects.mysql import CHAR, VARCHAR, DATETIME, TEXT, INTEGER, BIGINT, DECIMAL, FLOAT
from sqlalchemy.orm import sessionmaker, declarative_base, Mapped, mapped_column

from uuid import uuid4
from datetime import datetime
from passlib.hash import sha512_crypt

import pickle
import json

Base = declarative_base()

class DatabaseHandler :
    def __init__(self) :
        self.engine = create_engine("mysql+pymysql://publicgoods:publicgoods01@project-db-campus.smhrd.com:3307/publicgoods", echo=True)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

class moolLoan_user_table (Base) :
    __tablename__ = 'moolLoan_user_table'
    __table_args__ = {'comment': '사용자_정보_테이블'}

    user_unique_number = Column(CHAR(36), primary_key=True, nullable=False, comment='사용자_고유정보',
                                default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    user_id = Column(VARCHAR(30), nullable=False, unique=True, comment='사용자_아이디')
    user_password = Column(VARCHAR(128), nullable=False, comment='사용자 비밀번호')
    user_type = Column(CHAR(1), nullable=False, comment='사용자_회원타입')
    user_joinDate = Column(DATETIME, nullable=False, default=datetime.now(), comment='사용자_가입일자')
    
class moolLoan_user_documents_table (Base) :
    __tablename__ = 'moolLoan_user_documents_table'
    __table_args__ = {'comment' : '사용자_문서평가_테이블'}

    user_unique_number = Column(CHAR(36), primary_key=True, nullable=False, comment='사용자 고유번호')
    non_finance_unique_number = Column(CHAR(40), nullable=False, unique=True, comment='비재무문서번호',
                                       default=(str(datetime.now().year) + str(uuid4()).replace('-', '').upper()))
    finance_unique_number = Column(CHAR(40), nullable=False, unique=True, comment='재무문서번호',
                                   default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    deep_result = Column(TEXT, nullable=True, comment='분석결과')
    approval_status = Column(CHAR(1), nullable=False, comment='승인상태')

    ForeignKeyConstraint(['user_unique_number'], ['moolLoan_user_table.user_unique_number'], onupdate='CASCADE')

class non_financial_documents_table (Base) :
    __tablename__ = 'non_financial_documents_table'
    __table_args__ = {'comment': '비재무_문서_테이블'}

    document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호', 
                             default=(datetime.now().strftime('%Y%m%d') + str(uuid4()).replace('-', '')).upper())
    non_finance_unique_number = Column(CHAR(40), nullable=False, comment='비재무문서번호')
    delinquency_status = Column(CHAR(1), nullable=True, comment='연체여부')
    pay_pre_loan_status = Column(CHAR(1), nullable=True, comment='대출청산여부')
    loan_period = Column(INTEGER, nullable=True, comment='대출보유기간(월)')
    franchaise = Column(CHAR(1), nullable=True, comment='계열사여부')
    loan_amount = Column(INTEGER, nullable=True, comment='보증금액(만원)')
    city = Column(CHAR(1), nullable=True, comment='수도권여부')
    employee_no = Column(INTEGER, nullable=True, comment='고용인원수')
    bank_loan_amount = Column(INTEGER, nullable=True, comment='대출금액')
    ForeignKeyConstraint(['non_finance_unique_number'], ['moolLoan_user_documents_table.non_finance_unique_number'], onupdate='CASCADE')

class financial_documents_table (Base) :
    __tablename__ = 'financial_documents_table'
    __table_args__ = {'comment': '재무_문서_테이블'}

    document_number = Column(VARCHAR(50), primary_key=True, nullable=False, comment='문서고유번호',
                             default=(datetime.now().strftime('%Y%m%d') + str(uuid4()).replace('-', '')).upper() )
    finance_unique_number = Column(CHAR(40), nullable=False, comment='재무문서번호')
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
    Sector_Code = Column(FLOAT, nullable=False, comment='Sector_Code')
    ForeignKeyConstraint(['finance_unique_number'], ['moolLoan_user_documents_table.finance_unique_number'], onupdate='CASCADE')
    
def getHashStr(dataString) :
    dataString = str(dataString)
    hashed = sha512_crypt.hash(dataString)
    return hashed

def insertUser(user_id, user_password) : # 회원가입
    session = DatabaseHandler().session
    user_unique_number = str(datetime.now().year) + str(uuid4()).replace('-', '').upper()
    user_password = sha512_crypt.hash(str(user_password))
    newAccount = moolLoan_user_table(user_unique_number = user_unique_number, user_id = user_id, user_password = user_password, user_type = 'N')
    newDocuTable = moolLoan_user_documents_table(user_unique_number = user_unique_number, deep_result = '결과없음', approval_status = 'N')
    row = 0
    try :
        session.begin()
        session.add(newAccount)
        row = len(session.new)
        session.commit()
    except Exception as e :
        print('ERROR! : ' + str(e)) 
        session.rollback()
    finally :
        if row == 1 :
            try :
                session.add(newDocuTable)
                row = len(session.new)
                session.commit()
            except Exception as e : 
                print('ERROR! : ' + str(e))
                session.rollback()
            finally :
                if row == 1 : return True
                else : return False
        else : return False

def selectUser(user_id, user_password) : # 로그인
    session = DatabaseHandler().session
    try :
        session.begin()
        loginUser =  session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
        if loginUser and sha512_crypt.verify(user_password, loginUser.user_password):
            return {'user_id' : loginUser.user_id, 'user_password' : loginUser.user_password}
    except Exception as e :
        print('ERROR! : ' + str(e))
    finally :
        session.close()
    return None

def updateUser(user_id, user_password, new_id = None, new_password = None) :
    session = DatabaseHandler().session
    try :
        session.begin()
        changeUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
        if changeUser and sha512_crypt.verify(user_password, changeUser.user_password) :
            if new_id is None : new_id = user_id
            if new_password is None : new_password = changeUser.user_password
            else : new_password = sha512_crypt.hash(str(new_password))
            session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).update({
                moolLoan_user_table.user_id : new_id,
                moolLoan_user_table.user_password : new_password
            })
            session.commit()
            return {'user_id' : new_id}
    except Exception as e :
        print('ERROR! : ' + str(e))
        session.rollback()
    finally :
        session.close()
    return False

def findDocuNum(user_id) :
    session = DatabaseHandler().session
    result = None
    try :
        session.begin() 
        FindUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
        if FindUser :
            findDocuNum = session.query(moolLoan_user_documents_table).filter(
                moolLoan_user_documents_table.user_unique_number == FindUser.user_unique_number).first()
            if findDocuNum :
                result = {'NonFinNum' : findDocuNum.non_finance_unique_number, 'FinNum' : findDocuNum.finance_unique_number}
    except Exception as e :
        print('ERROR! : ' + str(e))
    finally :
        session.close()
        return result

def insertFinancial(user_id, FinJson) : # 업데이트문은 임시로 삭제 나중에 추가 예정
    FinNum = findDocuNum(user_id)['FinNum']
    row = 0
    if not FinNum :
        return row
    else :
        session = DatabaseHandler().session
        session.begin()
        FinJson = json.loads(FinJson)
        FinDocu = financial_documents_table(# document_number : 기본값 존재
            finance_unique_number = FinNum, # 외래키이기 때문에moolLoan_user_documents_table의 finance_unique_number을 받는다 
            revenue = FinJson['매출액'], # 이하 컬럼에 값을 대입
            operating_profit = FinJson['영업이익'], 
            operating_profit_reported_basis = FinJson['영업이익(발표기준)'], 
            net_income = FinJson['당기순이익'], 
            NIACI = FinJson['지배주주순이익'], 
            EANCI = FinJson['비지배주주순이익'], 
            total_assets = FinJson['자산총계'], 
            total_liabilities = FinJson['부채총계'], 
            total_equity = FinJson['자본총계'], 
            EACI = FinJson['지배주주지분'], 
            capital_stock = FinJson['자본금'], 
            debt_ratio = FinJson['부채비율'], 
            retention_ratio = FinJson['유보율'], 
            operating_profit_margin = FinJson['영업이익률'], 
            NIMACI=FinJson['지배주  주순이익률'], 
            PER=FinJson['PER'], 
            EPS=FinJson['EPS(원)'], 
            PBR=FinJson['PBR'], 
            Sector_Code=FinJson['Sector_Code']
        )
        try :
            session.add(FinDocu)
            row = len(session.new)
            if row == 1 : session.commit()
            else : session.rollback()
        except Exception as e :
            print('ERROR! : ' + str(e))
            session.rollback()
        finally :
            session.close()
            return row

def insertNonFinancial(user_id, NonFinJson) : # 비재무문서 튜플 추가
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    row = 0
    if not NonFinNum :
        return row
    else :
        session = DatabaseHandler().session
        session.begin()
        NonFinJson = json.loads(NonFinJson)
        NonFinDocu = non_financial_documents_table(# document_number : 기본값 존재
            non_finance_unique_number = NonFinNum, # 외래키
            delinquency_status = NonFinJson['연체여부'], # 이하 컬럼에 값을 대입
            pay_pre_loan_status = NonFinJson['대출청산여부'],
            loan_period = NonFinJson['대출보유기간(월)'],
            franchaise = NonFinJson['계열사여부'],
            loan_amount = NonFinJson['보증금액(만원)'],
            city = NonFinJson['수도권여부'],
            employee_no = NonFinJson['고용인원수'],
            bank_loan_amount = NonFinJson['대출금액']
        )
        try :
            session.add(NonFinDocu)
            row = len(session.new)
            if row == 1 : session.commit()
            else : session.rollback()
        except Exception as e :
            print('ERROR! : ' + str(e))
            session.rollback()
        finally :
            session.close()
            return row
        
def updateNonFinancial(user_id, NonFinJson):
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    row = 0
    if not NonFinNum:
        return row
    else:
        session = DatabaseHandler().session
        session.begin()
        NonFinJson = json.loads(NonFinJson)
        existing_doc = session.query(non_financial_documents_table).filter_by(non_finance_unique_number=NonFinNum).first()
        if existing_doc:
            try:
                existing_doc.delinquency_status = NonFinJson['연체여부']
                existing_doc.pay_pre_loan_status = NonFinJson['대출청산여부']
                existing_doc.loan_period = NonFinJson['대출보유기간(월)']
                existing_doc.franchaise = NonFinJson['계열사여부']
                existing_doc.loan_amount = NonFinJson['보증금액(만원)']
                existing_doc.city = NonFinJson['수도권여부']
                existing_doc.employee_no = NonFinJson['고용인원수']
                existing_doc.bank_loan_amount = NonFinJson['대출금액']
                session.commit()
                row = 1
            except Exception as e:
                print('ERROR! : ' + str(e))
                session.rollback()
            finally:
                session.close()
                return row
        else:
            return row
        
# def validateNonFinancialJson(NonFinJson):
#     required_keys = ['연체여부', '대출청산여부', '대출보유기간(월)', '계열사여부', '보증금액(만원)', '수도권여부', '고용인원수', '대출금액']
#     for key in required_keys:
#         if key not in NonFinJson:
#             return False
#     return True