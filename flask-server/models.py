from sqlalchemy import create_engine, Column
from sqlalchemy.dialects.mysql import CHAR, VARCHAR, DATETIME
from sqlalchemy.orm import sessionmaker, declarative_base

from uuid import uuid4
from datetime import datetime
import hashlib

Base = declarative_base()

class DatabaseHandler :
    def __init__(self) :
        self.engine = create_engine("mysql+pymysql://publicgoods:publicgoods01@project-db-campus.smhrd.com:3307/publicgoods", echo=True)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

class moolLoan_user_table (Base) :
    __tablename__ = 'moolLoan_user_table'
    __table_args__ = {'comment' : '사용자_정보_테이블'}

    user_unique_number = Column(CHAR(36), primary_key=True, nullable=False, comment='사용자_고유정보',
                                default=str(datetime.now().year) + str(uuid4()).replace('-', '').upper())
    user_id = Column(VARCHAR(30), nullable=False, unique=True, comment='사용자_아이디')
    user_password = Column(VARCHAR(128), nullable=False, comment='사용자 비밀번호')
    user_type = Column(CHAR(1), nullable=False, comment='사용자_회원타입')
    user_joinDate = Column(DATETIME, nullable=False, default=datetime.now(), comment='사용자_가입일자')

def getHashStr(dataString) :
    dataString = str(dataString)
    data_bytes = dataString.encode('utf-8')
    hashObject = hashlib.sha512()
    hashObject.update(data_bytes)
    return hashObject.hexdigest()
