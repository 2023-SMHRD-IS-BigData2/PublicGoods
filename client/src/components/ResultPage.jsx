import React, { useState } from 'react'

const ResultPage = () => {

  // 대출 가능/불가능
  const [moneyValue, setMoneyValue] = useState(50);
  // 비재무 확률
  const [nonPercentValue, setNonPercentValue] = useState(60)
  // 재무 확률
  const [finPercnetValue, setFinPercentValue] = useState(40)

  // 비재무 -   막대 차트
  const [dataNon, setDataNon] = useState([
    {label : '1', value : 50},
    {label : '2', value : 70},
    {label : '3', value : 90},
    {label : '4', value : 60},
    {label : '5', value : 80},
    {label : '6', value : 50},
    {label : '7', value : 40}
  ])

  // 재무 -   막대 차트
  const [dataFin, setDataFin] = useState([
    {label : '1', value : 50},
    {label : '2', value : 70},
    {label : '3', value : 90},
    {label : '4', value : 60},
  ])

  return (

    // 전체 페이지
    <div className='onePage-div'>

      {/* 전체 큰 틀 */}
      <div className='resultBox'>
        {/* 첫 번째 - 대출 가능/불가능 대시보드 */}
        <div className='firstDash'>
          <div className={moneyValue >= 60 ? 'possImposs possible' : 'possImposs impossible'}>
              {moneyValue >= 60 ? '대출 가능합니다.' : '대출 불가능합니다.'}
          </div>

          {/* 두 번째 - 확률 대시보드 */}
          <div className='secondDash'>
            {/* 비재무 확률 */}
            <div className={nonPercentValue >= 60 ? 'percentValue valueUp' : 'percentValue valueDown'}>
              비재무 <br/> {nonPercentValue}%
            </div>
            {/* 재무 확률 */}
            <div className={finPercnetValue >= 60 ? 'percentValue valueUp' : 'percentValue valueDown'}>
              재무 <br/> {finPercnetValue}%
            </div>
          </div>

          {/* 세 번째, 네 번째 묶기 */}
          <div className='barBox'>
          {/* 세 번째 - 비재무 막대차트 대시보드 */}
          <div className='thirdDash'>
            {/* 막대 그래프의 각 막대를 생성 */}
            {dataNon.map((item, index) => (
              <div key={index} className='bar'>
                <div className="bar-fill" style={{ width: `${item.value}%` }}></div>
              </div>
            ))}
            <div className="labels">
            {/* 라벨을 렌더링합니다 */}
            {dataNon.map((item, index) => (
              <div key={index} className="label">{item.label}</div>
            ))}
          </div>
          </div>

          {/* 네 번째 - 재무 막대차트 대시보드 */}
          <div className='fourDash'>
            {/* 막대 그래프의 각 막대를 생성 */}
            {dataFin.map((item, index) => (
              <div key={index} className='bar'>
                <div className="bar-fill" style={{ width: `${item.value}%` }}></div>
              </div>
            ))}
            <div className="labels">
            {/* 라벨을 렌더링합니다 */}
            {dataFin.map((item, index) => (
              <div key={index} className="label">{item.label}</div>
            ))}
          </div>
          </div>
          </div>

          {/* 다섯 번째 - 성장률 꺽은선 그래프 대시보드 */}
          <div className='fifthDash'>

          </div>

        </div>
      </div>

    </div>
  )
}

export default ResultPage