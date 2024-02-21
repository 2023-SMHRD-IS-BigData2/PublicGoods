import React from 'react'
import { useNavigate } from 'react-router-dom';

const FinalSelect_Fin = () => {
    const navigate = useNavigate();

    // 비재무제출 완료 버튼 클릭했을 때
    const handleSubmitClick = () => {
      navigate('/selectOne');
    };
  
    return (
      // 전체 페이지 - div
    <div className='onePage-div'>

    {/* FinalSelect_Fin - Box */}
    <div className='apply-box'>
      
      {/* 재무제표 제출 시 - 재무제표 체크 완료 */}
      <div className='apply-company'>
        <button className='apply-btn3'>
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

        {/* 비재무제표 제출하기 Button */}
        <div className='apply-bank'>
          <button className='apply-btn' onClick={handleSubmitClick}>
            <img src="/images/Content/submit1.png" className='bankImg'></img>
            <p className='btn-sub'>비재무제표 제출하기 <br/> </p>
            <p className='btn-content'>
              <br/>
              비재무제표는 <strong style={{fontSize:'18px'}}>필수</strong> 제출해야합니다.
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

export default FinalSelect_Fin