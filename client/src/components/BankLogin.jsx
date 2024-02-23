import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        let hasError = false;

        // 아이디
        if (!idInput) {
            setIdError('아이디를 입력해주세요.');
        } else {
            setIdError('');
        }

        // 비밀번호
        if (!pwNum) {
            setPwError('비밀번호를 입력해주세요.');
        } else {
            setPwError('');
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
                    console.log(userinfo.user_id);
                    navigate('/bankApply');
                } else {
                    alert('로그인에 실패하였습니다! ');
                }
            } catch (error) {
                console.log('ERROR!! : ' + error);
            };
        }
    };

    return (

        <div className="login-content">

            {/* Title Wrap*/}
            <div className="titleWrap">
                로그인
            </div>

            {/* contentWrap - 아이디 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    아이디
                </div>
                <div className="inputWrap">
                    <input className="write-input" type='text' placeholder='아이디'
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}></input>
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            <div className="errorMessageWrap">
                <div>{idError}</div>

            </div>

            {/* contentWrap - 비밀번호 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input className="write-input" type='password' placeholder='비밀번호'
                        value={pwNum}
                        onChange={(e) => setPwNum(e.target.value)}></input>
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            <div className="errorMessageWrap">
                <div>{pwError}</div>

            </div>

            {/* 로그인 버튼 */}
            <div className='bottomBtn'>
             <button className='loginBtn' onClick={handleLogin}>Login</button>
            </div>

            {/* 회원가입 버튼 */}
            <div className='bottomJoin' style={{marginBottom : '100px', marginTop : '10px'}}>
                <Link to='/bankJoin'>
                    <button className='joinBtn'>회원가입이 필요하시면 클릭!</button>
                </Link>
            </div>

        </div>
    )
}

export default Login