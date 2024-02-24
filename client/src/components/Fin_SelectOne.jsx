import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectOne = () => {
  const {selectFinList, setSelectFinList} = useContext(answerContext);
  const navigate = useNavigate();

  // 확인버튼 클릭했을 때
  const handleMoneyClick = () => {
    setSelectFinList(v => ({
      ...v, b1: document.getElementsByName('b1')[0].value,
      b2: document.getElementsByName('b2')[0].value,
      b3: document.getElementsByName('b3')[0].value,
      b4: document.getElementsByName('b4')[0].value,
      b5: document.getElementsByName('b5')[0].value
      

    }));
    navigate('/fin_selectTwo');
  };


  return (
    <div className='selectPage'>

        {/* Progress - Bar */}
        <div className='selectOne'>
          <div class="progress-bar">
            <div className="progressFin1"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>매출을 입력해주세요.</h3>
            <p className='selectInfor'>
            * <strong>최소 3개</strong>에서 <strong>최대 5개</strong>까지 <strong>순서대로</strong> 작성해주세요. <br/>
              <strong>1부터 5까지 자료를 최신순으로 기입해주세요.</strong> <br/>
              (분기도 가능합니다)
            </p>

          </div>

          {/* 매출 Input */}
          <div className='apply-box5'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  {/* 1분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>1</p>
                    <input className='apply-finBtn' type='number' name = 'b1' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 2분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>2</p>
                    <input className='apply-finBtn' type='number' name = 'b2' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 3분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>3</p>
                    <input className='apply-finBtn' type='number' name = 'b3' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 4분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>4</p>
                    <input className='apply-finBtn' type='number' name = 'b4' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 5분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>5</p>
                    <input className='apply-finBtn' type='number' name = 'b5' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 확인 버튼 */}
                  <div className="input-wrapper3">
                    <button className='okBtn2' onClick={handleMoneyClick}>확인</button>
                  </div>
                </div> 
              </div>
            </div>
          </div>

    </div>
  )
}

export default Fin_SelectOne