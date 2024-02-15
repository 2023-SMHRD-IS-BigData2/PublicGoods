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
import FinalSelect from './components/FinalSelect';
import ResultPage from './components/ResultPage';
import AfterCompanyApply from './components/AfterCompanyApply';

import SelectOne from './components/SelectOne';
import SelectTwo from './components/SelectTwo';
import SelectThree from './components/SelectThree';
import SelectFour from './components/SelectFour';
import SelectFive from './components/SelectFive';
import SelectSix from './components/SelectSix';
import SelectSeven from './components/SelectSeven';
import SelectEight from './components/SelectEight';

import Header from './components/Header';
import Footer from './components/Footer';

function project() {
  return (
    <div>

        <Header />

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
            {/* 비재무제출 후 기업 신청하기 상세 페이지 */}
            <Route path='/afterApply' element={<AfterCompanyApply/>} />
            {/* 재무제표 제출 페이지 */}
            <Route path='/fileUpload' element={<FileUpload/>} />
            {/* 비재무제표 제출 페이지 - 질문에 따라 */}
            <Route path='/selectOne' element={<SelectOne/>} />
            <Route path='/selectTwo' element={<SelectTwo/>} />
            <Route path='/selectThree' element={<SelectThree/>} />
            <Route path='/selectFour' element={<SelectFour/>} />
            <Route path='/selectFive' element={<SelectFive/>} />
            <Route path='/selectSix' element={<SelectSix/>} />
            <Route path='/selectSeven' element={<SelectSeven/>} />
            <Route path='/selectEight' element={<SelectEight/>} />
            {/* 비재무제표 제출 하고 난 후의 선택하는 페이지 */}
            <Route path='/finalSelect' element={<FinalSelect/>} />
            {/* 비재무제표 제출한 후 결과 확인 페이지 */}
            <Route path='/resultPage' element={<ResultPage/>} />
        </Routes>

        <Footer />

    </div>
  )
}

export default project;
