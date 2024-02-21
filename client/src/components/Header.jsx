import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {

  return (
    <div className="bank-header">

      {/* Logo 이미지 */}
      <Link to="/"><img src="/images/Header/moolLoan.png" alt="logo" className="moolLaon-HeaderLogo" /></Link>
      
    </div>

    )
  }

export default Header;
