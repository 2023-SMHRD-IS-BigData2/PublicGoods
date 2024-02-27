import React from 'react'
import { Link } from 'react-router-dom';

const ShowListPage  = () => {

    return(
        <div className='showListPge'>

          <div className='showBox'>
            <table className='showListTable'>
              <tbody className='showListTbody'>
                <tr>
                  <th className='firstTh'>번호</th>
                  <th className='secondTh'>제출 일자</th>
                  <th className='thirdTh'>확인하기</th>
                </tr>

                <tr>
                  <td className='numberTd'>1</td>
                  <td>2022.12</td>
                  <td><Link to='/resultPage'><button className='showListBtn'>결과보기</button></Link></td>
                </tr>

                <tr>
                  <td className='numberTd'>2</td>
                  <td>2022.09</td>
                  <td><button className='showListBtn'>결과보기</button></td>
                </tr>

                <tr>
                  <td className='numberTd'>3</td>
                  <td>2022.06</td>
                  <td><button className='showListBtn'>결과보기</button></td>
                </tr>

                <tr>
                  <td className='numberTd'>4</td>
                  <td>2022.03</td>
                  <td><button className='showListBtn'>결과보기</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        )   
}

export default ShowListPage;