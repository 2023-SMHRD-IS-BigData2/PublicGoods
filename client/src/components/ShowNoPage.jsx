import React from 'react'
import { Link } from 'react-router-dom'

const ShowNoPage  = () => {

    {/*  */}
    return(
        <div className='noShowPg'>

            <div className='noShowBox'>
                <h1 className='noShowSub'>
                    조회한 기업의 자료가 없습니다.
                </h1>

                <div className='noShowBtnBox'>
                    <Link to='/bankApply'><button className='noShowBtn'>제출하러가기</button></Link>
                </div>
            </div>

        </div>

        )   
}

export default ShowNoPage;