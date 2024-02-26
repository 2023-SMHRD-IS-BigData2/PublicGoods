import React from 'react'
import { useNavigate } from 'react-router-dom';

const OcrCheck = () => {
    const navigate = useNavigate();

    // 맞습니까? 버튼 클릭했을 때
    const handleCheckClick = () => {
      navigate('/allSelectNext');
    };
  
    // 다시 올리기 버튼 클릭했을 때
    const handleAgainClick = () => {
      navigate('/fileUpload');
    };
  
    return (
      // 전체 페이지 - div
    <div className='onePage-div'>

    {/* 체크 리스트 보여주기 */}
    <div className='apply-box3'>
        <div className='apply-bank'>
            <p className='btn-sub2'> OCR 확인하기</p>
            <h2>{data[0]}</h2>
        </div>
    </div>

    {/* 위 사항 맞는지 체크 */}
    <div className='apply-box4'>
        <div className='apply-bank2'>
          <button className='apply-btn4'>
            <p className='btn-sub3' onClick={handleCheckClick}>위 사항이 맞다면 클릭</p>
          </button>
        </div>

        {/* 다시 입력하기 Button */}
        <div className='apply-company2'>
          <button className='apply-btn4'>
            <p className='btn-sub3' onClick={handleAgainClick}>다시 제출하기</p>
          </button>
        </div>
    </div>

    {/* 안내사항 */}
    <div className='information-box'>
      <p className='information-content'>
        * 재무상태표는 최소 3개, 최대 5개의 정보가 필요합니다.<br/>
        분기 또는 연도 자료를 입력해주세요. 입력시에는 <strong>반드시 최신순</strong> 으로 입력해주세요. <br/>
        연도별 자료 예시 23, 22, 21, 20, 19 자료 <br/>
        분기별 자료 예시 23년 4분기 23년 3분기 23년 2분기 23년 1분기
      </p>
    </div>

</div>
    )
}

export default OcrCheck