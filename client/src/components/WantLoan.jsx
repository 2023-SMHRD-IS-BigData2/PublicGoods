import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const WantLoan  = () => {

    const navigate = useNavigate();

    // const handleOkClick = () => {
    //     const user_id = sessionStorage.getItem('user_id');
    
    //     if (user_id !== null) {
    //       const userType = sessionStorage.getItem('user_type');
    
    //       if (userType === 'BBB') {
    //         navigate('/resultPage');
    //       } else {
    //         navigate('/resultPage2');
    //       }
    //     }
    // }

    // 확인버튼 클릭했을 때
    const handleOkClick = () => {
      navigate('/resultPage');
    };

    // 확인2버튼 클릭했을 때
    const handleOkClick2 = () => {
        navigate('/resultPage2');
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
                        <button className='wantBtn2' onClick={handleOkClick2}>확인</button>
                    </div>
                </div>
                </div>
            </div>

        </div>

        )   
}

export default WantLoan;