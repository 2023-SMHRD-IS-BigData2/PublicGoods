import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SelectSix = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(75);

    // 있습니다. 클릭했을 때
    const handleYesClick = () => {
      setProgress(87.5);
      navigate('/selectSeven');
    };
  
    // 없습니다. 클릭했을 때
    const handleNoClick = () => {
      setProgress(87.5);
      navigate('/selectSeven');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      setProgress(87.5);
      navigate('/selectSeven');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            <div class="progress-bar">
              <div className="progress6" style={{ width: `${progress}%` }}></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>수도권에 있습니까?</h3>
            </div>
  
            {/* 있습니다 Button */}
            <div className='apply-box'>
                <div className='apply-bank'>
                  <button className='apply-btn' onClick={handleYesClick}>
                    <p className='btn-sub'>있습니다.<br/> </p>
                  </button>
                </div>
  
            {/* 없습니다 Button */}
            <div className='apply-company'>
              <button className='apply-btn' onClick={handleNoClick}>
                 <p className='btn-sub'>없습니다.<br/> </p>
              </button>
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

export default SelectSix