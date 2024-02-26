import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const ShowPage = () => {

  {/* 여기 위 수정 */}
  const [placeholder, setPlaceHolder] = useState('사업자번호');
  const [searchboxtext, setSearchboxtext] = useState(0);

  {/* select로직으로 사업자번호를 확인한다 */}
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/getBusinessNum');
        const jsonData = await response.data;
        console.log(jsonData);
      } catch(error) {
        console.error('ERROR! : ' + error);
      }
    };
    getData();
  }, []);

  const handleInputClick = async () => {
    // setPlaceHolder('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/getBusinessNum', {
        searchboxtext : searchboxtext
      });
      if (response.data.result != false) {
        console.log(response.data.result);
      }
    }
    catch (error) {
      console.log('ERROR! : ' + error);
    } 
  }

  return (
    <div className='showPg'>
      <p className='searchSub'>조회하고 싶은 기업의 사업자번호를 입력하세요.</p>
      <div className='searchBox'>
          <input className='searchInput' type='text' placeholder={placeholder} onClick={handleInputClick} 
          onChange={(e) => setSearchboxtext(parseInt(e.target.value, 10))}></input>
        <Link to='/ShowListPage'><button className='searchBtn'>조회</button></Link>
      </div>
    </div>
  )
}

export default ShowPage