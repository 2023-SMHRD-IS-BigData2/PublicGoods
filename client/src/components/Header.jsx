import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

const Header = () => {

  const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // 페이지가 로드될 때 사용자 세션을 확인합니다.
        checkUserSession();

        // 이미 로그인되어 있는 사용자의 아이디를 가져와서 설정
        fetchLoggedInUsername();
    }, []);

    const checkUserSession = async () => {
      try {
          // 세션 스토리지에서 사용자 정보를 가져옵니다.
          const user_id = JSON.parse(sessionStorage.getItem('user_id'));

          // 사용자 정보가 있으면 로그인 상태로 설정합니다.
          if (user_id) {
              setUsername(user_id);
              setIsLogin(true);
          }
      } catch (error) {
          console.log('ERROR!! : ' + error);
      }
  }

    const fetchLoggedInUsername = async () => {
        try {
            // 서버로부터 이미 로그인된 사용자의 정보를 가져오는 요청을 보냄
            const response = await axios.post('http://127.0.0.1:5000/api/loginCheck');
            console.log('response', response.data)

            // 서버에서 받은 사용자 정보를 이용하여 로그인 상태를 설정
            if (response.data.user_id != null) {

                // 사용자 정보를 세션 스토리지에 저장합니다.
                sessionStorage.setItem('user_id', response.data.user_id);

                setUsername(response.data.user_id);
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
        // 세션 스토리지에서 사용자 정보를 제거합니다.
        sessionStorage.removeItem('user_id');
        
        // 로그아웃에 성공하면 setIsLoggedIn(false) 호출하고 사용자명 초기화 등
        setIsLogin(false);
        setUsername('');
    }

  return (
    <div className="bank-header">

      {/* Logo 이미지 */}
      <Link to="/"><img src="/images/Header/moolLoan.png" alt="logo" className="moolLaon-HeaderLogo" /></Link>
      
      {/* 로그인네임 & 로그아웃 */}
      {/* {!isLogin ? (
            <div className='userName'>
                <span className='userNameSpan'>{!username && `${username}님 안녕하세요!`}</span>
                <button className='logoutBtn' onClick={handleLogout}>로그아웃</button>
            </div>
        ) : null} */}

{isLogin ? (
            <div className='userName'>
                <span className='userNameSpan'>{username && `${username}님 안녕하세요!`}</span>
                <button className='logoutBtn' onClick={handleLogout}>로그아웃</button>
            </div>
        ) : (
            <div className='userName'>
                <span className='userNameSpan'>{username ? `${username}님 안녕하세요!` : '로그인해주세요!'}</span>
                <Link to="/login"><button className='logoutBtn'>로그인</button></Link>
            </div>
        )}
    </div>

    )
  }

export default Header;
