from flask import Flask, request, jsonify
from flask_session import Session
from flask_cors import CORS
from flask import session

from app.controllers import JsonDataProcessing
from app.controllers import SimpleDocuProcessing
from app.controllers import getOCRresult

from app.models import insertUser, selectUser, insertSimpleFinancial

from werkzeug.utils import secure_filename
from threading import Lock
from datetime import timedelta
import secrets
import os

app = Flask(__name__)
CORS(app)
Session(app)
app.secret_key = secrets.token_hex(16)
lock = Lock()

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_TYPE'] = 'filesystem'

app.config['SESSION_PERMANENT'] = True
app.permanent_session_lifetime = timedelta(minutes= 60)

NaverOCRURL = "https://5jhnjwjjza.apigw.ntruss.com/custom/v1/28004/94c60e18d0f07e16d2c25442c7a6c7dc86a8e362f8dc888c4cc5c71886cb8278/general"
OCRSecretKey = "eG93a2ZjYlNhaXFCSWJSTVdueWFxWWVrTFRkT0NnWXc="

@app.errorhandler(404)
def not_found_error(error) :
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/addSession', methods=['POST'])
def addSession() :
    data = request.json
    user_id = data.get('user_id')
    session['user_id'] = user_id
    print(session['user_id'])
    return 'session_set', 204

@app.route('/api/loginCheck', methods=['GET'])
def loginCheck() :
    user_id = session.get('user_id')
    print(user_id)
    if user_id : return jsonify({'user_id' : user_id})
    else : return jsonify({'user_id' : None})

@app.route('/api/logout', methods=['POST'])
def logout() :
    session.clear()
    return True

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
    data = JsonDataProcessing(request.json)
    user_id = session['user_id']
    print(user_id)
    print(data)
    data.changeNonFinKey()
    data.changeNonFinValue(user_id)
    print(data.AnyFinDict)
    return {'key' : 'value'}

@app.route('/api/simpleFin', methods=['POST'])
def simpleFin() :
    data = SimpleDocuProcessing(request.json)
    print(data.SimpleFinDict)
    return {'key' : 'value'}
    
if __name__ == "__main__":
    app.run(debug = True, use_reloader = False)