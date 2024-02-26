import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

const BankLogin = () => {

    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('user_id') != null) {
            navigate('/bankApply');
        }
    }, [sessionStorage.getItem('user_id'), navigate]);

    const handleLogin = async () => {
        let hasError = false;

        // 아이디 & 비밀번호 확인
        if (!idInput || !pwNum) {
            alert('아이디, 비밀번호를 다시 확인해주세요.');
        } else {
            
        }

        // 로그인 처리
        if (!hasError) {
            // 여기에 로그인 처리 로직을 추가하세요
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/login', {
                    idInput : idInput,
                    pwNum : pwNum
                });
                const userinfo = response.data
                if (userinfo.user_type === 'BBB') {
                    // userinfo.user_id를 헤더 저장처리
                    sessionStorage.setItem('user_id', idInput);
                    navigate('/bankApply');
                    window.location.reload();
                } else {
                    alert('로그인에 실패하였습니다! ');
                }
            } catch (error) {
                console.log('ERROR!! : ' + error);
            };
        }
    };

  return (
    <div className='loginPage'>

        <div className='loginBox'>
            {/* 로그인 설명 */}
            <div className='loginInfo'>
                <h3 className='LOC'>Bank <br/> Login Our Community</h3>
            </div>
            {/* 로그인 */}
            <div className='login'>
                <div className='inputBox'>
                    {/* 로그인 제목 */}
                    <h2 className='loginSub'>로그인</h2>
                    {/* input */}
                    <div className='inputIdBox'>
                        {/* 아이디 */}
                        <input type="text" className='idInput' placeholder='아이디' 
                               value={idInput}
                               onChange={(e) => setIdInput(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className='inputPwBox'>
                        <input type="password" className='pwInput' placeholder='비밀번호'
                               value={pwNum}
                               onChange={(e) => setPwNum(e.target.value)}
                        />
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <div className='BtnBox'>
                    <button className='logBtn' onClick={handleLogin}>로그인</button>
                </div>
                {/* 회원가입 버튼 */}
                <div className='BtnBox'>
                    <Link to='/bankJoin'><button className='joBtn'>회원가입 하러 가기</button></Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default BankLogin