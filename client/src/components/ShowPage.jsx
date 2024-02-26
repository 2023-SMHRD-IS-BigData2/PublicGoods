import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ShowPage = () => {

  const navigate = useNavigate();

  const [searchboxtext, setSearchboxtext] = useState();

  {/* select로직으로 사업자번호를 확인한다 */ }
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/getBusinessNum');
        const jsonData = await response.data;
        console.log(jsonData);
      } catch (error) {
        console.error('ERROR! : ' + error);
      }
    };
    getData();
  }, []);

  const handleInputClick = async () => {    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/findBusinessNum', {
        searchboxtext: searchboxtext
      });
      const data = response.data;
      for(let i=0; i<data.length; i++){
        console.log('data', data[i].deep_result);
        const dataSearch = data[i].deep_result;
        if (dataSearch === '결과있음') {
          navigate('/showListPage')
        }else {
          navigate('/showNoPage')
        }
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
        <input className='searchInput' type='number' placeholder='사업자번호'
          onChange={(e) => setSearchboxtext(parseInt(e.target.value, 10))}></input>
        <button className='searchBtn' onClick={handleInputClick}>조회</button>
      </div>
    </div>
  )
}

export default ShowPage