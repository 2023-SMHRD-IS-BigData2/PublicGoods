import React from 'react'
import { useNavigate } from 'react-router-dom';

const AllSelectNext = () => {
    const navigate = useNavigate();
  
    // 결과 확인 버튼 클릭했을 때
    const handleResultClick = () => {
      navigate('/wantLoan');
    };
  
    return (
      // 전체 페이지 - div
    <div className='onePage-div'>

    {/* AllSelect_Fin - box */}
    <div className='apply-box'>
      
      {/* 재무제표 제출 - 체크완료 */}
      <div className='apply-company'>
        <button className='apply-btn3' style={{width : '345px'}}>
          <img src="/images/Content/documents3.png" className='comImg'></img>
          <p className='btn-sub'>재무제표 제출<br/> </p>
          <p className='btn-content2'>
            - 매출액 <br/>
            - 영업이익<br/>
            - 자산<br/>
            - 부채 <br/>
          </p>
        </button>
        <img src="/images/Content/check.png" className='checkImg'></img>
      </div>

      {/* 비재무제표 제출 - 체크완료 */}
      <div className='apply-company'>
        <button className='apply-btn3' style={{width : '345px'}}>
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

        {/* 결과 버튼 */}
        <div className='apply-company'>
          <button className='apply-btn 'style={{width : '345px'}} onClick={handleResultClick}>
            <img src="/images/Content/result.png" className='comImg'></img>
            <p className='btn-sub'>결과 확인</p>
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

export default AllSelectNext