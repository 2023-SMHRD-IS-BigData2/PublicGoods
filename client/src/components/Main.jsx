import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Main() {

  useEffect(() => {

    // 드래그 앤 드롭 이벤트를 감지하여 기본 이벤트를 막습니다.
    function disableDragDrop(event) {
      event.preventDefault();
    }

    document.addEventListener('dragstart', disableDragDrop);

    return () => {
      document.removeEventListener('dragstart', disableDragDrop);
    };
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="naver-site-verification" content="b965767bf1a7ce4dd6d4fec710a0a98fbeb59f8f" />
        <meta property="og:url" content="https://www.mkfount.com" />
        <meta property="og:type" content="website" />
        <meta itemProp="image" content="https://mkfount.com/wp-content/uploads/2019/09/People-01.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>moolLoan - moolLoan에서 물론!!</title>
        <link href="/theme/index.css" rel="stylesheet" />
      </head>
      <body>
        <div id="__next">
          <main>
            <div className="MainBridge__Container-sc-n1u3j9-0 gBKXdf">
            <div class="MainBridge__LogoContainer-sc-n1u3j9-1 iACsdF">
              <img src="/images/Header/moolLoan-white.png" class="MainBridge__LogoWhite-sc-n1u3j9-2 gKyXii"/>
            </div>
              <div className="MainBridge__CardContainer-sc-n1u3j9-3 beAwiM">
                <div className="MainBridge__CardBackground-sc-n1u3j9-4 ehOJLu"></div>
                <div className="MainBridge__CardContents-sc-n1u3j9-5 bOLJRX">
                <img src="/images/Screen/study.png" class="MainBridge__Logo-sc-n1u3j9-6 gJQfGR"/>
                  <div className="MainBridge__CardTexts-sc-n1u3j9-8 cFiOuu">
                    <div className="MainBridge__CardTitle-sc-n1u3j9-9 kDmHXN">은행(심사자)</div>
                    <div className="MainBridge__CardDesc-sc-n1u3j9-10 eKUBRw">
                      기업의 재무제표 확인, 기업의 평가 결과 확인
                      <br />
                      등 기업 파악에 도움을 받고싶은 심사자
                    </div>
                    <Link to='/bank' className='moolLoan-btn'>
                      <div className="MainBridge__LinkButton-sc-n1u3j9-11 fwxUKG">moolLoan 바로가기</div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="MainBridge__CardContainer-sc-n1u3j9-3 beAwiM">
                <div className="MainBridge__CardBackground-sc-n1u3j9-4 ehOJLu"></div>
                <div className="MainBridge__CardContents-sc-n1u3j9-5 bOLJRX">
                  <img src="/images/Screen/office-building.png" className="MainBridge__Logo-sc-n1u3j9-6 gJQfGR" />
                  <div className="MainBridge__CardTexts-sc-n1u3j9-8 cFiOuu">
                    <div className="MainBridge__CardTitle-sc-n1u3j9-9 kDmHXN">법인(사업자)</div>
                    <div className="MainBridge__CardDesc-sc-n1u3j9-10 eKUBRw">
                      본인의 대출한도를 향상시키고, 동종업계와의
                      <br />
                      비교를 통한 피드백을 받고싶은 피심사자
                    </div>
                    <Link to='/company' className='moolLoan-btn'>
                      <div className="MainBridge__LinkButton-sc-n1u3j9-11 fwxUKG">moolLoan 바로가기</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
      <script nomodule="" src="/_next/runtime/polyfills-281830cb6171861fb126.js"></script>
      <script async="" data-next-page="/_app" src="/_next/pvboXFuisrh7NCnfpZjA4/pages/_app.js"></script>
      <script async="" data-next-page="/" src="/_next/pvboXFuisrh7NCnfpZjA4/pages/index.js"></script>
      <script src="/_next/runtime/webpack-1c5199ff66550d26e499.js" async=""></script>
      <script src="/_next/chunks/framework.619a4f70c1d4d3a29cbc.js" async=""></script>
      <script src="/_next/chunks/29107295.18b295048fde8089a36c.js" async=""></script>
      <script src="/_next/chunks/9f96d65d.e5aa6bd1391ee14f41fc.js" async=""></script>
      <script src="/_next/chunks/commons.dd314a5a804c0f5283ad.js" async=""></script>
      <script src="/_next/chunks/a6c3fda0776a887d4e5ca761a0c9f4ff8611c234.d217c352d3679a232b5f.js" async=""></script>
      <script src="/_next/runtime/main-0af3fcf9b83a4325b535.js" async=""></script>
      <script src="/_next/chunks/ddc9e94f.0a364d7df56f593d886d.js" async=""></script>
      <script src="/_next/chunks/801a6084.16499b9d4360cd0e099d.js" async=""></script>
      <script src="/_next/chunks/75fc9c18.4e5454352a842e51ad38.js" async=""></script>
      <script src="/_next/chunks/ae56f2ff360e334418efd250c48c1dcf779fc010.38f13c147072fc10cf3f.js" async=""></script>
      <script src="/_next/pvboXFuisrh7NCnfpZjA4/_buildManifest.js" async=""></script>
      <script src="/_next/pvboXFuisrh7NCnfpZjA4/_ssgManifest.js" async=""></script>
    </body>
  </html>
);
}

export default Main;

