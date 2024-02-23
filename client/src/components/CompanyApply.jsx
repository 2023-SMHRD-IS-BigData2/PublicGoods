import React from 'react'
import { Link } from 'react-router-dom'

const CompanyApply = () => {
  return (
    // 기업 신청하기 전체 페이지 - div
    <div className='onePage-div'>

        {/* 기업 신청하기 - 재무제표 Button */}
        <div className='apply-box'>
            <div className='apply-bank'>
              <Link to='/SelFinance'><button className='apply-btn'>
                <img src="/images/Content/documents2.png" className='bankImg'></img>
                <p className='btn-sub'>재무상태표 제출<br/> </p>
                <p className='btn-content2'>
                  - 매출액 <br/>
                  - 영업이익<br/>
                  - 자산  <br/>
                  - 부채 <br/>
                </p>
              </button></Link>
            </div>

            {/* 기업 신청하기 - 비재무제표 Button */}
            <div className='apply-bank'>
              <Link to='/selectOne'><button className='apply-btn'>
                <img src="/images/Content/documents3.png" className='comImg'></img>
                <p className='btn-sub'>비재무제표 제출<br/> </p>
                <p className='btn-content2'>
                  - 기존 대출 연제 여부 <br/>
                  - 청산여부 <br/>
                  - 신용보증재단 보증한 금액 <br/>
                  - 등등 <br/>
                </p>
              </button></Link>
            </div>
        </div>

    </div>
  )
}

export default CompanyApply