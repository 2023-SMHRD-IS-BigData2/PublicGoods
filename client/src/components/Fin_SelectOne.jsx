import React from 'react'
import { useNavigate } from 'react-router-dom';

const Fin_SelectOne = () => {

  const navigate = useNavigate();

  // 확인버튼 클릭했을 때
  const handleMoneyClick = () => {
    navigate('/fin_selectTwo');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = () => {
    navigate('/fin_selectTwo');
  };

  return (
    <div className='selectPage'>

        {/* Progress - Bar */}
        <div className='selectOne'>
          <div class="progress-bar">
            <div className="progressFin1"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>매출을 입력해주세요.</h3>
          </div>

          {/* 매출 Input */}
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

export default Fin_SelectOne