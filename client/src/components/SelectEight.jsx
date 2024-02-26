import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from '../context/AnswerContext';

const SelectEight = () => {

    const navigate = useNavigate();
    const { selectList, setSelectList } = useContext(answerContext);

    // 확인버튼 클릭했을 때
    const handleOkClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a8: document.querySelector('.apply-btn2').value
      }));
      navigate('/nonFinCheck');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a8:e.target.innerText
      }));
      navigate('/nonFinCheck');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            {/* Progress-Bar */}
            <div className="progress-bar">
              <div className="progress8"></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>8. 은행에게 대출 받은 금액은 얼마입니까?</h3>
            </div>
  
            {/* 금액 Input */}
            <div className='apply-selectBox'>
              <div className='apply-bank'>
                <div className='btn-sub2'>
                  <div className="input-wrapper">
                    <input className='apply-btn2' type='number' placeholder='예)  1000' />
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

export default SelectEight