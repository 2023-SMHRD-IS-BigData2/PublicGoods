import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectFour = () => {
  const {selectFinList, setSelectFinList} = useContext(answerContext);

  const navigate = useNavigate();

  // 확인 클릭했을 때
  const handleMoneyClick = () => {
    setSelectFinList(v => ({
      ...v,
      b16: document.getElementsByName('b16')[0].value,
      b17: document.getElementsByName('b17')[0].value,
      b18: document.getElementsByName('b18')[0].value,
      b19: document.getElementsByName('b19')[0].value,
      b20: document.getElementsByName('b20')[0].value
    }));
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
            <p className='selectInfor'>* <strong>순서대로</strong> <strong>최소 3분기</strong>에서 <strong>최대 5분기</strong>까지 적어주세요.</p>
          </div>

          {/* 부채 Input */}
          <div className='apply-box'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  {/* 1분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>1분기</p>
                    <input className='apply-btn2' type='number' name = 'b16' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 2분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>2분기</p>
                    <input className='apply-btn2' type='number' name = 'b17' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 3분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>3분기</p>
                    <input className='apply-btn2' type='number' name = 'b18' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 4분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>4분기</p>
                    <input className='apply-btn2' type='number' name = 'b19' placeholder='예)  3000' />
                    <span className="placeholder-text">만원</span>
                  </div>
                  {/* 5분기 */}
                  <div class="input-wrapper">
                    <p className='quarter'>5분기</p>
                    <input className='apply-btn2' type='number' name = 'b20' placeholder='예)  3000' />
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

export default Fin_SelectFour