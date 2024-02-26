import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// // 비재무 막대그래프
// const barData1 = [
//   { name: '기존대출연체', 비재무: 5000, amt: 2400},
//   { name: '기존대출이청산', 비재무: 1398, amt: 2210},
//   { name: '대출보유기간', 비재무: 9800, amt: 2290},
//   { name: '평균고용인원수', 비재무: 4300, amt: 2100}
// ];

// // 재무 막대그래프
// const barData2 = [
//   { name: '매출', 재무: 4000, amt: 2400 },
//   { name: '영업이익', 재무: 3000, amt: 2210 },
//   { name: '자산', 재무: 2000, amt: 2290 },
//   { name: '부채', 재무: 2780, amt: 2000 },
// ];

// // 성장률 꺽은선 그래프
// const lineData = [
//   { name: '23년 1분기', 해당기업: 4000, 해당기업의산업군: 2400, amt: 2400 },
//   { name: '23년 2분기', 해당기업: 3000, 해당기업의산업군: 1398, amt: 2210 },
//   { name: '23년 3분기', 해당기업: 2000, 해당기업의산업군: 9800, amt: 2290 },
//   { name: '23년 4분기', 해당기업: 2780, 해당기업의산업군: 3908, amt: 2000 },
//   { name: '24년 1분기', 해당기업: 1890, 해당기업의산업군: 4800, amt: 2181 },
//   { name: '24년 2분기', 해당기업: 2390, 해당기업의산업군: 3800, amt: 2500 },
//   { name: '24년 3분기', 해당기업: 3490, 해당기업의산업군: 4300, amt: 2100 },
// ];

// 비재무 막대그래프
const barData1 = [
  { name: '기존대출연체', 비재무: 2300},
  { name: '기존대출이청산', 비재무: 1500},
  { name: '대출보유기간', 비재무: 1800},
  { name: '평균고용인원수', 비재무: 1100}
];

// 재무 막대그래프
const barData2 = [
  { name: '매출', 재무: 1800},
  { name: '영업이익', 재무: 1000},
  { name: '자산', 재무: 1200},
  { name: '부채', 재무: 2100},
];

// 성장률 꺽은선 그래프
const lineData = [
  { name: '23년 1분기', 해당기업: 3000, 해당기업의산업군: 1500},
  { name: '23년 2분기', 해당기업: 2000, 해당기업의산업군: 1500},
  { name: '23년 3분기', 해당기업: 2000, 해당기업의산업군: 8500},
  { name: '23년 4분기', 해당기업: 2780, 해당기업의산업군: 3908},
  { name: '24년 1분기', 해당기업: 3500, 해당기업의산업군: 2500},
  { name: '24년 2분기', 해당기업: 2390, 해당기업의산업군: 3800},
  { name: '24년 3분기', 해당기업: 3490, 해당기업의산업군: 4300},
];

const ResultPage = () => {

  // 대출 가능/불가능
  const [moneyValue, setMoneyValue] = useState(50);
  // 비재무 확률
  const [nonPercentValue, setNonPercentValue] = useState(50)
  // 재무 확률
  const [finPercnetValue, setFinPercentValue] = useState(50)

  // 데이터를 퍼센트로 변환
  const percentData1 = barData1.map(item => ({
    name: item.name,
    비재무: (item.비재무 / 50).toFixed(0) // 퍼센트로 변환하여 소수점 두 자리까지 표시
  }));

    // 데이터를 퍼센트로 변환
    const percentData2 = barData2.map(item => ({
      name: item.name,
      재무: (item.재무 / 50).toFixed(0) // 퍼센트로 변환하여 소수점 두 자리까지 표시
    }));

    // 데이터를 퍼센트로 변환
    const percentData3 = lineData.map(item => ({
      name: item.name,
      해당기업: (item.해당기업 / 100).toFixed(0), // 퍼센트로 변환하여 소수점 두 자리까지 표시
      해당기업의산업군: (item.해당기업의산업군 / 100).toFixed(0)
    }));

  const styles = {
    valueUp: {
        color: 'white',
        height: '100%',
        width: '50%',
        backgroundColor: 'rgb(79, 148, 79)',
        borderTopLeftRadius: '30px',
        borderBottomLeftRadius: '30px',
        animation: 'percentAnimation1 1s ease forwards'
    },
    valueDown: {
        color: 'white',
        height: '100%',
        width: '50%',
        backgroundColor: 'rgb(185, 62, 62)',
        borderTopRightRadius: '30px',
        borderBottomRightRadius: '30px',
        animation: 'percentAnimation2 1s ease forwards'
    }
  };

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
            <div className={nonPercentValue >= 60 ? 'percentValue valueUp' : 'percentValue valueDown'} style={styles.valueUp}>
              비재무 <br/> {nonPercentValue}%
            </div>
            {/* 재무 확률 */}
            <div className={finPercnetValue <= 60 ? 'percentValue valueUp' : 'percentValue valueDown'} style={styles.valueDown}>
              재무 <br/> {finPercnetValue}%
            </div>
          </div>


          {/* 세 번째, 네 번째 묶기 */}
          <div className='barBox'>
          {/* 세 번째 - 비재무 막대차트 대시보드 */}
          <div className='thirdDash'>
            <p className='nonChart'>비재무 차트</p>
            <BarChart
              width={700}
              height={300}
              data={percentData1}
              layout="vertical" // 옆으로 막대 그래프를 표시하기 위해 'vertical'로 설정
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/> {/* X축을 수직으로 설정 */}
              <YAxis dataKey="name" type="category" width={120} tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/> 
              <Tooltip />
              <Legend />
              <Bar dataKey="비재무" fill="#8884d8" barSize={25} /> {/* barSize로 막대의 높이 설정 */}
            </BarChart>
          </div>

          {/* 네 번째 - 재무 막대차트 대시보드 */}
          <div className='fourDash'>
            <p className='finChart'>재무 차트</p>
            <BarChart
                width={700}
                height={300}
                data={percentData2}
                layout="vertical" // 옆으로 막대 그래프를 표시하기 위해 'vertical'로 설정
                margin={{ right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/> {/* X축을 수직으로 설정 */}
                <YAxis dataKey="name" type="category" width={70} tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/> {/* Y축을 범주형으로 설정 */}
                <Tooltip />
                <Legend />
                <Bar dataKey="재무" fill="#ffa2ba" barSize={25} /> {/* barSize로 막대의 높이 설정 */}
              </BarChart>
            </div>
          </div>


          {/* 다섯 번째 - 성장률 꺽은선 그래프 대시보드 */}
          <div className='fifthDash'>
            <p className='compareLine'>해당 산업군과 해당 기업 비교</p>
            <LineChart
              width={1500}
              height={500}
              data={percentData3}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/>
              <YAxis tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="해당기업" stroke="#86b4f8" strokeWidth={2.5}/>
              <Line type="monotone" dataKey="해당기업의산업군" stroke="#eeb53a" strokeWidth={2.5}/>
            </LineChart>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResultPage