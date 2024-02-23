import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ShowPage = () => {


  {/* select로직으로 사업자번호를 확인한다 */}
 

  {/* 여기 위 수정 */}
  const [placeholder, setPlaceHolder] = useState('사업자번호');

  const handleInputClick = () => {
    setPlaceHolder('');
  }

  return (
    <div className='showPg'>
      <p className='searchSub'>조회하고 싶은 기업의 사업자번호를 입력하세요.</p>
      <div className='searchBox'>
          <input className='searchInput' type='text' placeholder={placeholder} onClick={handleInputClick}></input>
        <Link to='/ShowListPage'><button className='searchBtn'>조회</button></Link>
      </div>
    </div>
  )
}

export default ShowPage