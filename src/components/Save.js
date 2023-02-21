import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Save() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h2>저장되었습니다 :)</h2>
      <div className="btns">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          list
        </button>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
export default Save;
