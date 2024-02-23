import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BankLogin = () => {

    const [bankName, setBankName] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        let hasError = false;

        // 은행명 유효성 검사
        if (!bankName.trim() || !bankNumber.trim() || !idInput || !pwNum) {
            alert('올바르게 입력해주세요.');
            hasError = true;
        } else {
            
        }

        // 로그인 처리
        if (!hasError) {
            // 여기에 로그인 처리 로직을 추가하세요
            e.preventDefault();
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/join', {
                    idInput: idInput,
                    pwNum: pwNum,
                    bankName: bankName,
                    bankNumber: bankNumber
                });
                console.log(response.data);
                if (response.data.Insert) {
                    alert('회원가입에 성공했습니다! 로그인 페이지로 돌아갑니다.')
                    navigate('/bankLogin');
                } else {
                    alert('회원가입에 실패했습니다!');
                    // 회원가입 실패
                }
            } catch (error) {
                console.log('ERROR!! : ' + error)
            }
        }
    };

  return (
    <div className='loginPage'>

        <div className='joinBox'>
            {/* 로그인 설명 */}
            <div className='joinInfo'>
            <div className='join'>
                <h3 className='LOC'>Join Our Community</h3>
                <div className='inputBox'>
                    {/* 로그인 제목 */}
                    <h2 className='joinSub'>회원가입</h2>
                    {/* input */}
                    <div className='inputIdBox'>
                        {/* 아이디 */}
                        <input type="text" className='idInputJoin' placeholder='아이디'
                               value={idInput}
                               onChange={(e) => setIdInput(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className='inputPwBox'>
                        <input type="text" className='pwInputJoin' placeholder='비밀번호'
                               value={pwNum}
                               onChange={(e) => setPwNum(e.target.value)}
                        />
                    </div>

                    {/* 은행명 */}
                    <div className='inputPwBox'>
                        <input type="text" className='pwInputJoin' placeholder='예) 기업은행,SC제일은행(띄어쓰기 X)'
                               value={bankName}
                               onChange={(e) => setBankName(e.target.value)}
                        />
                    </div>

                    {/* 사원번호 */}
                    <div className='inputCompanyBox'>
                        <input type="text" className='nbInputJoin' placeholder='사원 번호'
                               value={bankNumber}
                               onChange={(e) => setBankNumber(e.target.value)}
                        />
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <div className='BtnBox'>
                    <button className='logBtn2' onClick={handleLogin}>회원가입</button>
                </div>
            </div>
            </div>

            {/* 로그인 */}
            <div className='joinInfo'>
                <h3 className='LOC'>Join Our Community</h3>
            </div>
        </div>

    </div>
  )
}

export default BankLogin