import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

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
        <h2>새로운 맛집을 추가해주세요 :)</h2>
        <div className="btn">
          <button
            onClick={() => {
              navigate("/zone");
            }}
          >
            <i className="fa-solid fa-grip"></i>
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
        </div>
      </header>
      <div className="bodybox">
        <form>
          <div className="box namebox">
            <span>* 이름:</span>
            <input
              type="text"
              name="name"
              value={state.name}
              placeholder="* 가게 이름을 넣어주세요"
              style={{ borderColor: "#ffed90" }}
              onChange={handleStateChange}
              onKeyDown={(e) => {
                if (state.name !== "") {
                  e.target.style.borderColor = "#f6e6e7";
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
            <select
              name="score"
              value={state.score}
              onChange={handleStateChange}
            >
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
              onChange={async (e) => {
                let imagefile = e.target.files[0];
                const options = {
                  maxSizeMB: 1,
                  maxWidthOrHeight: 800,
                };
                try {
                  const compressedFile = await imageCompression(
                    imagefile,
                    options
                  );
                  setFile(compressedFile);
                } catch (err) {
                  console.log(err);
                }
                if (imagefile !== "") {
                  e.target.style.borderColor = "#f6e6e7";
                }
              }}
              style={{ borderColor: "#ffed90" }}
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
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .btn {
      button {
        border: none;
        width: 40px;
        height: 40px;
        background-color: #ffed90;
        border-radius: 100%;
        margin-left: 10px;
      }
    }
  }
  .bodybox {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    min-height: calc(100vh - 80px);
    background-color: #84cfcb;
    border-radius: 30px 0 0 0;
    padding: 30px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
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
      border: 2px solid #f6e6e7;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      font-family: "sub";
    }
    select {
      width: 100%;
      margin-bottom: 10px;
      padding: 5px;
      background-color: #fff;
      border-radius: 5px;
      border: 2px solid #f6e6e7;
      margin-left: -3px;
    }
    textarea {
      padding: 5px;
      border-radius: 5px;
      border: 2px solid #f6e6e7;
      font-family: "sub";
      font-size: inherit;
    }
    button {
      margin-top: 20px;
      background-color: #fad3d8;
      font-family: inherit;
      font-size: 25px;
      border: none;
      border-radius: 10px;
      padding: 5px 0;
    }
  }
  .listbtn {
    margin-top: 10px;
    width: 100%;
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
