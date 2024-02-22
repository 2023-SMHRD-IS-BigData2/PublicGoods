import React, { useState } from 'react'

const ShowListPage  = () => {

    {/*  */}
    return(
        <div>
            <table className='checkListTable'>
              <tbody className='checkListTbody'>
                <th>
                  <tr>번호</tr>
                </th>
                <th>
                  <tr>제출 일자</tr>
                </th>
                <th>
                  <tr>확인하기</tr>
                </th>
               
                <tr>
                  <td>1</td>
                  <td>2022.03</td>
                  <td><button>결과보기</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2022.06</td>
                  <td><button>결과보기</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2022.09</td>
                  <td><button>결과보기</button></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>2022.12</td>
                  <td><button>결과보기</button></td>
                </tr>
              </tbody>
            </table>
        </div>

        )   
}

export default ShowListPage;