import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectThree = () => {
  const {selectFinList, setSelectFinList} = useContext(answerContext);
  const navigate = useNavigate();

  // 확입버튼 클릭했을 때
  const handleMoneyClick = () => {
    setSelectFinList(v => ({
      ...v,
      b11: document.getElementsByName('b11')[0].value,
      b12: document.getElementsByName('b12')[0].value,
      b13: document.getElementsByName('b13')[0].value,
      b14: document.getElementsByName('b14')[0].value,
      b15: document.getElementsByName('b15')[0].value    
      
    }));
    navigate('/fin_selectFour');
  };


  return (
    <div className='selectPage'>

        {/* Progress - Bar */}
        <div className='selectOne'>
          <div className="progress-bar">
              <div className="progressFin3"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>자산을 입력해주세요.</h3>
            <p className='selectInfor'>
              * <strong>최소 3개</strong>에서 <strong>최대 5개</strong>까지 <strong>순서대로</strong> 적어주세요. <br/>
              (분기 또는 연도로 작성해주세요.)
            </p>
          </div>

          {/* 자산 Input */}
          <div className='apply-box5'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  {/* 1분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>1</p>
                    <input className='apply-finBtn' type='number' name = 'b11' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 2분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>2</p>
                    <input className='apply-finBtn' type='number' name = 'b12' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 3분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>3</p>
                    <input className='apply-finBtn' type='number' name = 'b13' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 4분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>4</p>
                    <input className='apply-finBtn' type='number' name = 'b14' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 5분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>5</p>
                    <input className='apply-finBtn' type='number' name = 'b15' placeholder='예)  3000' />
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

export default Fin_SelectThree