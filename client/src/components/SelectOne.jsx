import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';


const SelectOne = () => {

  const {selectList, setSelectList} = useContext(answerContext);

  const navigate = useNavigate();
  // 있습니다. 클릭했을 때
  const handleYesClick = (e) => {
    setSelectList(setSelectList => ({
      ...setSelectList, a1:e.target.innerText
    }));
    navigate('/selectTwo');
  };

  // 없습니다. 클릭했을 때
  const handleNoClick = (e) => {
    setSelectList({a1:e.target.innerText})
    navigate('/selectTwo');
  };

  // 모릅니다. 클릭했을 때
  const handleKnowClick = (e) => {
    setSelectList({a1:e.target.innerText})
    navigate('/selectTwo');
  };

  return (
    <div className='selectPage'>

        <div className='selectOne'>
          {/* Progress-Bar */}
          <div class="progress-bar">
            <div className="progress1"></div>
          </div>

          {/* 질문 */}
          <div className='question'>
            <h3 className='questionTitle'>기존 대출 연체가 있습니까?</h3>
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

export default SelectOne