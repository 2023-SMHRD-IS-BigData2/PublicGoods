import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginHeader = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // 이미 로그인되어 있는 사용자의 아이디를 가져와서 설정
        fetchLoggedInUsername();
    }, []);

    const fetchLoggedInUsername = async () => {
        try {
            // 서버로부터 이미 로그인된 사용자의 정보를 가져오는 요청을 보냄
            const response = await axios.get('http://127.0.0.1:5000/api/user');

            // 서버에서 받은 사용자 정보를 이용하여 로그인 상태를 설정
            if (response.data != null) {
                setUsername(response.data.idInput);
                setIsLogin(true);
            } else {
                setUsername('');
                setIsLogin(false);
            }
        } catch (error) {
            console.log('ERROR!! : ' + error);
        }
    }

     // 예시로 로그아웃 처리 함수
     const handleLogout = () => {
        // 로그아웃 처리 로직
        // 로그아웃에 성공하면 setIsLoggedIn(false) 호출하고 사용자명 초기화 등
        setIsLogin(false);
        setUsername('');
    }

  return (
        <div className="onePage-div">

       {/* 로그인네임 & 로그아웃 */}
       {isLogin ? (
            <div>
                {username}님! 안녕하세요!
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        ) : null}

    </div>

  )
}

export default LoginHeader;
