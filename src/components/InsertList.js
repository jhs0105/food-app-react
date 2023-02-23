import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/heart.png";

function InsertList({ map, search }) {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [file, setFile] = useState();
  const [state, setState] = useState({
    name: "",
    place: map[0].district,
    address: "",
    score: 3,
    mainFood: "",
    comment: "",
  });
  console.log(state.place);
  const handleStateChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitList = (e) => {
    e.preventDefault();
    const name = state.name;
    const place = state.place;
    const address = state.address;
    const score = state.score;
    const mainFood = state.mainFood;
    const foodImage = file;
    const comment = state.comment;
    if (state.name === "") {
      return;
    } else if (file === undefined) {
      return;
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/insert${search}`,
        { name, place, address, score, mainFood, foodImage, comment },
        config
      )
      .then((response) => {
        console.log(response);
        setIsUpdate(!isUpdate);
      })
      .catch((err) => {
        console.log(err);
      });

    setState({
      name: "",
      place: "",
      address: "",
      score: "",
      mainFood: "",
      comment: "",
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
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
        </div>
      </header>
      <form>
        <div className="box namebox">
          <span>* 이름:</span>
          <input
            type="text"
            name="name"
            value={state.name}
            placeholder="* 가게 이름을 넣어주세요"
            style={{ borderColor: "red" }}
            onChange={handleStateChange}
            onKeyDown={(e) => {
              if (state.name !== "") {
                e.target.style.borderColor = "purple";
              }
            }}
          />
        </div>
        <div className="box placebox">
          <span>&nbsp; 지역:</span>
          <select
            name="place"
            id=""
            value={state.place}
            onChange={handleStateChange}
          >
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
            value={state.address}
            placeholder="상세주소를 넣어주세요"
            onChange={handleStateChange}
          />
        </div>
        <div className="box">
          <span>&nbsp; 평가:</span>
          <select name="score" value={state.score} onChange={handleStateChange}>
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
            value={state.mainFood}
            placeholder="메인음식은 어떤 것이 있나요?"
            onChange={handleStateChange}
          />
        </div>
        <div className="box foodimagebox">
          <span>* 사진:</span>
          <input
            type="file"
            value={state.foodImage}
            name="foodImage"
            onChange={(e) => {
              setFile(e.target.files[0]);
              if (e.target.files[0] !== "") {
                e.target.style.borderColor = "purple";
              }
            }}
            style={{ borderColor: "red" }}
          />
        </div>
        <textarea
          type="text"
          rows="5"
          name="comment"
          placeholder="맛집에 대한 코멘트를 적어주세요 :)"
          value={state.comment}
          onChange={handleStateChange}
        ></textarea>
        <button type="submit" onClick={submitList}>
          저장하기
        </button>
      </form>
      {isUpdate ? (
        <button
          className="listbtn"
          onClick={() => {
            navigate(`/${search}`);
          }}
        >
          list로 돌아가기
        </button>
      ) : (
        <></>
      )}

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
    opacity: 0.6;
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
    margin-bottom: 20px;
    max-width: 900px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px 10px;
    box-sizing: border-box;
    border-radius: 20px;
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
      padding: 5px 0;
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
    font-size: 25px;
    color: #333;
  }
`;
export default InsertList;
