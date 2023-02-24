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
              navigate("/ilsan");
            }}
          >
            <i className="fa-solid fa-utensils"></i>
            제주도
          </li>
          <li
            onClick={() => {
              navigate("/paju");
            }}
          >
            <i className="fa-solid fa-utensils"></i>
            파주
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  header {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    margin: auto;
  }
  .zonebox {
    height: calc(100% - 50px);
    background-color: #84cfcb;
    border-radius: 30px 0 0 0;
    padding: 30px 20px;
    margin: auto;
    .zone {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        flex-basis: calc(33% - 15px);
        max-width: 300px;
        background-color: #f6e6e7;
        aspect-ratio: 1;
        box-sizing: border-box;
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
          width: 80%;
          height: 80%;
          position: absolute;
          border-radius: 10px;
          pointer-events: none;
        }
      }
    }
  }
`;

export default Zone;
