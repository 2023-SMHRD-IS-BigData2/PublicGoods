import React from 'react'
import { Link } from 'react-router-dom'

const SelFinance = () => {
  return (
    // 전체 페이지 - div
    <div className='onePage-div'>

        {/* 재무제표 제출하기 - 문서 제출 */}
        <div className='apply-box2'>
            <div className='apply-bank2'>
              <Link to='/fileUpload'><button className='apply-btn'>
                <img src="/images/Screen/study.png" className='bankImg'></img>
                <p className='btn-sub'> 문서 제출하기 <br/> </p>
                <p className='btn-content'>
                  재무상태표 제출 시 <br/>
                  OCR을 통해 재무상태표를 파악합니다.
                </p>
              </button></Link>
            </div>

            {/* 재무제표 제출하기 - 직접 입력하기 */}
            <div className='apply-company2'>
              <Link to='/Fin_SelectOne'>
                <button className='apply-btn'>
                  <img src="/images/Screen/office-building.png" className='comImg'></img>
                  <p className='btn-sub'> 직접 입력하기 </p>
                  <p className='btn-content'>
                    본인의 재무상태를 입력할 수 있습니다. 
                    <br/>
                    <br/>
                  </p>
                </button>
              </Link>
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

export default SelFinance