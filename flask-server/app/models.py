from sqlalchemy import create_engine, Column, ForeignKeyConstraint
from sqlalchemy.dialects.mysql import CHAR, VARCHAR, DATETIME, TEXT, INTEGER, FLOAT
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError
from passlib.hash import sha512_crypt
from datetime import datetime
from uuid import uuid4

import json

Base = declarative_base() # class
class DatabaseHandler : # SQLAlchemy 세션 시작 부분 
    def __init__(self) :
        self.engine = create_engine("mysql+pymysql://publicgoods:publicgoods01@project-db-campus.smhrd.com:3307/publicgoods", echo=True)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
class moolLoan_user_table (Base) : # moolLoan_user_table 매핑
    __tablename__ = 'moolLoan_user_table'
    __table_args__ = {'comment': '사용자_정보_테이블'}

    user_unique_number = Column(CHAR(36), primary_key=True, nullable=False, comment='사용자_고유정보',
                                default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    user_id = Column(VARCHAR(30), nullable=False, unique=True, comment='사용자_아이디')
    user_password = Column(VARCHAR(128), nullable=False, comment='사용자 비밀번호')
    user_type = Column(CHAR(1), nullable=False, comment='사용자_회원타입')
    user_joinDate = Column(DATETIME, nullable=False, default=datetime.now(), comment='사용자_가입일자')
class moolLoan_user_documents_table (Base) : # moolLoan_user_documents_table 매핑
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
class non_financial_documents_table (Base) : # non_financial_documents_table 매핑
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
class financial_documents_table (Base) : # financial_documents_table 매핑
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

def insertUser(user_id, user_password, user_type) : # return Boolean
    row = 0
    rowBoolean = False

    with DatabaseHandler().session as session :
        user_unique_number = str(datetime.now().year) + str(uuid4()).replace('-', '').upper()
        user_password = sha512_crypt.hash(str(user_password))
        newAccount = moolLoan_user_table(
            user_unique_number = user_unique_number, 
            user_id = user_id, 
            user_password = user_password, 
            user_type = user_type
            )
        newDocuTable = moolLoan_user_documents_table(
            user_unique_number = user_unique_number,
            deep_result = '결과없음',
            approval_status = 'N'
            )
        try :
            session.begin(); session.add(newAccount); row = len(session.new)
        except SQLAlchemyError as e :
            print('SQLAlchemyUserInsertError! : ' + str(e))
            session.rollback()
        except Exception as e :
            print('ERROR! : ' + str(e))
            session.rollback()
        finally :
            if row == 1 :
                try :
                    session.add(newDocuTable); row = len(session.new)
                    if row == 2 : session.commit(); rowBoolean = True
                    else : session.rollback()
                except SQLAlchemyError as e :
                    print('SQLAlchemyUserDocumnetsInsertError! : ' + str(e))
                    session.rollback()
                except Exception as e :
                    print('ERROR! : ' + str(e))
                    session.rollback()

    return rowBoolean

def selectUser(user_id, user_password) : # return {'user_id' : user_id, 'user_password' : user_password}
    userInfo = None

    with DatabaseHandler().session as session :
        try :
            session.begin()
            loginUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
            if loginUser and sha512_crypt.verify(user_password, loginUser.user_password) :
                userInfo = {'user_id' : loginUser.user_id, 'user_password' : loginUser.user_password}
            session.commit()
        except SQLAlchemyError as e :
            print('SQLAlchemyUserSelectError! : ' + str(e))
            session.rollback()
        except Exception as e :
            print('ERROR! : ' + str(e))
            session.rollback()

    return userInfo

def updateUser(user_id, user_password, new_id = None, new_password = None) : # return Boolean
    row = 0
    updateBoolean = False
    changeUser = selectUser(user_id, user_password)

    if changeUser :
        with DatabaseHandler().session as session :
            try :
                if new_id is None : new_id = user_id
                if new_password is None : new_password = user_password
                else : new_password = sha512_crypt.hash(str(new_password))
                session.begin()
                session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).update({
                    moolLoan_user_table.user_id : new_id,
                    moolLoan_user_table.user_password : new_password
                })
                row = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).count()
                if row == 1 : 
                    session.commit(); updateBoolean = True
                else : session.rollback()
            except SQLAlchemyError as e :
                print('SQLAlchemyUpdateUserError! : ' + str(e))
                session.rollback()
            except Exception as e :
                print('ERROR! : ' + str(e))
                session.rollback()

    return updateBoolean

def findDocuNum(user_id) : # return {'NonFinNum' : non_finance_unique_number, 'FinNum' : finance_unique_number}
    result = None

    with DatabaseHandler().session as session :
        try :
            session.begin()
            FindUser = session.query(moolLoan_user_table).filter(moolLoan_user_table.user_id == user_id).first()
            if FindUser :
                findDocuNum = session.query(moolLoan_user_documents_table).filter(
                    moolLoan_user_documents_table.user_unique_number == FindUser.user_unique_number).first()
                if findDocuNum : result = {'NonFinNum' : findDocuNum.non_finance_unique_number, 'FinNum' : findDocuNum.finance_unique_number}
            session.commit()
        except SQLAlchemyError as e :
            print('SQLAlchemyFindDocuNumError! : ' + str(e))
            session.rollback()
        except Exception as e:
            print('ERROR! : ' + str(e))
            session.rollback()

    return result

def insertFinancial(user_id, FinJson) : # return Boolean
    FinNum = findDocuNum(user_id)['FinNum']
    insertBoolean = False
    row = 0

    if not FinNum : return insertBoolean
    else :
        with DatabaseHandler().session as session :
            FinJson = json.loads(FinJson)
            FinDocu = financial_documents_table(
                finance_unique_number = FinNum, 
                revenue = FinJson['매출액'],
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
                session.begin(); session.add(FinDocu); row = len(session.new)
                if row == 1 : 
                    session.commit(); insertBoolean = True
                else : session.rollback()
            except SQLAlchemyError as e :
                print('SQLAlchemyinsertFinDocuError! : ' + str(e))
                session.rollback()
            except Exception as e :
                print('ERROR! : ' + str(e))
                session.rollback()

    return insertBoolean
        
def insertNonFinancial(user_id, NonFinJson) : # return Boolean
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    insertBoolean = False
    row = 0
    if not NonFinNum : return insertBoolean
    else :
        with DatabaseHandler().session as session :
            NonFinJson = json.loads(NonFinJson)
            NonFinDocu = non_financial_documents_table(
                non_finance_unique_number = NonFinNum,
                delinquency_status = NonFinJson['연체여부'],
                pay_pre_loan_status = NonFinJson['대출청산여부'],
                loan_period = NonFinJson['대출보유기간(월)'],
                franchaise = NonFinJson['계열사여부'],
                loan_amount = NonFinJson['보증금액(만원)'],
                city = NonFinJson['수도권여부'],
                employee_no = NonFinJson['고용인원수'],
                bank_loan_amount = NonFinJson['대출금액']
            )
            try :
                session.begin(); session.add(NonFinDocu); row = len(session.new)
                if row == 1 :
                    session.commit(); insertBoolean = True
                else : session.rollback()
            except SQLAlchemyError as e :
                print('SQLAlchemyInsertNonFinDocuError! : ' + str(e))
                session.rollback()
            except Exception as e :
                print('ERROR! : ' + str(e))
                session.rollback()
    
    return insertBoolean
        
def updateNonFinancial(user_id, NonFinJson): # return Boolean
    NonFinNum = findDocuNum(user_id)['NonFinNum']
    updateBoolean = False 
    row = 0
    if not NonFinNum : return updateBoolean
    else:
        with DatabaseHandler().session as session :
            NonFinJson = json.loads(NonFinJson)
            try :
                session.begin()
                session.query(non_financial_documents_table).\
                    filter(non_financial_documents_table.non_finance_unique_number == NonFinNum).update({
                        non_financial_documents_table.delinquency_status : NonFinJson['연체여부'],
                        non_financial_documents_table.pay_pre_loan_status : NonFinJson['대출청산여부'],
                        non_financial_documents_table.loan_period : NonFinJson['대출보유기간(월)'],
                        non_financial_documents_table.franchaise : NonFinJson['계열사여부'],
                        non_financial_documents_table.loan_amount : NonFinJson['보증금액(만원)'],
                        non_financial_documents_table.city : NonFinJson['수도권여부'],
                        non_financial_documents_table.employee_no : NonFinJson['고용인원수'],
                        non_financial_documents_table.bank_loan_amount : NonFinJson['대출금액'],
                    })
                row = session.query(non_financial_documents_table).\
                    filter(non_financial_documents_table.non_finance_unique_number == NonFinNum).count(); print(row)
                if row == 1 : 
                    session.commit(); updateBoolean = True
                else : session.rollback()
            except SQLAlchemyError as e :
                print('SQLAlchemyUpdateNonDocuError! : ' + str(e))
                session.rollback()
            except Exception as e :
                print('ERROR! : ' + str(e))
                session.rollback()
    return updateBoolean
        
# def validateNonFinancialJson(NonFinJson):
#     required_keys = ['연체여부', '대출청산여부', '대출보유기간(월)', '계열사여부', '보증금액(만원)', '수도권여부', '고용인원수', '대출금액']
#     for key in required_keys:
#         if key not in NonFinJson:
#             return False
#     return True