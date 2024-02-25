import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_SelectTwo = () => {

  const navigate = useNavigate();
  const {selectFinList, setSelectFinList} = useContext(answerContext);
  // 확인 버튼 클릭했을 때
  const handleMoneyClick = () => {
    setSelectFinList(v => ({
      ...v, 
      b6: document.getElementsByName('b6')[0].value,
      b7: document.getElementsByName('b7')[0].value,
      b8: document.getElementsByName('b8')[0].value,
      b9: document.getElementsByName('b9')[0].value,
      b10: document.getElementsByName('b10')[0].value
      
    }));
    navigate('/fin_selectThree');
  };


  return (
    <div className='selectPage'>

        <div className='selectOne'>
          <div className="progress-bar">
              <div className="progressFin2"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>2. 영업이익을 입력해주세요.</h3>
            <p className='selectInfor'>
            * <strong>최소 3개</strong>에서 <strong>최대 5개</strong>까지 <strong>순서대로</strong> 작성해주세요. <br/>
              <strong>1부터 5까지 자료를 최신순으로 기입해주세요.</strong> <br/>
              (분기도 가능합니다)
            </p>
          </div>

          {/* 영업이익 Input */}
          <div className='apply-box5'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  {/* 1분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>1</p>
                    <input className='apply-finBtn' type='number' name = 'b6' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 2분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>2</p>
                    <input className='apply-finBtn' type='number' name = 'b7' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 3분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>3</p>
                    <input className='apply-finBtn' type='number' name = 'b8' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 4분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>4</p>
                    <input className='apply-finBtn' type='number' name = 'b9' placeholder='예)  3000' />
                    <span className="placeholder-text2">만원</span>
                  </div>
                  {/* 5분기 */}
                  <div className="input-wrapper2">
                    <p className='quarter'>5</p>
                    <input className='apply-finBtn' type='number' name = 'b10' placeholder='예)  3000' />
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

export default Fin_SelectTwo