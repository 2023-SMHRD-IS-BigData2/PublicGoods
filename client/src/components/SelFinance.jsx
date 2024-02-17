import React from 'react'
import { Link } from 'react-router-dom'

const selectFinance = () => {
  return (
    // 신청하기 전체 페이지 - div
    <div className='onePage-div'>

        {/* 문서 제출하기 */}
        <div className='apply-box'>
            <div className='apply-bank'>
              <Link to='/fileUpload'><button className='apply-btn'>
                <img src="/images/Screen/study.png" className='bankImg'></img>
                <p className='btn-sub'> 문서 제출하기 <br/> </p>
                <p className='btn-content'>
                  재무 상태표를 제출하면 OCR을 통해 <br/>
                  재무상태표를 파악합니다.
                </p>
              </button></Link>
            </div>

            {/* 직접 입력하기 Button */}
            <div className='apply-company'>
              <Link to='/Fin_SelectOne'><button className='apply-btn'>
                <img src="/images/Screen/office-building.png" className='comImg'></img>
                <p className='btn-sub'> 직접 입력하기 <br/> </p>
                <p className='btn-content'>
                  본인의 재무상태를 직접 입력할 수 있습니다. 
                  
                </p>
              </button></Link>
            </div>
        </div>

    </div>
  )
}

export default selectFinance