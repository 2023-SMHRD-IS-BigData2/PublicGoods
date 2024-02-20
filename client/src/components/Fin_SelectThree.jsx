import React from 'react'
import { useNavigate } from 'react-router-dom';

const Fin_SelectThree = () => {

  const navigate = useNavigate();

  // 확입버튼 클릭했을 때
  const handleMoneyClick = () => {
    navigate('/fin_selectFour');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = () => {
    navigate('/fin_selectFour');
  };

  return (
    <div className='selectPage'>

        {/* Progress - Bar */}
        <div className='selectOne'>
          <div class="progress-bar">
              <div className="progressFin3"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>자산을 입력해주세요.</h3>
          </div>

          {/* 자산 Input */}
          <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div class="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                    <button className='okBtn' onClick={handleMoneyClick}>확인</button>
                  </div>
                </div> 
              </div>
  
            {/* 모릅니다 Button */}
              <div className='apply-company' onClick={handleKnowClick}>
                <button className='apply-btn'>
                  <p className='btn-sub'>모릅니다.<br/> </p>
                </button>
              </div>
            </div>
          </div>

    </div>
  )
}

export default Fin_SelectThree