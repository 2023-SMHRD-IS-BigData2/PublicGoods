import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkUserSession();
    }, []);

    const checkUserSession = async () => {
        try {
            const user_id = sessionStorage.getItem('user_id');
            console.log(user_id);
            if (user_id != null) {
                setUsername(user_id);
                setIsLogin(true);
            }
        } catch (error) {
            console.log('ERROR!! : ' + error);
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        setIsLogin(false);
        setUsername('');
        navigate('/');
        window.location.reload();
    }

    return (
        <div className="bank-header">

            {/* Logo 이미지 */}
            <Link to="/"><img src="/images/Header/moolLoan.png" alt="logo" className="moolLaon-HeaderLogo" /></Link>

            {isLogin && (
                <div className='userName'>
                    <span className='userNameSpan'><b>{username && `${username}님 반갑습니다!`}</b></span>
                    <button className='logoutBtn' onClick={handleLogout}>로그아웃</button>
                </div>
            )}
            {/* {!isLogin && (
                <div className='userName'>
                    <span className='userNameSpan'>{username ? `${username}님 안녕하세요!` : '로그인해주세요!'}</span>
                    <Link to="/login"><button className='logoutBtn'>로그인</button></Link>
                </div>
            )} */}
        </div>

    )
}

export default Header;
