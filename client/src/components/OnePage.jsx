import React from 'react'
import { Link } from 'react-router-dom'

const OnePage = () => {
  return (
    // 메인 전체 페이지 - div
    <div className='onePage-div'>

        {/* 1 페이지 - div */}
        <div className='first-page'>
            {/* 1 페이지 - 신청하기 button */}
            <div className='btn-box'>
                <Link to='/apply'><button className='app-btn'>신청하기</button></Link>
            </div>

            {/* 1 페이지 - 물론 소개 */}
            <div className='introBox'>
                <h4 className='intro-start'>안녕하세요. 물론(moolLoan)입니다.</h4>
                <br />
                <p className='intro-context'>
                    저희는 신용평가가 어려운 자영업자와 창업 초기단계 회사를 대상으로 <br/>
                    신용평가 모형을 활용한 기업여신 심사 및 피드백을 제공하는 플랫폼으로 <br/>
                    신용점수 산정을 받고 싶어하는 기업을 위해<br/>
                    기술력 기반 신용점수를 산정 받고 <br/>
                    해당 피드백을 제공하는 서비스를 제공합니다. <br/>
                    <br/>
                    심사의 결과가 대출의 가능/불가능 으로 나오며, <br/>
                    여부에 따라서 동종업계와 비교 및 산업군별 성장가능성을 <br/>
                    머신러닝과 딥러닝 모델을 통해 예측하여 기업의 대출 한도 향상을 목표로 합니다.
                </p>
            </div>
        </div>

        {/* 2 페이지 - 은행, 기업 Process */}
        <div className='second-page'>

            {/* 2 페이지 - 은행 Process */}
            <div className='second-box1'>
                <div className='img-box-name'><h4 className='box1-fir'>은행용</h4><h4 className='box-name'>진행 절차</h4></div>
                <div className='process-img-box1'>
                    <img src="/images/Content/bank-process.png" alt="bank-process-img" className="process-img1" />
                </div>
            </div>

            {/* 2 페이지 - 기업 Process */}
            <div className='second-box2'>
                <div className='img-box-name'><h4 className='box1-fir'>기업용</h4><h4 className='box-name'>진행 절차</h4></div>
                <div className='process-img-box2'>
                    <img src="/images/Content/com-process.png" alt="bank-process-img" className="process-img2" />
                </div>
            </div>
        </div>

        {/* 3 페이지 - Membership */}
        <div className='third-page'>
            <div className='third-box'>
                <h3 className='third-sub'>멤버십</h3>
                <p className='third-content'>
                    <img src="/images/Content/Membership4.png" alt="membership-img" className="membership-img" />
                </p>
            </div>
        </div>

        {/* 4 페이지 - 공지사항 */}
        <div className='fourth-page'>
            <div className='fourth-box'>
                <h3 className='forth-sub'>공지사항</h3>

                <p className='forth-content'>
                1. 신생기업이라 재무제표 없습니다. 그래도 신용평가 진행이 가능할까요? <br/>
                → 저희는 비재무평가만으로도 평가가 가능해서 각종 신고자료가 없는 경우에도 신용평가등급 산출이 가능합니다.<br/>
                <br/>
                <br/>
                2. 피드백 서비스란 무엇인가요?<br/>
                → 불가가 나온다면 동종업계와 비교해서 보완할 부분을 피드백 해주는 서비스입니다.<br/>
                <br/>
                <br/>
                3. 물론(moolLoan) 서비스가 타사의 기업신용평가 서비스와 비교한 장점은 무엇인가요?<br/>
                → 은행에게 정보제공 가능하며, 피드백을 제공합니다.<br/>
                <br/>
                </p>
            </div>
        </div>

        
    </div>
  )
}

export default OnePage