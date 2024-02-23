import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CompanyJoin = () => {
    const [businessCategory, setBusinessCategory] = useState('');
    const [errorMessageCategory, setErrorMessageCategory] = useState('');
    const [businessNum, setBusinessNum] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const navigate = useNavigate();

    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/join', {
                idInput: idInput,
                pwNum: pwNum,
                businessCategory : businessCategory,
                businessNum: businessNum
            });
            if (response.data.Insert) {
                alert('회원가입에 성공했습니다! 로그인 페이지로 돌아갑니다.')
                navigate('/companyLogin')
            } else {
                alert('회원가입에 실패하였습니다!');
            }
        } catch (error) {
            console.error('ERROR!!', error);
        }
    };

    const handleLogin = () => {
        let hasError = false;

        // 사업자 산업군
        if (!businessCategory.trim()) {
            setErrorMessageCategory('산업군을 선택해주세요.');
        } else {
            setErrorMessageCategory('');
            // 여기에 로그인 로직을 추가하세요
        }

        // 사업자 등록 번호
        if (!businessNum.trim()) {
            setErrorMessage('올바른 사업자 등록 번호를 입력하세요.');
        } else {
            setErrorMessage('');
            // 여기에 로그인 로직을 추가하세요
        }
        // 아이디
        if (!idInput) {
            setIdError('아이디를 입력해주세요.');
        } else {
            setIdError('');
        }

        // 비밀번호
        if (!pwNum) {
            setPwError('아이디를 입력해주세요.');
        } else {
            setPwError('');
        }

        // 로그인 처리
        if (!hasError) {
            // 여기에 로그인 처리 로직을 추가하세요


            console.log('Logged in successfully!');
        }
    }

    return (
        <div className="login-content3">
            {/* Title Wrap*/}
            <div className="titleWrap3">
                회원가입
            </div>
            <form onSubmit={handleJoinSubmit}>
                {/* contentWrap - 아이디 입력 */}
                <div className="contentWrap3">
                    <div className="inputTitle3">
                        아이디
                    </div>
                    <div className="inputWrap3">
                        <input className="write-input3" type='text' placeholder='아이디'
                            value={idInput}
                            onChange={(e) => setIdInput(e.target.value)}></input>
                    </div>
                </div>

                {/* errror 메세지 띄우기  */}
                <div className="errorMessageWrap3">
                    <div>{idError}</div>

                </div>

                {/* contentWrap - 비밀번호 입력 */}
                <div className="contentWrap3">
                    <div className="inputTitle3">
                        비밀번호
                    </div>
                    <div className="inputWrap3">
                        <input className="write-input3" type='password' placeholder='비밀번호'
                            value={pwNum}
                            onChange={(e) => setPwNum(e.target.value)}></input>
                    </div>
                </div>

                {/* errror 메세지 띄우기  */}
                <div className="errorMessageWrap3">
                    <div>{pwError}</div>

                </div>

                {/* contentWrap - 산업군을 선택해주세요. */}
                <div className="contentWrap3">
                    <div className="inputTitle3">
                        산업군을 선택해주세요.
                    </div>
                    <div className="inputWrap3">
                        <select className="joinSelect" placeholder='선택해주세요.'
                            value={businessCategory}
                            onChange={(e) => setBusinessCategory(e.target.value)}>
                            <option value="" disabled selected>선택해주세요.</option>
                            <option value="A">농업, 임업 및 어업(A)</option>
                            <option value="B">광업(B)</option>
                            <option value="D">전기, 가스, 증기, 및 공기 조절 공급업(D)</option>
                            <option value="F">건설업(F)</option>
                            <option value="C">제조업(C)</option>
                            <option value="G">도매 및 소매업(G)</option>
                            <option value="H">운수 및 창고업(H)</option>
                            <option value="J">정보통신업(J)</option>
                            <option value="K">금융 및 보험업(K)</option>
                            <option value="LN">부동산업, 사업시설 관리, 사업 지원 및 임대 서비스업(L,N)</option>
                            <option value="M">전문, 과학 및 기술 서비스업(M)</option>
                            <option value="E">수도, 하수 및 폐기물 처리, 원료 재생업(E)</option>
                            <option value="P">교육 서비스업(P)</option>
                            <option value="R">예술, 스포츠 및 여가관련 서비스업(R)</option>
                            <option value="I">숙박 및 음식점업(I)</option>
                            <option value="OU">공공 행정, 국방 및 사회보장 행정, 국제 및 외국기관(O,U)</option>
                            <option value="QST">기타(Q,S,T)</option>
                        </select>
                    </div>
                </div>

                {/* errror 메세지 띄우기  */}
                <div className="errorMessageWrap3">
                    <div>{errorMessageCategory}</div>
                </div>

                {/* contentWrap - 사업자 등록 번호 입력 */}
                <div className="contentWrap3">
                    <div className="inputTitle3">
                        사업자 등록 번호
                    </div>
                    <div className="inputWrap3">
                        <input className="write-input3" placeholder='번호만'
                            value={businessNum}
                            onChange={(e) => setBusinessNum(e.target.value)}></input>
                    </div>
                </div>

                {/* errror 메세지 띄우기  */}
                <div className="errorMessageWrap3" style={{marginBottom : '50px'}}>
                    <div>{errorMessage}</div>
                </div>

                {/* 로그인 버튼 */}
                <div className='bottomBtn2'>
                <button className='loginBtn2'
                    onClick={handleLogin}
                    style={{marginLeft : '20px', marginBottom : '100px'}}
                    >
                    Join
                </button>
            </div>
            </form>
        </div>

    )
}

export default CompanyJoin