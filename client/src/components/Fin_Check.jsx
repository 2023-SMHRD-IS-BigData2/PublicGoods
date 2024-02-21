import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';

const Fin_Check = () => {

    const {selectFinList, setSelectFinList} = useContext(answerContext);
    const navigate = useNavigate();

    // 맞습니까? 버튼 클릭했을 때
    const handleCheckClick = () => {
      navigate('/finalSelectFin');
    };
  
    // 다시 입력하기 버튼 클릭했을 때
    const handleAgainClick = () => {
      navigate('/fin_selectOne');
    };
  
    return (
      // 전체 페이지 - div
    <div className='onePage-div'>

    {/* 체크 리스트 보여주기 */}
    <div className='apply-box3'>
        <div className='apply-bank'>
            <p className='btn-sub2'>재무제출 확인하기</p>
            <table className='checkListTable'>
              <tbody className='checkListTbody'>
                <th>
                  <tr>번호</tr>
                </th>
                <th>
                  <tr>질문</tr>
                </th>
                <th>
                  <tr>1</tr>
                </th>
                <th>
                  <tr>2</tr>
                </th>
                <th>
                  <tr>3</tr>
                </th>
                <th>
                  <tr>4</tr>
                </th>
                <th>
                  <tr>5</tr>
                </th>
                <tr>
                  <td>1</td>
                  <td>매출을 입력해주세요.</td>
                  <td>1911</td>
                  <td>3022</td>
                  <td>2796</td>
                  <td>2368</td>
                  <td>2122</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>영업이익을 입력해주세요.</td>
                  <td>433</td>
                  <td>516</td>
                  <td>359</td>
                  <td>322</td>
                  <td>311</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>자산을 입력해주세요.</td>
                  <td>4544</td>
                  <td>4484</td>
                  <td>4266</td>
                  <td>4266</td>
                  <td>3782</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>부채를 입력해주세요.</td>
                  <td>905</td>
                  <td>936</td>
                  <td>1217</td>
                  <td>1022</td>
                  <td>1113</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>

    {/* 위 사항 맞는지 체크 */}
    <div className='apply-box4'>
        <div className='apply-bank2'>
          <button className='apply-btn4'>
            <p className='btn-sub3' onClick={handleCheckClick}>위 사항이 맞다면 클릭</p>
          </button>
        </div>

        {/* 다시 입력하기 Button */}
        <div className='apply-company2'>
          <button className='apply-btn4'>
            <p className='btn-sub3' onClick={handleAgainClick}>다시 입력하기</p>
          </button>
        </div>
    </div>

    {/* 안내사항 */}
    <div className='information-box'>
      <p className='information-content2'>
        * <strong>1부터 5까지 최신순으로 기입해주세요.<br/></strong>
        연도별 자료 예시 1) 23년 2) 22년 3) 21년 4) 20년 5) 19년<br/>
        분기별 자료 예시 1) 23년 4분기 2) 23년 3분기 3) 23년 2분기 4) 23년 1분기 5) 22년 4분기
      </p>
    </div>

</div>
    )
}

export default Fin_Check