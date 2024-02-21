import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectTwo = () => {

  const navigate = useNavigate();
  const {selectFinList, setSelectFinList} = useContext(answerContext);
  // 확인 버튼 클릭했을 때
  const handleMoneyClick = () => {
    setSelectFinList(setSelectFinList => ({
      ...setSelectFinList, b2: document.querySelector('.apply-btn2').value
    }));
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
            <p className='selectInfor'>* <strong>최소 3분기</strong>에서 <strong>최대 5분기</strong>까지 <strong>순서대로</strong> 적어주세요.</p>
          </div>

          {/* 영업이익 Input */}
          <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  {/* 1분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>1분기</p>
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 2분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>2분기</p>
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 3분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>3분기</p>
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 4분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>4분기</p>
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 5분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>5분기</p>
                    <input className='apply-btn2' type='number' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 확인 버튼 */}
                  <div class="input-wrapper">
                    <button className='okBtn2' onClick={handleMoneyClick}>확인</button>
                  </div>
                </div> 
              </div>
            </div>
          </div>

    </div>
  )
}

export default Fin_SelectTwo