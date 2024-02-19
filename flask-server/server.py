from flask import Flask, request, jsonify
from flask_cors import CORS
 
from app.models import insertUser, selectUser
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/path/to/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/api/join", methods=['POST'])
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
    return_data = {"Insert" : insertUser(idInput, pwNum), 'user_id' : idInput}
    return return_data

@app.route('/api/login', methods=['POST'])
def login() :
    data = request.json
    idInput = data.get('idInput')
    pwNum = data.get('pwNum')
    print(idInput, pwNum)
    return_data = selectUser(idInput, pwNum)
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
    
if __name__ == "__main__":
    app.run(debug=True)