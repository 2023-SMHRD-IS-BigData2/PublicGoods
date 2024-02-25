import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { answerContext } from './AnswerContext';

const SelectThree = () => {

  const navigate = useNavigate();
  const { selectList, setSelectList } = useContext(answerContext);

  // 확인버튼 클릭했을 때
  const handleMonthClick = (e) => {

    setSelectList(setSelectList => ({
      ...setSelectList, a3: document.querySelector('.apply-btn2').value
    }));
    navigate('/selectFour');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = (e) => {
    setSelectList(setSelectList => ({
      ...setSelectList, a3: e.target.innerText
    }));
    navigate('/selectFour');
  };

  return (
    <div className='selectPage'>

      <div className='selectOne'>
        {/* Progress-Bar */}
        <div className="progress-bar">
          <div className="progress3"></div>
        </div>

        {/* 질문 */}
        <div className='question'>
          <h3 className='questionTitle'>
            3. 기존 대출 보유시 대출 보유 기간이 어떻게 되십니까? <br />
            (월 단위)
          </h3>
        </div>

        {/* 개월 Input */}
        <div className='apply-selectBox'>
          <div className='apply-bank'>
            <div className='btn-sub2'>
              <div className="input-wrapper">
                <input className='apply-btn2'   type='number'  placeholder='예)  2' />
                <span className="placeholder-text">개월</span>
                <button className='okBtn' onClick={handleMonthClick}>확인</button>
              </div>
            </div>
          </div>

          {/* 모릅니다 Button */}
          <div className='apply-company' onClick={handleKnowClick}>
            <button className='apply-btn'>
              <p className='btn-sub'>모릅니다.</p>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SelectThree