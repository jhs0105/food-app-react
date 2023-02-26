import React from "react";
import styled from "styled-components";
import background from "../assets/images/mainBackground.jpg";
import thumbnail from "../assets/images/thumbnail.jpg";
import { Link } from "react-router-dom";
import KakaoButton from "./KakaoButton";

function Home() {
  return (
    <Wrapper>
      <div className="title">
        <Link to="/zone" className="zone">
          <h1>나만의 맛집 리스트!</h1>
          <p>구경하러 하기!</p>
        </Link>
      </div>
      <Link to="/zone" className="imgbox">
        <img src={background} alt="" />
      </Link>
      <KakaoButton data={background}></KakaoButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  background: #84cfcb;

  .imgbox {
    position: absolute;
    z-index: 0;
    border: 1px solid #ccc;
    border-radius: 100%;
    overflow: hidden;
    background-color: #f6e6e7;
    margin: 20px;
    img {
      width: 100%;
      max-width: 600px;
      max-height: 600px;
      opacity: 0.5;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
  .title {
    background-color: rgba(242, 247, 251, 0.5);
    width: 85%;
    max-width: 550px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    position: absolute;
    z-index: 2;
    flex-direction: column;
    align-items: center;
    border-radius: 100%;
    font-size: 18px;
    pointer-events: none;
    .zone {
      text-align: center;
      p {
        font-size: 20px;
      }
    }
  }
`;
export default Home;
