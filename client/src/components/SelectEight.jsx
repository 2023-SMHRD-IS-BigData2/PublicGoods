import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SelectEight = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(100);

    // 확인버튼 클릭했을 때
    const handleOkClick = () => {
      setProgress(0);
      navigate('/finalSelect');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      setProgress(0);
      navigate('/finalSelect');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            <div class="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>은행에게 대출 받은 금액은 얼마입니까?</h3>
            </div>
  
            {/* 금액 Input */}
            <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div class="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  1000' />
                    <span className="placeholder-text">만원</span>
                    <button className='okBtn' onClick={handleOkClick}>확인</button>
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

export default SelectEight