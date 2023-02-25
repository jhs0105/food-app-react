import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Zone() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <header>
        <h2>지역을 선택해주세요</h2>
      </header>
      <div className="zonebox">
        <ul className="zone">
          <li
            onClick={() => {
              navigate("/seoul");
            }}
          >
            <i className="fa-solid fa-utensils"></i>
            서울
          </li>
          <li
            onClick={() => {
              navigate("/ilsan");
            }}
          >
            <i className="fa-solid fa-utensils"></i>
            일산
          </li>
          <li
            onClick={() => {
              navigate("/jeju");
            }}
          >
            <i className="fa-solid fa-utensils"></i>
            제주도
          </li>
          <li>
            <i className="fa-solid fa-utensils"></i>
            파주(준비중)
          </li>
          <li>
            <i className="fa-solid fa-utensils"></i>
            부산(준비중)
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  header {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    margin: auto;
  }
  .zonebox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100% - 50px);
    background-color: #84cfcb;
    border-radius: 30px 0 0 0;
    padding: 30px 0px;
    .zone {
      width: 95%;
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-basis: calc(33.33% - 15px);
        max-width: 300px;
        background-color: #f6e6e7;
        aspect-ratio: 1;
        box-sizing: border-box;
        margin: 15px 7.5px;
        position: relative;
        border-radius: 10px;
        font-size: 20px;
        i {
          color: #fff;
          font-size: 32px;
          margin: 5px;
        }
        &:before {
          content: "";
          border: 1px solid #f2f7fb;
          width: 85%;
          height: 85%;
          position: absolute;
          border-radius: 10px;
          pointer-events: none;
        }
      }
    }
  }
`;

export default Zone;
