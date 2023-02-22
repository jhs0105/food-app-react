import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/heart.png";

function InsertList({ map, search }) {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [txtcomment, setTxtComment] = useState("");

  const nameRef = useRef();
  const placeRef = useRef();
  const addressRef = useRef();
  const scoreRef = useRef();
  const mainFoodRef = useRef();

  const submitList = () => {
    const foodImage = file;
    const name = nameRef.current.value;
    const place = placeRef.current.value;
    const address = addressRef.current.value;
    const score = Number(scoreRef.current.value);
    const mainFood = mainFoodRef.current.value;
    const comment = txtcomment;
    console.log(comment);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        `http://localhost:4000/insert${search}`,
        { name, place, address, score, mainFood, foodImage, comment },
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Wrapper>
      <header>
        <div className="btn">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-house"></i>
          </button>
        </div>
        <h2>새로운 맛집을 추가해주세요 :)</h2>
        <div className="btn">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <i class="fa-solid fa-arrow-rotate-left"></i>
          </button>
        </div>
      </header>
      <form
        onSubmit={() => {
          if (nameRef.current.value === "" || file.length === 0) {
            return;
          } else {
            submitList();
          }
        }}
      >
        <div className="box namebox">
          <span>* 이름:</span>
          <input
            type="text"
            name="name"
            ref={nameRef}
            placeholder="* 가게 이름을 넣어주세요"
          />
        </div>
        <div className="box placebox">
          <span>&nbsp; 지역:</span>
          <select name="place" id="" ref={placeRef}>
            {map.map((item, idx) => {
              return (
                <option value={item.district} key={idx}>
                  {item.district}
                </option>
              );
            })}
          </select>
        </div>
        <div className="box">
          <span>&nbsp; 상세주소:</span>
          <input
            type="text"
            name="address"
            ref={addressRef}
            placeholder="상세주소를 넣어주세요"
          />
        </div>
        <div className="box">
          <span>&nbsp; 평가:</span>
          <select name="score" ref={scoreRef} id="">
            <option value="1">&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
        </div>
        <div className="box">
          <span>&nbsp; 주음식:</span>
          <input
            type="text"
            name="mainFood"
            ref={mainFoodRef}
            placeholder="메인음식은 어떤 것이 있나요?"
          />
        </div>
        <div className="box foodimagebox">
          <span>* 사진:</span>
          <input
            type="file"
            name="foodImage"
            onChange={(e) => {
              console.log(e);
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <textarea
          type="text"
          rows="5"
          placeholder="맛집에 대한 코멘트를 적어주세요 :)"
          onChange={(e) => {
            console.log(e.target.value);
            setTxtComment(e.target.value);
          }}
        ></textarea>
        <button type="submit">저장하기</button>
      </form>

      <button
        className="listbtn"
        onClick={() => {
          navigate(`/${search}`);
        }}
      >
        list로 돌아가기
      </button>

      <div
        className="background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .background {
    position: absolute;
    opacity: 0.7;
    top: 0;
    width: 100%;
    z-index: -1;
    bottom: 0;
  }
  header {
    display: flex;
    align-items: center;
    h2 {
      padding: 15px 20px;
      font-size: 25px;
    }
    .btn {
      button {
        border: none;
        width: 40px;
        height: 40px;
        background-color: purple;
        border-radius: 100%;
        i {
          color: #fff;
        }
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 10px;
    .box {
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 100px;
        font-size: 18px;
        margin-top: -8px;
      }
      input {
        width: 100%;
      }
    }
    .namebox {
      input {
        :focus {
          border-color: #f00;
        }
      }
    }
    .foodimagebox {
      input {
        background-color: #fff;
      }
    }
    input {
      border: 2px solid purple;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      font-family: "sub";
      background-color: rgba(255, 255, 255, 0.7);
    }
    select {
      width: 100%;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      border: 2px solid purple;
    }
    textarea {
      padding: 5px;
      border-radius: 5px;
      border: 2px solid purple;
      font-family: "sub";
      font-size: inherit;
    }
    button {
      margin-top: 10px;
      background-color: purple;
      color: #fff;
      font-family: inherit;
      font-size: 25px;
      border: none;
      border-radius: 10px;
    }
  }
  .listbtn {
    margin-top: 10px;
    width: 95%;
    border-radius: 10px;
    border: none;
    padding: 5px 0;
    background-color: pink;
    font-family: inherit;
    font-size: 20px;
  }
`;
export default InsertList;
