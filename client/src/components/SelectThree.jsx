import React from 'react'
import { useNavigate } from 'react-router-dom';

const SelectThree = () => {
    const navigate = useNavigate();

    // 확인버튼 클릭했을 때
    const handleMonthClick = () => {
        navigate('/selectFour');
      };
  
    // 모릅니다. 클릭했을 때
    const handleKnowClick = () => {
      navigate('/selectFour');
    };
  
    return (
      <div className='selectPage'>
  
          <div className='selectOne'>
  
            {/* 질문 */}
            <div className='question'>
              <h3 className='questionTitle'>
                기존 대출 보유시 대출 보유 기간이 어떻게 되십니까? <br/>
                (월 단위)
              </h3>
            </div>
  
            {/* 개월 Input */}
            <div className='apply-box'>
                <div className='apply-bank'>
                  <div className='btn-sub2'>
                    <div class="input-wrapper">
                        <input className='apply-btn2' type='number' placeholder='예)  2' />
                        <span className="placeholder-text">개월</span>
                        <button className='okBtn' onClick={handleMonthClick}>확인</button>
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

export default SelectThree