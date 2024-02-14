import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

const Header = () => {

  // const nav = useNavigate();
  // const [userType, setUserType] = useState('');


  // useEffect(() => {
  //   console.log('userType in useEffect', userType)
  //   if (userType === '/bank') {
  //     nav(`/bank/Login`);
  //   } else if (userType === '/company') {
  //     nav(`/company/Login`);
  //   }
  // }, [userType]);


  // const handleLoginClick = (type) => {
  //   console.log('type', type)
  //   setUserType(type);
  // };

  return (
    // <div>
    <div className="bank-header">
    
       <Link to="/"><img src="/images/Header/moolLoan.png" alt="logo" className="moolLaon-HeaderLogo" /></Link>

       {/* {userType !== '/bank' ?
       (<button className='headerLog' onClick={() => handleLoginClick('/bank')}>Login</button>) :
       (<button className='headerLog' onClick={() => handleLoginClick('/company')}>Login</button>)
       } */}
    </div>
    )
  }

export default Header;
