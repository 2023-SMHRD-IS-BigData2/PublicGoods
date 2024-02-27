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
                <h3 className='intro-start'>안녕하세요. 물론(moolLoan)입니다.</h3>
                <br />
                <br/>
                <p className='intro-context'>
                    저희는 신용평가가 어려운 자영업자와 창업 초기단계 회사를 대상으로 <br/>
                    신용평가 모형을 활용한 기업여신 심사 및 피드백을 제공하는 플랫폼으로 <br/>
                    신용점수 산정을 받고 싶어하는 기업을 위해 기술력 기반 신용점수를 <br/>
                    산정 받고 해당 결과에 대해 피드백을 제공하는 서비스입니다. <br/>
                </p>
            </div>
        </div>

        <div className='addPage'>
        <h3 className='intro-start'>서비스 예시화면</h3>  
            <div className=''>
                <img src="/images/Content/serviceEx.png" alt="exservice-img" className="serviceImg" />
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
                    <img src="/images/Content/serviceImg.png" alt="membership-img" className="membership-img" />
                </p>
            </div>
        </div>

        {/* 4 페이지 - 공지사항 */}
        <div className='fourth-page'>
            <div className='fourth-box'>
                <h3 className='forth-sub'>공지사항</h3>

                    <p className='forth-content'>
                    <b>1. 신생기업이라 재무제표 없습니다. 그래도 신용평가가 가능할까요?</b> <br/>
                    → 저희는 비재무평가만으로도 평가가 가능해서 각종 재무 자료가 없는 경우에도 <br/> 신용평가등급 산출이 가능합니다.<br/>
                    <br/>
                    <br/>
                    <b>2. 피드백 서비스란 무엇인가요?</b><br/>
                    → 대출불가가 나온 원인에 대해서 예상 정보를 제공합니다. <br/>
                      그리고 해당 산업의 산업의 경제 Cycle을 파악하여 해당 기업에 대한 성장가능성 정보를 제공해줍니다.<br/>
                    <br/>
                    <br/>
                    <b>3. 물론(moolLoan) 서비스가 타사의 기업신용평가 서비스와 비교한 장점은 무엇인가요?</b><br/>
                    → 은행에게 정보제공 가능하며, 피드백을 제공합니다.<br/>
                    <br/>
                    <br/>
                    <b>4.  대출 심사는 어떻게 이루어지나요?</b>  <br/>
                    → 재무와 비재무모델에 따른 머신러닝을 이용한 학습된 모델에 데이터를 넣어 <br/>
                    예측된 결과값을 종합하여 대출 가능 불가능 여부에 대해 알려줍니다. <br/>
                    여부에 따라서 동종업계와 비교 및 산업군별 성장가능성을 머신러닝과 딥러닝 모델을 <br/>
                    통해 예측하여 기업의 대출 한도 향상을 목표로 합니다.
                    </p>

                <div className='btn-box'>
                    <Link to='/apply'><button className='app-btn2'>신청하기</button></Link>
                </div>
                <br/>
                <br/>
            </div>
        </div>
        
    </div>
  )
}

export default OnePage