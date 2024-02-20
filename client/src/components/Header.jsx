import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {

  return (
    <div className="bank-header">

      {/* Logo 이미지 */}
      <Link to="/"><img src="/images/Header/moolLoan.png" alt="logo" className="moolLaon-HeaderLogo" /></Link>

      {/* 로그인 & 로그아웃 */}
      <div>
        
      </div>

    </div>
    )
  }

export default Header;
