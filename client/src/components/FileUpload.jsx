import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    // 파일 선택 시 이벤트 핸들러
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/fileUpload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data); // OCR로 분류된 데이터
            if (data != null) {
                const save_response = await axios.post('http://127.0.0.1:5000/api/simpleFin', {
                    data : data,
                    user_id : sessionStorage.getItem('user_id')
                });
                const result = save_response.data;
                if (result.Insert === true) {
                    navigate('/ocrCheck', {state : { Data : data }});
                }
            }
        } catch (error) {
            console.log('ERROR!! : ' + error);
            alert('업로드 실패! 다시 올려주세요!')
        }
    };

    return (
        <div className='file-upload'>

            {/* 파일 업로드 */}
            <div className='file-div'>
                <div className='file-header'>재무제표 파일을 제출해주세요.</div>
                <div><p className='exSub'>양식 예시</p><img src="/images/Content/ex-ocr.jpg" alt="" className='ocrImg'/></div>
                <div className='file-box'>
                    <div className='uploadBox'>
                        <h2 className='uploadSub'>파일 업로드</h2>
                        <form onSubmit={handleFileSubmit}>
                            <input className='uploadInput' type="file" onChange={handleFileChange} />
                            <button className='uploadBtn'>업로드</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FileUpload