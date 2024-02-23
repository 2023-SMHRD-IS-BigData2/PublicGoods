from flask import Flask, request, jsonify
from flask import session as Flasksession
from flask_cors import CORS

from app.controllers import JsonDataProcessing
from app.controllers import SimpleDocuProcessing
from app.controllers import getOCRresult

from app.models import insertUser, selectUser

from werkzeug.utils import secure_filename
from threading import Lock
import secrets
import os

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)
lock = Lock()

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SESSION_PERMANENT'] = False

NaverOCRURL = "https://5jhnjwjjza.apigw.ntruss.com/custom/v1/28004/94c60e18d0f07e16d2c25442c7a6c7dc86a8e362f8dc888c4cc5c71886cb8278/general"
OCRSecretKey = "eG93a2ZjYlNhaXFCSWJSTVdueWFxWWVrTFRkT0NnWXc="

@app.errorhandler(404)
def not_found_error(error) :
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/loginCheck', methods=['POST'])
def loginCheck() :
    if 'user_id' in Flasksession : 
        user_id = Flasksession['user_id']
        return jsonify({'user_id' : user_id}), 200
    else : return jsonify({'user_id' : None}), 200

@app.route('/api/logout', methods=['POST'])
def logout() :
    Flasksession.clear()
    return True

@app.route('/api/join', methods=['POST'])
def join() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    user_type = 'N'
    businessNum = None
    bankNumber = None
    bankName = None
    try : businessNum = data.get('businessNum'); print('businessNum : ' + businessNum); user_type = 'C'
    except : pass
    try : 
        bankNumber = data.get('bankNumber'); print('bankNumber : ' + bankNumber)
        bankName = data.get('bankName'); print('bankName : ' + bankName)
        user_type = 'B'
    except : pass
    print(idInput, pwNum)
    Flasksession['user_id'] = idInput # 아이디를 세션값에 저장
    return_data = jsonify({
        "Insert" : insertUser(user_id = idInput, user_password = pwNum, user_type = user_type, business_num = businessNum), 
        'user_id' : idInput
        }) # insert : Boolean , user_id : 회원가입 아이디
    return return_data

@app.route('/api/login', methods=['POST'])
def login() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    print(idInput, pwNum)
    Flasksession['user_id'] = idInput
    return_data = jsonify(selectUser(idInput, pwNum))
    return return_data

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

        return response_data
    else : return {'key' : 'value'}
    
@app.route('/api/NonFin', methods=['POST'])
def non_fin() :
    data = JsonDataProcessing(request.json)
    data.changeNonFinKey()
    data.changeNonFinValue()
    print(data.AnyFinDict)
    return {'key' : 'value'}

@app.route('/api/simpleFin', methods=['POST'])
def simpleFin() :
    data = SimpleDocuProcessing(request.json)
    print(data.SimpleFinDict)
    return {'key' : 'value'}
    
if __name__ == "__main__":
    app.run(debug = True, use_reloader = False)