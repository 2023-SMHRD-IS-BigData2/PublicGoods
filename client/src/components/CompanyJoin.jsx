import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BankLogin = () => {

    const [businessCategory, setBusinessCategory] = useState('');
    const [businessNum, setBusinessNum] = useState('');
    const [idInput, setIdInput] = useState('');
    const [pwNum, setPwNum] = useState('');

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
        if (!businessCategory.trim() || !businessNum.trim() || !idInput || !pwNum) {
            alert('올바르게 입력해주세요.');
        } else {

        }
        // 로그인 처리
        if (!hasError) {
            // 여기에 로그인 처리 로직을 추가하세요
            console.log('Logged in successfully!');
        }
    }

  return (
    <div className='loginPage'>

        <div className='joinBox'>
            {/* 로그인 설명 */}
            <div className='joinInfo'>
            <form onSubmit={handleJoinSubmit}>
            <div className='join'>
                <div className='inputBox'>
                    {/* 로그인 제목 */}
                    <h2 className='joinSub'>회원가입</h2>
                    {/* input */}
                    <div className='inputIdBox'>
                        {/* 아이디 */}
                        <input type="text" className='idInputJoin' placeholder='아이디'
                               value={idInput}
                               onChange={(e) => setIdInput(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className='inputPwBox'>
                        <input type="password" className='pwInputJoin' placeholder='비밀번호'
                               value={pwNum}
                               onChange={(e) => setPwNum(e.target.value)}
                        />
                    </div>

                    {/* 산업군 */}
                    <div className='inputCategoryBox'>
                    <select className="categorySel" value={businessCategory}
                            onChange={(e) => setBusinessCategory(e.target.value)}>
                            <option value="" disabled selected>산업군 선택</option>
                            <option value="11">농업, 임업 및 어업(A)</option>
                            <option value="21">광업(B)</option>
                            <option value="22">전기, 가스, 증기, 및 공기 조절 공급업(D)</option>
                            <option value="23">건설업(F)</option>
                            <option value="31">제조업(C)</option>
                            <option value="42">도매 및 소매업(G)</option>
                            <option value="48">운수 및 창고업(H)</option>
                            <option value="51">정보통신업(J)</option>
                            <option value="52">금융 및 보험업(K)</option>
                            <option value="53">부동산업, 사업시설 관리, 사업 지원 및 임대 서비스업(L,N)</option>
                            <option value="54">전문, 과학 및 기술 서비스업(M)</option>
                            <option value="56">수도, 하수 및 폐기물 처리, 원료 재생업(E)</option>
                            <option value="61">교육 서비스업(P)</option>
                            <option value="62">예술, 스포츠 및 여가관련 서비스업(R)</option>
                            <option value="72">숙박 및 음식점업(I)</option>
                            <option value="92">공공 행정, 국방 및 사회보장 행정, 국제 및 외국기관(O,U)</option>
                            <option value="81">기타(Q,S,T)</option>
                        </select>
                    </div>

                    {/* 사업자 등록 번호 */}
                    <div className='inputCompanyBox'>
                        <input type="text" className='nbInputJoin' placeholder='사업자 등록 번호'
                               value={businessNum}
                               onChange={(e) => setBusinessNum(e.target.value)}
                        />
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <div className='BtnBox'>
                    <button className='logBtn2' onClick={handleLogin}>회원가입</button>
                </div>
            </div>
            </form>
            </div>

            {/* 로그인 */}
            <div className='joinInfo'>
                <h3 className='LOC'>Company <br/> Join Our Community</h3>
            </div>
        </div>

    </div>
  )
}

export default BankLogin