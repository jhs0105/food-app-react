import React, { useEffect } from "react";
import styled from "styled-components";
const { Kakao } = window;

function KakaoButton({ data }) {
  const kakaoShareKey = process.env.REACT_APP_KAKAO_SHARE_KEY;
  const url = "https://jj-food-app.netlify.app/";
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(kakaoShareKey);
    }
  }, []);
  function shareMessage() {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "맛집 리스트 보러가기!",
        description: "#서울 #일산 #제주도 #맛집 #사진 #분위기",
        imageUrl: url + data,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: "맛집 탐방을 하고 싶다면...",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
  return <Button onClick={shareMessage}>카카오톡 공유하기</Button>;
}

const Button = styled.button`
  bottom: 100px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f6e6e7;
  margin-top: 20px;
  padding: 10px 20px 7px 20px;
  border-radius: 50px;
  border: none;
  font-family: "sub";
  position: absolute;
  z-index: 2;
  bottom: 50px;
  width: 80%;
`;
export default KakaoButton;
