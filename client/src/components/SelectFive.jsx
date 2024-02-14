import React from 'react'
import { useNavigate } from 'react-router-dom';

const SelectFive = () => {
    const navigate = useNavigate();

    // 있습니다. 클릭했을 때
    const handleYesClick = () => {
      navigate('/selectSix');
    };
  
    // 없습니다. 클릭했을 때
    const handleNoClick = () => {
      navigate('/selectSix');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      navigate('/selectSix');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>신용보증재단, 기술보증재단 등 재단에서 <br/> 보증한 금액이 있습니까?</h3>
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

export default SelectFive