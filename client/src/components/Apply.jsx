import React from 'react'
import { Link } from 'react-router-dom'

const Apply = () => {
  return (
    // 신청하기 전체 페이지 - div
    <div className='onePage-div'>

        {/* 신청하기 - 은행 Button */}
        <div className='apply-box'>
            <div className='apply-bank'>
              <Link to='/bankLogin'><button className='apply-btn'>
                <img src="/images/Screen/study.png" className='bankImg'></img>
                <p className='btn-sub'>은행(심사자) <br/> </p>
                <p className='btn-content'>
                  기업의 재무제표 확인, 기업의 평가 결과 확인 <br/>
                  등 기업 파악에 도움을 받고싶은 심사자
                </p>
              </button></Link>
            </div>

            {/* 신청하기 - 기업 Button */}
            <div className='apply-bank'>
              <Link to='/companyLogin'><button className='apply-btn'>
                <img src="/images/Screen/office-building.png" className='comImg'></img>
                <p className='btn-sub'>법인(사업자) <br/> </p>
                <p className='btn-content'>
                  본인의 대출한도를 향상시키고, 동종업계와의 <br/>
                  비교를 통한 피드백을 받고싶은 피심사자
                </p>
              </button></Link>
            </div>
        </div>

    </div>
  )
}

export default Apply