import React, { useState } from 'react'

const Join = () => {
  const [bankName, setBankName] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [NumErrorMessage, setNumErrorMessage] = useState('');
    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');

    const handleLogin = () => {
        let hasError = false;
    
        // 은행명 유효성 검사
        if (!bankName.trim()) {
            setErrorMessage('올바른 은행명을 입력해주세요.');
          hasError = true;
        } else {
            setErrorMessage('');
        }
    
        // 사원번호 유효성 검사
        if (!bankNumber.trim()) {
            setNumErrorMessage('올바른 사원번호를 입력해주세요.');
          hasError = true;
        } else {
            setNumErrorMessage('');
        }

        // 아이디
        if (!idInput) {
            setIdError('아이디를 입력해주세요.');
        } else {
            setIdError('');
        }

        // 비밀번호
        if (!pwNum) {
            setPwError('아이디를 입력해주세요.');
        } else {
            setPwError('');
        }
    
        // 로그인 처리
        if (!hasError) {
          // 여기에 로그인 처리 로직을 추가하세요
          console.log('Logged in successfully!');
        }
      };

  return (
    
    <div className = "login-content2">

        {/* Title Wrap*/}
        <div className = "titleWrap2">
            회원가입
        </div>

        {/* contentWrap - 아이디 입력 */}
        <div className = "contentWrap2">
            <div className="inputTitle2">
                아이디
            </div>
            <div className="inputWrap2">
                <input className="write-input2" type='text' placeholder='아이디'
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap2">
            <div>{idError}</div>

        </div>

        {/* contentWrap - 비밀번호 입력 */}
        <div className = "contentWrap2">
            <div className="inputTitle2">
                비밀번호
            </div>
            <div className="inputWrap2">
                <input className="write-input2" type='password' placeholder='비밀번호'
                value={pwNum}
                onChange={(e) => setPwNum(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap2">
            <div>{pwError}</div>

        </div>

        {/* contentWrap - 은행명 입력 */}
        <div className = "contentWrap2">
            <div className="inputTitle2">
                은행명(띄어쓰기 없이)
            </div>
            <div className="inputWrap2">
                <input className="write-input2" type='text' placeholder='예) 기업은행, SC제일은행, ...'
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap2">
            <div>{errorMessage}</div>

        </div>

        {/* contentWrap - 사원번호 입력 */}
        <div className = "contentWrap2">
            <div className="inputTitle2">
                사원번호
            </div>
            <div className="inputWrap2">
                <input className = "write-input2" type='text' placeholder='번호만'
                value={bankNumber}
                onChange={(e) => setBankNumber(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap2">
            <div>{NumErrorMessage}</div>

        </div>

        {/* 로그인 버튼 */}
        <div className='bottomBtn2'>
            <button className='loginBtn2'
            onClick={handleLogin}>Join</button>
        </div>
    
    </div>
  )
}

export default Join