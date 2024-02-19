import React from 'react'
import { useNavigate } from 'react-router-dom';

const FinalSelect_nonFin = () => {
    const navigate = useNavigate();

    // 비재무제출 완료 버튼 클릭했을 때
    const handleSubmitClick = () => {
      navigate('/afterApply');
    };
  
    // 결과 확인 버튼 클릭했을 때
    const handleResultClick = () => {
      navigate('/resultPage');
    };
  
    return (
      // 신청하기 전체 페이지 - div
    <div className='onePage-div'>

    {/* 신청하기 - 은행 Button */}
    <div className='apply-box'>
        <div className='apply-bank'>
          <button className='apply-btn' onClick={handleSubmitClick}>
            <img src="/images/Content/submit1.png" className='bankImg'></img>
            <p className='btn-sub'>재무제표 제출하기 <br/> </p>
            <p className='btn-content'>
              비재무제표 제출 완료
            </p>
          </button>
        </div>

        {/* 신청하기 - 기업 Button */}
        <div className='apply-company'>
          <button className='apply-btn' onClick={handleResultClick}>
            <img src="/images/Content/result.png" className='comImg'></img>
            <p className='btn-sub'>결과 확인 <br/> </p>
            <p className='btn-content'>
               <br/>
            </p>
          </button>
        </div>
    </div>

</div>
    )
}

export default FinalSelect_nonFin