import React from 'react'
import { useNavigate } from 'react-router-dom';

const FinalSelect_nonFin = () => {
    const navigate = useNavigate();

    // 비재무제출 완료 버튼 클릭했을 때
    const handleSubmitClick = () => {
      navigate('/selFinance');
    };
  
    // 결과 확인 버튼 클릭했을 때
    const handleResultClick = () => {
      navigate('/wantLoan');
    };
  
    return (
      // 전체 페이지 - div
    <div className='onePage-div'>

    {/* FinalSelect_nonFin - Box */}
    <div className='apply-box'>

      {/* 비재무제표 제출 시 - 비재무제표 체크 완료 */}
      <div className='apply-company'>
        <button className='apply-btn3'>
          <img src="/images/Content/documents3.png" className='comImg'></img>
          <p className='btn-sub'>비재무제표 제출<br/> </p>
          <p className='btn-content2'>
            - 기존 대출 연제 여부 <br/>
            - 청산여부 <br/>
            - 신용보증재단 보증한 금액 <br/>
            - 등등 <br/>
          </p>
        </button>
        <img src="/images/Content/check.png" className='checkImg'></img>
      </div>

        {/* 재무제표 제출하기 Button */}
        <div className='apply-company'>
          <button className='apply-btn' onClick={handleSubmitClick}>
            <img src="/images/Content/submit1.png" className='bankImg'></img>
            <p className='btn-sub'>재무제표 제출하기 <br/> </p>
            <p className='btn-content'>
              <br/>
              재무제표는 <strong style={{fontSize : '18px'}}>선택사항</strong> 입니다. <br/>
              (제출하면 더 정확한 정보를 얻을 수 있습니다.)
              <br/>
              <br/>
              <br/>
            </p>
          </button>
        </div>

        {/* 결과 확인 Button */}
        <div className='apply-company'>
          <button className='apply-btn' onClick={handleResultClick}>
            <img src="/images/Content/result.png" className='comImg'></img>
            <p className='btn-sub'>결과 확인 <br/> </p>
            <p className='btn-content'>
               <br/>
               <br/>
               <br/>
               <br/>
            </p>
          </button>
        </div>
    </div>

</div>
    )
}

export default FinalSelect_nonFin