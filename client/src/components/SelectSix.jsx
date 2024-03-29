import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from '../context/AnswerContext';

const SelectSix = () => {

    const navigate = useNavigate();
    const { selectList, setSelectList } = useContext(answerContext);

    // 있습니다. 클릭했을 때
    const handleYesClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a6:e.target.innerText
      }));
      navigate('/selectSeven');
    };
  
    // 없습니다. 클릭했을 때
    const handleNoClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a6:e.target.innerText
      }));
      navigate('/selectSeven');
    };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = (e) => {
      setSelectList(setSelectList => ({
        ...setSelectList, a6:e.target.innerText
      }));
      navigate('/selectSeven');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
            {/* Progress-Bar */}
            <div className="progress-bar">
              <div className="progress6"></div>
            </div>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>6. 수도권에 있습니까?</h3>
            </div>
  
            {/* 있습니다 Button */}
            <div className='apply-selectBox'>
                <div className='apply-bank'>
                  <button className='apply-btn' onClick={handleYesClick}>
                    <p className='btn-sub'>있습니다.<br/> </p>
                  </button>
                </div>
  
            {/* 없습니다 Button */}
            <div className='apply-bank'>
              <button className='apply-btn' onClick={handleNoClick}>
                 <p className='btn-sub'>없습니다.<br/> </p>
              </button>
            </div>
  
            {/* 모릅니다 Button */}
              <div className='apply-bank' onClick={handleKnowClick}>
                <button className='apply-btn'>
                  <p className='btn-sub'>모릅니다.<br/> </p>
                </button>
              </div>
            </div>
          </div>
  
      </div>
    )
}

export default SelectSix