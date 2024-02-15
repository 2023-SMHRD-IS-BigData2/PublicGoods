from flask import Flask, request
from flask_cors import CORS
 
from models import DatabaseHandler, moolLoan_user_table, getHashStr
import hashlib

app = Flask(__name__)
CORS(app)

# Members API Route
# @app.route("/members")
# def members():
#     return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/api/login", methods=['POST'])
def login() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    businessNum = data.get('businessNum')
    print(idInput, pwNum, businessNum)
    pwNum = hashlib
    
    resultString = 'JoinAccess successful'
    session = DatabaseHandler().session
    hashPassword = getHashStr(pwNum)

    try : 
        session.begin()
        newAccount = moolLoan_user_table(user_id=idInput, user_password=hashPassword, user_type='N')
        session.add(newAccount)
        session.commit()
    except Exception as e :
        resultString = 'ERROR!! : ' + e
    finally :
        added_rows = len(session.new)
        session.close()
    
    if added_rows != 1 :
        resultString = 'JoinAccess Failed'

    return resultString

if __name__ == "__main__":
    app.run(debug=True)