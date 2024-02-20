import {Routes, Route} from 'react-router-dom'
import React from 'react';
import './basic.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import OnePage from './components/OnePage';
import Apply from './components/Apply';
import BankLogin from './components/BankLogin';
import BankJoin from './components/BankJoin';
import CompanyLogin from './components/CompanyLogin'
import CompanyJoin from './components/CompanyJoin'
import BankApply from './components/BankApply';
import CompanyApply from './components/CompanyApply';
import FileUpload from './components/FileUpload';
import ResultPage from './components/ResultPage';
import ShowPage from './components/ShowPage';

import SelectOne from './components/SelectOne';
import SelectTwo from './components/SelectTwo';
import SelectThree from './components/SelectThree';
import SelectFour from './components/SelectFour';
import SelectFive from './components/SelectFive';
import SelectSix from './components/SelectSix';
import SelectSeven from './components/SelectSeven';
import SelectEight from './components/SelectEight';

import SelFinance from './components/SelFinance';
import Fin_SelectOne from './components/Fin_SelectOne';
import Fin_SelectTwo from './components/Fin_SelectTwo';
import Fin_SelectThree from './components/Fin_SelectThree';
import Fin_SelectFour from './components/Fin_SelectFour';

import Fin_Check from './components/Fin_Check';
import NonfinCheck from './components/NonFinCheck';
import OcrCheck from './components/OcrCheck';
import FinalSelect_nonFin from './components/FinalSelect_nonFin';
import FinalSelect_Fin from './components/FinalSelect_Fin';
import AllSelectNext from './components/AllSelectNext';

import Header from './components/Header';
import LoginHeader from './components/LoginHeader';
import Footer from './components/Footer';

function project() {
  return (
    <div>

        <Header />
        <LoginHeader />

        <Routes>
            {/* 메인페이지 */}
            <Route path='/' element={<OnePage/>} />
            {/* 신청하기 페이지 */}
            <Route path='/apply' element={<Apply/>}></Route>
            {/* 은행 로그인 페이지 */}
            <Route path='/bankLogin' element={<BankLogin/>} />
            {/* 은행 회원가입 페이지 */}
            <Route path='/bankJoin' element={<BankJoin/>} />
            {/* 기업 로그인 페이지 */}
            <Route path='/companyLogin' element={<CompanyLogin/>} />
            {/* 기업 회원가입 페이지 */}
            <Route path='/companyJoin' element={<CompanyJoin/>} />

            {/* 은행 신청하기 상세 페이지 */}
            <Route path='/BankApply' element={<BankApply/>} />
            {/* 기업 신청하기 상세 페이지 */}
            <Route path='/companyApply' element={<CompanyApply/>} />
            
            {/* 재무제표 제출 페이지 */}
            <Route path='/fileUpload' element={<FileUpload/>} />
            {/* OCR 체크 페이지 */}
            <Route path='/ocrCheck' element={<OcrCheck/>} />
            {/* 비재무제표 제출 페이지 - 질문에 따라 */}
            <Route path='/selectOne' element={<SelectOne/>} />
            <Route path='/selectTwo' element={<SelectTwo/>} />
            <Route path='/selectThree' element={<SelectThree/>} />
            <Route path='/selectFour' element={<SelectFour/>} />
            <Route path='/selectFive' element={<SelectFive/>} />
            <Route path='/selectSix' element={<SelectSix/>} />
            <Route path='/selectSeven' element={<SelectSeven/>} />
            <Route path='/selectEight' element={<SelectEight/>} />
           
            {/* 비재무제표 제출한 후 결과 확인 페이지 */}
            <Route path='/resultPage' element={<ResultPage/>} />
            {/* 은행 신청하기 조회 페이지 */}
            <Route path='/showPage' element={<ShowPage/>} />

            {/* 재무제표 직접 제출하기 */}
            <Route path='selFinance' element={<SelFinance/>}/>
            <Route path='/fin_selectOne' element={<Fin_SelectOne/>} />
            <Route path='/fin_selectTwo' element={<Fin_SelectTwo/>} />
            <Route path='/fin_selectThree' element={<Fin_SelectThree/>} />
            <Route path='/fin_selectFour' element={<Fin_SelectFour/>} />
            
            {/* 재무 비재무 제출시 다른 제출로 넘어가는 페이지 */}
            <Route path='/nonFinCheck' element={<NonfinCheck/>}/>
            <Route path='/fin_Check' element={<Fin_Check/>}/>

            {/* 재무 비재무 제출시 마지막 체크 페이지 */}
            <Route path='/finalSelectNonFin' element={<FinalSelect_nonFin/>}/>
            <Route path='/finalSelectFin' element={<FinalSelect_Fin/>}/>

            {/* 재무 비재무 둘 다 제출했을 때 결과버튼만 나오는 페이지 */}
            <Route path='/allSelectNext' element={<AllSelectNext/>}/>
        </Routes>

        <Footer />

    </div>
  )
}

export default project;
