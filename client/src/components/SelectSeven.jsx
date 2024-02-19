import React from 'react'
import { useNavigate } from 'react-router-dom';

const SelectSeven = () => {

    const navigate = useNavigate();

    // 확인버튼 클릭했을 때
    const handleOkClick = () => {
      navigate('/selectEight');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      navigate('/selectEight');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            {/* Progress-Bar */}
            <div class="progress-bar">
              <div className="progress7"></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>평균 고용 인원 수가 어떻게 됩니까?</h3>
            </div>
  
            {/* 인원수 Input */}
            <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div class="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  10' />
                    <span className="placeholder-text">명</span>
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

export default SelectSeven