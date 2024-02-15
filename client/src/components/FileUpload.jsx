import React, { useState } from 'react'

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    // 파일 선택 시 이벤트 핸들러
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // 파일 업로드 시 이벤트 핸들러
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // 서버로 파일 업로드 요청 보내기
        fetch('http://example.com/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // 응답 처리
            console.log('파일 업로드 완료');
        })
        .catch(error => {
            console.error('파일 업로드 실패:', error);
        });
    };

  return (
    <div className='file-upload'>

        {/* 파일 업로드 */}
        <div className='file-div'>
            <div className='file-header'>재무제표 파일을 제출해주세요.</div>
            <div className='file-box'>
                <div className='uploadBox'>
                    <h2 className='uploadSub'>파일 업로드</h2>
                    <input className='uploadInput' type="file" onChange={handleFileChange} />
                    <button className='uploadBtn' onClick={handleUpload}>업로드</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FileUpload