import React from "react";
import styled from "styled-components";
import background from "../assets/images/mainBackground.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Wrapper>
      <div className="title">
        <h1>나만의 맛집 리스트!</h1>
        <ul className="btns">
          <li>
            <Link to="/seoul">서울</Link>
          </li>
          <li>
            <Link to="/ilsan">일산</Link>
          </li>
        </ul>
      </div>
      <div className="imgbox">
        <img src={background} alt="" />
      </div>
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
  background: pink;
  .imgbox {
    position: absolute;
    z-index: 0;
    border: 1px solid #ccc;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      max-width: 800px;
      max-height: 800px;
      left: 0;
      top: 0;
      opacity: 0.5;
      object-fit: contain;
    }
  }
  .title {
    display: flex;
    position: absolute;
    z-index: 2;
    flex-direction: column;
    align-items: center;
    .btns {
      display: flex;
      li {
        a {
          display: block;
          margin: 0 10px;
          border: 1px solid #ccc;
          background: #ddd;
          padding: 5px 15px;
          border-radius: 5px;
        }
      }
    }
  }
`;
export default Home;
