import React from 'react'
import { useNavigate } from 'react-router-dom';

const NonFinCheck = () => {
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
            <p className='btn-sub'>표로 기존의 선택한것 보여주기 <br/> </p>
            <p className='btn-content'>
            
            </p>
          </button>
        </div>

        {/* 신청하기 - 기업 Button */}
        <div className='apply-company'>
          <button className='apply-btn' onClick={handleResultClick}>
            <img src="/images/Content/result.png" className='comImg'></img>
            <p className='btn-sub'>버튼으로 위 사항이 맞습니까하고 그 버튼 누르면 DB입력하고 FinalSelect_nonFin으로 보내기/ 다시 입력하러 가기로 처음으로 보내기 <br/> </p>
            <p className='btn-content'>
               <br/>
            </p>
          </button>
        </div>
    </div>

</div>
    )
}

export default NonFinCheck