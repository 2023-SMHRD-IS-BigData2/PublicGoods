import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { answerContext } from './AnswerContext';
import axios from 'axios';

const NonFinCheck = () => {
  const { selectList, setSelectList } = useContext(answerContext);
  const navigate = useNavigate();
  console.log(selectList);

  // 맞다면 클릭 버튼 클릭했을 때
  const handleCheckClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/NonFin', selectList);
      console.log(response.data);
      if (response.data != null) {
        console.log('전송성공!')
        navigate('/finalSelectNonFin');
      }
    }
    catch (error) {
      alert('서버전송 실패!!');
      console.log('ERROR! : ' + error);
    }
  };

  // 다시 입력하기 버튼 클릭했을 때
  const handleAgainClick = () => {

    navigate('/selectOne');
  };


  return (
    // 전체 페이지 - div
    <div className='onePage-div'>

      {/* 체크 리스트 보여주기 */}
      <div className='apply-box3'>
        <div className='apply-bank'>
          <p className='btn-sub2'>비재무 내용 확인하기</p>
          <table className='checkListTable'>
            <th align='center'>
              <tr>번호</tr>
            </th>
            <th>
              <tr>질문 내용</tr>
            </th>
            <th>
              <tr>답변</tr>
            </th>
            <tr>
              <td>1</td>
              <td>기존 대출 연체가 있습니까?</td>
              <td>{selectList.a1}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>기존 대출이 청산이 되어있습니까?</td>
              <td>{selectList.a2}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>기존 대출 보유시 대출 보유 기간이 어떻게 되십니까?(월 단위)</td>
              <td>{selectList.a3}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>계열사가 있습니까?</td>
              <td>{selectList.a4}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>신용보증재단, 기술보증재단 등 재단에서 보증한 금액이 있습니까? (만원 단위)</td>
              <td>{selectList.a5}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>수도권에 있습니까?</td>
              <td>{selectList.a6}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>평균 고용 인원 수가 어떻게 됩니까?</td>
              <td>{selectList.a7}</td>
            </tr>
            <tr>
              <td>8</td>
              <td>은행에게 대출 받은 금액은 얼마입니까? (만원 단위)</td>
              <td>{selectList.a8}</td>
            </tr>
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

      <br/><br/>
      

    </div>
  )
}

export default NonFinCheck