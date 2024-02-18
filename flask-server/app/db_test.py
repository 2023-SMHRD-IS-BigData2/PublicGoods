# 비재무데이터 db에 넣기
# 비재무 정보 넣는 class 생성
class NonFinancialDocument(Base):
    __tablename__ = 'Non_financial_documents_table'

    non_finance_unique_number = Column(Integer, primary_key=True)
    pre_yeonchae = Column(String)
    pay_pre_loan_status = Column(String)
    loan_period = Column(Integer)
    franchaise = Column(String)
    loan_amount = Column(Integer)
    city = Column(String)
    employee_no = Column(Integer)
    bank_loan_amount = Column(Integer)

# 데이터베이스 핸들러 클래스 생성
class DatabaseHandler:
    def __init__(self):
        Session = sessionmaker(bind=engine)
        self.session = Session()

def insert_non_financial_data(pre_yeonchae, pay_pre_loan_status, loan_period, franchaise, loan_amount, city, employee_no, bank_loan_amount):
    session = DatabaseHandler().session

    new_non_fin_document = NonFinancialDocument(pre_yeonchae=pre_yeonchae, pay_pre_loan_status=pay_pre_loan_status, loan_period=loan_period, franchaise=franchaise, loan_amount=loan_amount, city=city, employee_no=employee_no, bank_loan_amount=bank_loan_amount)

    try:
        session.add(new_non_fin_document)
        session.commit()
        return True  # 삽입 성공
    except Exception as e:
        print('ERROR! : ' + str(e))
        session.rollback()
        return False  # 삽입 실패
    finally:
        session.close()

# 비재무 테스트 데이터
if __name__ == '__main__':
    insert_success = insert_non_financial_data('y', 'n', 12, 'y', 5000, 'y', 100, 2500)
    if insert_success:
        print("비재무 정보가 성공적으로 입력되었습니다.")
    else:
        print("비재무 정보 입력에 실패하였습니다.")

# 재무데이터 db에 넣기
# 입력하기누른 재무데이터 
# 비재무 정보 넣는 class 생성
class InputFinancialDocument(Base):
    __tablename__ = 'financial_documents_table'

    finance_unique_number = Column(Integer, primary_key=True)
    revenue = Column(BIGINT) #매출액
    operating_profit = Column(BIGINT) #영업이익
    curr_assets = Column(BIGINT) #자산(유동)
    total_liabilities = Column(BIGINT) #부채(총계)

# 데이터베이스 핸들러 클래스 생성
class DatabaseHandler:
    def __init__(self):
        Session = sessionmaker(bind=engine)
        self.session = Session()

def insert_financial_data(revenue, operating_profit, curr_assets, total_liabilities   ):
    session = DatabaseHandler().session

    new_fin_document = FinancialDocument(revenue=revenue,operating_profit=operating_profit, curr_assets=curr_assets, total_liabilities=total_liabilities)
    try:
        session.add(new_fin_document)
        session.commit()
        return True  # 삽입 성공
    except Exception as e:
        print('ERROR! : ' + str(e))
        session.rollback()
        return False  # 삽입 실패
    finally:
        session.close()

# 재무 테스트 데이터
if __name__ == '__main__':
    insert_success = insert_financial_data(5000, 2500, 1000, 500)
    if insert_success:
        print("재무 정보가 성공적으로 입력되었습니다.")
    else:
        print("재무 정보 입력에 실패하였습니다.")