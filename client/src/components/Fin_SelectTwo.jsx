import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectTwo = () => {

  const navigate = useNavigate();
  const {selectFinList, setSelectFinList} = useContext(answerContext);
  // 확이버튼 클릭했을 때
  const handleMoneyClick = () => {
    navigate('/fin_selectThree');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = (e) => {
    setSelectFinList(setSelectFinList => ({
      ...setSelectFinList, b2:e.target.innerText
    }));
    navigate('/fin_selectThree');
  };

  return (
    <div className='selectPage'>

        <div className='selectOne'>
          <div class="progress-bar">
              <div className="progressFin2"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>영업이익을 입력해주세요.</h3>
          </div>

          {/* 영업이익 Input */}
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

export default Fin_SelectTwo