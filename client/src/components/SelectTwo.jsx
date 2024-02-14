import React from 'react'
import { useNavigate } from 'react-router-dom';

const SelectTwo = () => {
  const navigate = useNavigate();

  // 있습니다. 클릭했을 때
  const handleYesClick = () => {
    navigate('/selectThree');
  };

  // 없습니다. 클릭했을 때
  const handleNoClick = () => {
    navigate('/selectThree');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = () => {
    navigate('/selectThree');
  };

  return (
    <div className='selectPage'>

        <div className='selectOne'>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>기존 대출이 청산이 되어있습니까?</h3>
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

export default SelectTwo