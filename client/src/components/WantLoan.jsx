import React from 'react'
import { useNavigate } from 'react-router-dom'


const WantLoan  = () => {

    const navigate = useNavigate();

    // 확인버튼 클릭했을 때
    const handleOkClick = (e) => {
      navigate('/resultPage');
    };

    return(
        <div className='wantLoanPg'>

            <div className='wantLoan'>
                {/* 질문 */}
                <div className='question'>
                <h3 className='questionTitle'>원하시는 대출금액을 입력해주세요.</h3>
                </div>
    
                {/* 원하는 대출금액 Input */}
                <div className='wantLoanBox'>
                    <div className='btn-sub2'>
                    <div className="input-wrapper">
                        <input className='apply-btn2' type='number' placeholder='예)  3000' />
                        <span className="placeholder-text">만원</span>
                        <button className='wantBtn' onClick={handleOkClick}>확인</button>
                    </div>
                </div>
                </div>
            </div>

        </div>

        )   
}

export default WantLoan;