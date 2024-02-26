from flask import Flask, request, jsonify
from flask_cors import CORS

from app.controllers import JsonDataProcessing
from app.controllers import SimpleDocuProcessing
from app.controllers import getOCRresult

from app.models import insertUser, selectUser, selectUserBusinessNum, getUserBusinessNum
from app.models import insertNonFinancial, updateNonFinancial
from app.models import insertSimpleFinancial, updateSimpleFinancial

from werkzeug.utils import secure_filename
from datetime import timedelta
import secrets
import json
import os

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

secret_key = secrets.token_hex(16)
app.secret_key = secret_key
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_TYPE'] = 'filesystem'
# app.config['SESSION_PERMANENT'] = False

app.permanent_session_lifetime = timedelta(minutes= 60)
NaverOCRURL = "https://5jhnjwjjza.apigw.ntruss.com/custom/v1/28004/94c60e18d0f07e16d2c25442c7a6c7dc86a8e362f8dc888c4cc5c71886cb8278/general"
OCRSecretKey = "eG93a2ZjYlNhaXFCSWJSTVdueWFxWWVrTFRkT0NnWXc="

CORS(app)

@app.errorhandler(404)
def not_found_error(error) :
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/join', methods=['POST'])
def join() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    businessNum = None
    Category = None
    bankNumber = None
    bankName = None
    try : 
        businessNum = data.get('businessNum')
        Category = data.get('businessCategory')
        if (businessNum and Category) :
            return_data = jsonify({"Insert" : insertUser(user_id = idInput, user_password = pwNum, user_type = Category, business_num = businessNum)})
    except : pass
    try : 
        bankNumber = data.get('bankNumber')
        bankName = data.get('bankName')
        if (bankNumber and bankName) :
            Category = 'BBB'
            return_data = jsonify({"Insert" : insertUser(user_id = idInput, user_password = pwNum, user_type = Category, business_num = businessNum)})
    except : pass
    return return_data

@app.route('/api/login', methods=['POST'])
def login() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    return_data = jsonify(selectUser(idInput, pwNum))
    return return_data

@app.route('/api/getBusinessNum', methods=['GET', 'POST'])
def getBusinessNum() :
    data = selectUserBusinessNum()
    data = jsonify(data)
    return data

@app.route('/api/findBusinessNum', methods=['GET', 'POST'])
def findBusinessNum() :
    data = request.json
    business_num = data.get('searchboxtext')
    result = getUserBusinessNum(business_num)
    if result : return jsonify({'result' : result})
    else : {'result' : result}

@app.route('/api/fileUpload', methods=['POST'])
def fileUpload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(filepath):
            os.remove(filepath)
        file.save(filepath) 
        response_data = getOCRresult(path = filepath, url = NaverOCRURL, key = OCRSecretKey)
        # insertSimpleFinancial(user_id, json.dumps(response_data))
        print(response_data)
        return response_data
    else : return {'key' : 'value'}
    
@app.route('/api/NonFin', methods=['POST'])
def non_fin() :
    selectList = request.json.get('selectList')
    user_id = request.json.get('user_id')
    data = JsonDataProcessing(selectList)
    data.changeNonFinKey()
    data.changeNonFinValue(user_id)
    print(data.AnyFinDict)
    nfdict = data.AnyFinDict
    if not insertNonFinancial(user_id, nfdict) :
        updateNonFinancial(user_id, nfdict)
    return jsonify(data.AnyFinDict)

@app.route('/api/simpleFin', methods=['POST'])
def simpleFin() :
    savedata = request.json
    successBool = False
    data = savedata['data']
    user_id = savedata['user_id']
    if not insertSimpleFinancial(user_id, data) : 
        successBool = updateSimpleFinancial(user_id, data)
    else : successBool = True
    return {'Insert' : successBool}
    
if __name__ == "__main__":
    app.run(debug = True, use_reloader = False)