import React, { useState } from 'react'

const CompanyJoin = () => {
  const [businessNum, setBusinessNum] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [idInput, setIdInput] = useState('');
  const [pwNum, setPwNum] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const handleLogin = () => {
    let hasError = false;

    // 사업자 등록 번호
    if (!businessNum.trim()) {
      setErrorMessage('올바른 사업자 등록 번호를 입력하세요.');
    } else {
      setErrorMessage('');
      // 여기에 로그인 로직을 추가하세요
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
  }
  
  return (
    <div className = "login-content3">
      {/* Title Wrap*/}
      <div className = "titleWrap3">
          회원가입
      </div>

      {/* contentWrap - 아이디 입력 */}
      <div className = "contentWrap3">
            <div className="inputTitle3">
                아이디
            </div>
            <div className="inputWrap3">
                <input className="write-input3" type='text' placeholder='아이디'
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap3">
            <div>{idError}</div>

        </div>

        {/* contentWrap - 비밀번호 입력 */}
        <div className = "contentWrap3">
            <div className="inputTitle3">
                비밀번호
            </div>
            <div className="inputWrap3">
                <input className="write-input3" type='password' placeholder='비밀번호'
                value={pwNum}
                onChange={(e) => setPwNum(e.target.value)}></input>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        <div className = "errorMessageWrap3">
            <div>{pwError}</div>

        </div>

      {/* contentWrap - 사업자 등록 번호 입력 */}
      <div className = "contentWrap3">
          <div className="inputTitle3">
              사업자 등록 번호
          </div>
          <div className="inputWrap3">
              <input className="write-input3" placeholder='번호만'
              value={businessNum}
              onChange={(e) => setBusinessNum(e.target.value)}></input>
          </div>
      </div>

      {/* errror 메세지 띄우기  */}
      <div className = "errorMessageWrap3">
          <div>{errorMessage}</div>

      </div>

      {/* 로그인 버튼 */}
      <div className='bottomBtn3'>
            <button className='loginBtn3'
            onClick={handleLogin}>Join</button>
        </div>
    
    </div>
    
  )
}

export default CompanyJoin