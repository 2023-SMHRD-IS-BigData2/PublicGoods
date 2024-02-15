import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SelectFive = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(62.5);

    // 확인버튼 클릭했을 때
    const handleOkClick = () => {
      setProgress(75);
      navigate('/selectSix');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      setProgress(75);
      navigate('/selectSix');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            <div class="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>
                신용보증재단, 기술보증재단 등 재단에서 <br/>
                보증한 금액이 있습니까?
              </h3>
            </div>
  
            {/* 개월 Input */}
            <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div class="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  2000' />
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

export default SelectFive