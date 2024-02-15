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

@app.route("/api/join", methods=['POST'])
def login() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    businessNum = None
    bankNumber = None
    bankName = None
    try : businessNum = data.get('businessNum'); print('businessNum : ' + businessNum)
    except : pass
    try : 
        bankNumber = data.get('bankNumber'); print('bankNumber : ' + bankNumber)
        bankName = data.get('bankName'); print('bankName : ' + bankName)
    except : pass
    print(idInput, pwNum)
    
    resultString = 'JoinAccess successful'
    session = DatabaseHandler().session
    hashPassword = getHashStr(pwNum)

    try : 
        session.begin()
        newAccount = moolLoan_user_table(user_id=idInput, user_password=hashPassword, user_type='N')
        session.add(newAccount)
        added_rows = len(session.new)
        session.commit()
    except Exception as e :
        resultString = 'ERROR!! : ' + e
    finally :
        print(added_rows)
        if added_rows <= 0 :
            resultString = 'JoinAccess Failed'
        session.close()

    return resultString

if __name__ == "__main__":
    app.run(debug=True)