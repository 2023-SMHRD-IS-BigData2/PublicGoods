import React from 'react'
import { useNavigate } from 'react-router-dom';

const Fin_SelectFour = () => {

  const navigate = useNavigate();

  // 있습니다. 클릭했을 때
  const handleYesClick = () => {
    navigate('/fin_Check');
  };

  // 없습니다. 클릭했을 때
  const handleNoClick = () => {
    navigate('/fin_Check');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = () => {
    navigate('/fin_Check');
  };

  return (
    <div className='selectPage'>

        {/* Progress - Bar */}
        <div className='selectOne'>
          <div class="progress-bar">
              <div className="progressFin4"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>부채를 입력해주세요.</h3>
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

export default Fin_SelectFour