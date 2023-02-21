import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import background from "../assets/images/cupcake.jpg";
import { allplace } from "../assets/data/allplace";

function Detail({ seoul, ilsan }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const locationRef = useRef();
  const addressRef = useRef();
  const mainFoodRef = useRef();
  const scoreRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { place } = useParams();
  const [detail, setDetail] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    axios.get(`http://localhost:4000/${place}/${id}`).then((response) => {
      setDetail(response.data);
    });
  }, []);

  const updateComment = (text) => {
    axios
      .put(`http://localhost:4000/${place}/${id}`, { comment: text })
      .then((response) => {
        axios.get(`http://localhost:4000/${place}/${id}`).then((response) => {
          setDetail(response.data);
        });
      });
  };

  const location = () => {
    if (String(place) === "seoul") {
      return (
        <select name="place" id="" ref={locationRef}>
          {allplace.seoul.map((item, idx) => {
            return (
              <option value={item.district} key={idx}>
                {item.district}
              </option>
            );
          })}
        </select>
      );
    } else if (String(place) === "ilsan") {
      return (
        <select name="place" id="" ref={locationRef}>
          {allplace.ilsan.map((item, idx) => {
            return (
              <option value={item.district} key={idx}>
                {item.district}
              </option>
            );
          })}
        </select>
      );
    }
  };
  return (
    <Wrapper>
      {detail.map((item, idx) => {
        return (
          <div key={idx}>
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
              <h1>{item.name}</h1>
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
            <div className="detailBox">
              <div className="imgBox">
                <img src={item.foodImage} alt="" />
              </div>
              <div className="detail">
                <div className="contents">
                  {isEdit ? (
                    <div className="box">
                      <span>지역: </span>
                      {location()}
                    </div>
                  ) : (
                    <div className="box">
                      <span>지역:</span>
                      <p>{item.place}</p>
                    </div>
                  )}
                </div>
                <div className="contents">
                  {isEdit ? (
                    <div className="box">
                      <span>주소:</span>
                      <input
                        type="text"
                        name="address"
                        ref={addressRef}
                        placeholder="상세주소를 넣어주세요"
                      />
                    </div>
                  ) : (
                    <div className="box">
                      <span>주소: </span>
                      <p>{item.address}</p>
                    </div>
                  )}
                </div>
                <div className="contents">
                  {isEdit ? (
                    <div className="box">
                      <span>&nbsp; 평가:</span>
                      <select name="score" ref={scoreRef} id="">
                        <option value="1">&#9733;</option>
                        <option value="2">&#9733;&#9733;</option>
                        <option value="3">&#9733;&#9733;&#9733;</option>
                        <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                        <option value="5">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </option>
                      </select>
                    </div>
                  ) : (
                    <div className="box">
                      <span>평점:</span>
                      <p>
                        {Array(item.score)
                          .fill()
                          .map((item, idx) => {
                            return (
                              <span key={idx}>
                                <i className="fa-solid fa-star"></i>
                              </span>
                            );
                          })}
                      </p>
                    </div>
                  )}
                </div>
                <div className="contents">
                  {isEdit ? (
                    <div className="box">
                      <span>종류:</span>
                      <input
                        type="text"
                        name="mainFood"
                        ref={mainFoodRef}
                        placeholder="메인음식은 어떤 것이 있나요?"
                      />
                    </div>
                  ) : (
                    <div className="box">
                      <span>종류: </span>
                      <p>{item.mainFood}</p>
                    </div>
                  )}
                </div>
                <div className="contents">
                  {isCommentEdit ? (
                    <div className="box">
                      <span>comment:</span>
                      <textarea
                        type="text"
                        rows="5"
                        placeholder="맛집에 대한 코멘트를 적어주세요 :)"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      >
                        {item.comment}
                      </textarea>
                    </div>
                  ) : (
                    <div className="box">
                      <span>comment:</span>
                      <p>{item.comment}</p>
                    </div>
                  )}
                  {isCommentEdit ? (
                    <button
                      onClick={() => {
                        updateComment(comment);
                        setIsCommentEdit(!isCommentEdit);
                      }}
                    >
                      <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsCommentEdit(!isCommentEdit);
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  header {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    align-items: center;
    h1 {
      padding: 10px 20px;
    }
    .btn {
      button {
        border: none;
        width: 40px;
        height: 40px;
        background-color: pink;
        border-radius: 100%;
      }
    }
  }
  .detailBox {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgBox {
      width: 95%;
      img {
        width: 100%;
        aspect-ratio: 1.3;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .detail {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 10px;
      border: 3px solid pink;
      width: 95%;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .contents {
        display: flex;
        align-items: end;
        margin-bottom: 5px;
        button {
          width: 32px;
          height: 30px;
          background-color: pink;
          border-radius: 5px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
      }
      .box {
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        p {
          font-family: "sub";
          display: flex;
          width: 100%;
          background-color: #eee;
          border-radius: 5px;
          padding: 5px;
          line-height: 1.25;
          span {
            width: 20px;
          }
          i {
            font-size: 12px;
          }
        }
        span {
          display: block;
          width: 100px;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background-size: 50%;
    opacity: 0.7;
  }
  input {
    border: 2px solid purple;
    padding: 5px;
    border-radius: 5px;
    font-family: "sub";
    background-color: rgba(255, 255, 255, 0.7);
  }
  select {
    width: 100%;
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
    width: 100%;
  }
`;
export default Detail;
