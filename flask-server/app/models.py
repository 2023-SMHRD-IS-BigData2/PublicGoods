from sqlalchemy import create_engine, Column, ForeignKeyConstraint
from sqlalchemy.dialects.mysql import CHAR, VARCHAR, DATETIME, TEXT, INTEGER, BIGINT, DECIMAL
from sqlalchemy.orm import sessionmaker, declarative_base, Mapped, mapped_column

from uuid import uuid4
from datetime import datetime
from passlib.hash import sha512_crypt
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

    non_finance_unique_number = Column(CHAR(40), primary_key=True, nullable=False, comment='비재무문서번호')
    biz_taxcode = Column(VARCHAR(50), nullable=False, comment='기업_세번호')
    biz_address = Column(VARCHAR(50), nullable=False, comment='기업_주소')
    biz_industry = Column(VARCHAR(50), nullable=False, comment='기업_산업종류')
    biz_foundation_at = Column(INTEGER, nullable=False, comment='기업_창립년도')
    eco_edu = Column(TEXT, nullable=False, comment='대표학력')
    employee_no = Column(INTEGER, nullable=False, comment='종업원_수')
    credit_history = Column(TEXT, nullable=False, comment='신용이력')
    credit_score = Column(VARCHAR(50), nullable=False, comment='신용점수')
    loan_statue = Column(VARCHAR(50), nullable=False, comment='대출_상태')
    loan_amount = Column(BIGINT, nullable=False, comment='대출_금액')
    long_period = Column(VARCHAR(50), nullable=False, comment='대출_기간')
    pay_pre_loan_status = Column(CHAR(1), nullable=False, comment='기존대출_상환여부')
    bank_com_rel = Column(INTEGER, nullable=False, comment='은행과기업_관계')
    document_creation_date = Column(DATETIME, nullable=False, default=datetime.now(), comment='비재무_작성일자')
    document_score = Column(DECIMAL(5, 4), nullable=True, comment='비재무_평가점수')

    ForeignKeyConstraint(['non_finance_unique_number'], ['moolLoan_user_documents_table.non_finance_unique_number'], onupdate='CASCADE')

class FinancialDocument(Base):
    __tablename__ = 'financial_documents_table'
    __table_args__ = {'comment': '재무_문서_테이블'}

    finance_unique_number = Column(CHAR(40), primary_key=True, nullable=False, comment='재무문서번호')
    fiscal_year = Column(VARCHAR(50), nullable=False, comment='회계년도')
    curr_assets = Column(VARCHAR(50), nullable=False, comment='유동자산')
    inventory = Column(BIGINT, nullable=False, comment='재고자산')
    curr_liabilities = Column(BIGINT, nullable=False, comment='유동부채')
    total_liabilities = Column(BIGINT, nullable=False, comment='부채총계')
    share_equity = Column(BIGINT, nullable=False, comment='지배지분')
    working_capital = Column(BIGINT, nullable=False, comment='운전자금')
    curr_ratio = Column(DECIMAL(25, 3), nullable=False, comment='유동비율')
    quick_ratio = Column(DECIMAL(25, 3), nullable=False, comment='당좌비율')
    debt_to_equity = Column(DECIMAL(25, 3), nullable=False, comment='부채자본비율')
    receive_turnover = Column(INTEGER, nullable=False, comment='매출채권회전율')
    age_receivable = Column(DECIMAL(25, 3), nullable=False, comment='매출채권회전일수')
    inventory_turnover = Column(INTEGER, nullable=False, comment='재고자산회전율')
    age_inventory = Column(BIGINT, nullable=False, comment='재고자산회전일수')
    revenue = Column(BIGINT, nullable=False, comment='매출액')
    cogs = Column(BIGINT, nullable=False, comment='매출원가')
    gross_profit = Column(BIGINT, nullable=False, comment='매상총이익')
    rd_expense = Column(BIGINT, nullable=False, comment='연구개발비용')
    operating_profit = Column(BIGINT, nullable=False, comment='영업이익')
    net_profit = Column(BIGINT, nullable=False, comment='순이익')
    gro_profit_margin = Column(DECIMAL(25, 3), nullable=False, comment='수익률')
    rd_to_sales = Column(DECIMAL(25, 3), nullable=False, comment='연구개발비매출율')
    roe = Column(DECIMAL(25, 3), nullable=False, comment='자기자본이익률')
    roa = Column(DECIMAL(25, 3), nullable=False, comment='총자신이익율')
    ope_profit_margin = Column(DECIMAL(25, 3), nullable=False, comment='영업이익률')
    cf_investing = Column(BIGINT, nullable=False, comment='투자활동비용')
    cf_financing = Column(BIGINT, nullable=False, comment='금융활동비용')
    cf_operating = Column(BIGINT, nullable=False, comment='운영활동비용')
    document_creation_date = Column(DATETIME, nullable=False, default=datetime.now(), comment='재무_작성일자')
    document_score = Column(DECIMAL(5, 4), nullable=True, comment='재무_평가점수')

    ForeignKeyConstraint(['finance_unique_number'], ['moolLoan_user_documents_table.finance_unique_number'], onupdate='CASCADE')
    
def getHashStr(dataString) :
    dataString = str(dataString)
    hashed = sha512_crypt.hash(dataString)
    return hashed

def insertUser(user_id, user_password) : # 회원가입
    session = DatabaseHandler().session
    user_password = sha512_crypt.hash(str(user_password))
    newAccount = moolLoan_user_table(user_id = user_id, user_password = user_password, user_type = 'N')
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
        print(row)
        session.close()
        if row == 1 : return True # 'insertSuccess'
        else : return False # 'insertFail'

def selectUser(user_id, user_password) : # 로그인
    session = DatabaseHandler().session
    try :
        session.begin()
        loginUser =  session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
        if loginUser and sha512_crypt.verify(user_password, loginUser.user_password):
            return json.dumps({'user_id' : loginUser.user_id, 
                               'user_password' : loginUser.user_password})
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
            return json.dumps({'user_id' : new_id})
    except Exception as e :
        print('ERROR! : ' + str(e))
        session.rollback()
    finally :
        session.close()
    return False

# def insertNonFinancial(user_id, NonFinJson) {
#     return None
# }