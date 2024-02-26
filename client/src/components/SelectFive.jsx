import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from '../context/AnswerContext';

const SelectFive = () => {

    const navigate = useNavigate();
    const { selectList, setSelectList } = useContext(answerContext);

    // 확인버튼 클릭했을 때
    const handleOkClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a5: document.querySelector('.apply-btn2').value
      }));
      navigate('/selectSix');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a5:e.target.innerText
      }));
      navigate('/selectSix');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            {/* Progress-Bar */}
            <div className="progress-bar">
              <div className="progress5"></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>
                5. 신용보증재단, 기술보증재단 등 재단에서 <br/>
                보증한 금액이 있습니까?
              </h3>
            </div>
  
            {/* 금액 Input */}
            <div className='apply-selectBox'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div className="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  2000' />
                    <span className="placeholder-text">만원</span>
                    <button className='okBtn' onClick={handleOkClick}>확인</button>
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

export default SelectFive