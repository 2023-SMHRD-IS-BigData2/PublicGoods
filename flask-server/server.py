from flask import Flask, request, jsonify
from flask import session as Flasksession
from flask_cors import CORS
 
from app.models import insertUser, selectUser
from werkzeug.utils import secure_filename
from threading import Lock
import secrets
import json
import os

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)
lock = Lock()

UPLOAD_FOLDER = '/path/to/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_PERMANENT'] = False

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.errorhandler(404)
def not_found_error(error) :
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/loginCheck', methods=['POST'])
def loginCheck() :
    with lock :
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
    Flasksession['user_id'] = idInput # 아이디를 세션값에 저장
    return_data = jsonify({"Insert" : insertUser(idInput, pwNum), 'user_id' : idInput}) # insert : Boolean , user_id : 회원가입 아이디
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
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        # 파일이 이미 존재하는지 확인하고 있다면 덮어씌웁니다.
        if os.path.exists(filepath):
            os.remove(filepath)  # 기존 파일 삭제

        file.save(filepath)  # 파일 저장
        return jsonify({'success': 'File uploaded successfully', 'filename': filename})
    
@app.route('/api/NonFin', methods=['POST'])
def non_fin() :
    data = request.json
    data = json.loads(data)
    print(data)
    return True
    
if __name__ == "__main__":
    app.run(debug = True, use_reloader = False)