import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Company() {

  const purple = '#8569f7';
  const black = 'black';

  const [showDescription, setShowDescription] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setIsClicked(!isClicked);
  };

  return (
    <div className='bank-container'>
      <div className='button-container'>
      <button className={`bank-btn ${isClicked ? 'clicked' : ''}`} onClick={toggleDescription}
      style={{color : showDescription ?  purple : black}}>
        물론 소개
      </button>
      <button className='bank-btn2'
            style={{marginLeft : '100px'}}
          >신청하기</button>

          <button className='bank-btn2'
            style={{marginLeft : '100px'}}
          >FAQ</button>

          <Link to="/company/Login"><button className='headerLog' 
          >Login</button></Link>
      </div>
      {showDescription && (
        <div className='intro-box'>
          <p className='mool-int1'>▼</p>
          <p className='mool-introduce'>
            안녕하세요. 물론(moolLaon)입니다. <br/>
            저희는 신용평가가 어려운 자영업자와 창업 초기단계 회사를 대상으로 <br/>
            신용평가 모형을 활용한 기업여신 심사 및 피드백을 제공하는 플랫폼으로 <br/>
            신용점수 산정을 받고 싶어하는 기업을 위해<br/>
            기술력 기반 신용점수를 산정 받고 <br/>
            해당 피드백을 제공하는 서비스를 제공합니다.
          </p>
        </div>
      )}
    </div>
  );
}
  
  export default Company;