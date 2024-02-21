import React, { useState } from 'react'

const ShowPage = () => {

  const [placeholder, setPlaceHolder] = useState('사원번호');

  const handleInputClick = () => {
    setPlaceHolder('');
  }

  return (
    <div className='onePage-div'>
      <div className='searchBox'>
        <input className='searchInput' type='text' placeholder={placeholder} onClick={handleInputClick}></input>
        <button className='searchBtn'>조회</button>
      </div>
    </div>
  )
}

export default ShowPage