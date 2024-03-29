import React, { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

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
  { name: '기존대출이청산', 비재무: 1800},
  { name: '대출보유기간', 비재무: 1500},
  { name: '평균고용인원수', 비재무: 1100}
];

// 재무 막대그래프
const barData2 = [
  { name: '매출', 재무: 2100},
  { name: '영업이익', 재무: 1800},
  { name: '자산', 재무: 1200},
  { name: '부채', 재무: 1000},
];

const ResultPage = () => {

  useEffect(() => {
    const getGrowthModel = async () => {
      try {
        const user_id = sessionStorage.getItem('user_id');
        const response = await axios.post('http://127.0.0.1:5000/api/getonecode', {
          user_id : user_id
        });
        const data = response.data;
        console.log(data);
        setGrowthModel(data);
      }
      catch (error) {
        console.log('ERROR! : ' + error);
      }
    }

    getGrowthModel();
  }, [])

  // 대출 가능/불가능
  const [moneyValue, setMoneyValue] = useState(50);
  // 비재무 확률
  const [nonPercentValue, setNonPercentValue] = useState(50)
  // 재무 확률
  const [finPercnetValue, setFinPercentValue] = useState(50)
  // 성장모형
  const [growthModel, setGrowthModel] = useState();

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

          <div className='barBoxDiv'>

          <div className='top4'>대출 여부의 영향을 준 상위 4개의 항목</div>

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
          </div>

          {/* 다섯 번째 - 성장률 꺽은선 그래프 대시보드 */}
          <div className='growth_model'>
            <p className='compareLine' style={{marginTop : '100px', fontSize : '40px'}}>성장모형 데이터 분석</p>
            <p className='compareLine' style={{marginTop : '100px'}}>섹터 평균이익</p>
            <LineChart
              width={1300}
              height={300}
              data={growthModel}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" tick={{ fontWeight: 'bold', fill: 'black', display:'none' }} axisLine={{ stroke: 'black' }}/>
              <YAxis tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }} domain={[0, 1000]}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Operating_Income" stroke="#86b4f8" strokeWidth={2.5}/>
            </LineChart>
          </div>

          <div className='growth_model'>
            <p className='compareLine' style={{marginTop : '100px'}}>성장 구간</p>
            <LineChart
              width={1300}
              height={300}
              data={growthModel}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" tick={{ fontWeight: 'bold', fill: 'black', display:'none' }} axisLine={{ stroke: 'black' }}/>
              <YAxis tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }} domain={[0, 1.01]}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="State_0" stroke="#6fb66f" strokeWidth={2.5}/>
            </LineChart>
          </div>
          
          <div className='growth_model'>
            <p className='compareLine' style={{marginTop : '100px'}}>감익 구간</p>
            <LineChart
              width={1300}
              height={300}
              data={growthModel}
              style={{marginBottom : '100px'}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" tick={{ fontWeight: 'bold', fill: 'black', display:'none' }} axisLine={{ stroke: 'black' }}/>
              <YAxis tick={{ fontWeight: 'bold', fill: 'black' }} axisLine={{ stroke: 'black' }} domain={[0, 1.01]}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="State_1" stroke="#FFA500" strokeWidth={2.5}/>
            </LineChart>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResultPage