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
          * <strong>재무상태표는 최소 3개, 최대 5개의 정보가 필요합니다.</strong><br/>
          * <strong>1부터 5까지 분기 또는 연도 자료를 최신순으로 기입해주세요.<br/></strong>
          연도별 자료 예시 1) 23년 2) 22년 3) 21년 4) 20년 5) 19년<br/>
          분기별 자료 예시 1) 23년 4분기 2) 23년 3분기 3) 23년 2분기 4) 23년 1분기 5) 22년 4분기
          </p>
        </div>
    </div>
  )
}

export default SelFinance