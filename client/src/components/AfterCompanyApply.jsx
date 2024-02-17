import React from 'react'
import { Link } from 'react-router-dom'

const AfterCompanyApply = () => {
  return (
    // 기업 신청하기 전체 페이지 - div
    <div className='onePage-div'>

        {/* 기업 신청하기 - 재무제표 Button */}
        <div className='apply-box'>
            <div className='apply-bank'>
              <Link to='/SelFinance'><button className='apply-btn'>
                <img src="/images/Content/documents2.png" className='bankImg'></img>
                <p className='btn-sub'>재무제표 제출<br/> </p>
                <p className='btn-content2'>
                  - 재무상태표 제출 <br/>
                  <br/>
                  <br/>
                  <br/>
                </p>
              </button></Link>
            </div>

            {/* 기업 신청하기 - 비재무제표 Button */}
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
        </div>

    </div>
  )
}

export default AfterCompanyApply