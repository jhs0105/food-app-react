import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import background from "../assets/images/cupcake.jpg";
import { allplace } from "../assets/data/allplace";

function Detail({ seoul, ilsan }) {
  const [isCommentEdit, setIsCommentEdit] = useState(false);

  const locationRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { place } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${place}/${id}`
      )
      .then((response) => {
        setDetail(...response.data);
      });
  }, []);

  const handleStateChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const updateComment = () => {
    axios
      .put(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${place}/${id}`,
        detail
      )
      .then((response) => {
        axios
          .get(
            `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${place}/${id}`
          )
          .then((response) => {
            setDetail(...response.data);
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
      <div>
        <header>
          <h1>{detail.name}</h1>
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
        <div className="detailBox">
          <div className="imgBox">
            <img src={detail.foodImage} alt="" />
          </div>
          <div className="detail">
            <div className="contents">
              {isCommentEdit ? (
                <div className="box">
                  <span>지역:</span>
                  <select
                    name="place"
                    value={detail.place}
                    onChange={handleStateChange}
                  >
                    {allplace[place].map((item, idx) => {
                      return (
                        <option value={item.district} key={idx}>
                          {item.district}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : (
                <div className="box">
                  <span>지역:</span>
                  <p>{detail.place}</p>
                </div>
              )}
              {isCommentEdit ? (
                <button
                  onClick={() => {
                    updateComment();
                    setIsCommentEdit(!isCommentEdit);
                  }}
                  style={{ backgroundColor: "#ffed90" }}
                >
                  <i className="fa-solid fa-floppy-disk"></i>
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
            <div className="contents">
              {isCommentEdit ? (
                <div className="box">
                  <span>주소:</span>
                  <input
                    type="text"
                    name="address"
                    value={detail.address}
                    onChange={handleStateChange}
                    placeholder="상세주소를 넣어주세요"
                  />
                </div>
              ) : (
                <div className="box">
                  <span>주소: </span>
                  <p>{detail.address}</p>
                </div>
              )}
            </div>
            <div className="contents">
              {isCommentEdit ? (
                <div className="box">
                  <span>&nbsp; 평가:</span>
                  <select
                    name="score"
                    id=""
                    value={detail.score}
                    onChange={handleStateChange}
                  >
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
                    {Array(detail.score)
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
              {isCommentEdit ? (
                <div className="box">
                  <span>종류:</span>
                  <input
                    type="text"
                    name="mainFood"
                    placeholder="메인음식은 어떤 것이 있나요?"
                    onChange={handleStateChange}
                    value={detail.mainFood}
                  />
                </div>
              ) : (
                <div className="box">
                  <span>종류: </span>
                  <p>{detail.mainFood}</p>
                </div>
              )}
            </div>
            <div className="contents">
              {isCommentEdit ? (
                <div className="box">
                  <span>comment:</span>
                  <textarea
                    name="comment"
                    type="text"
                    rows="5"
                    placeholder="맛집에 대한 코멘트를 적어주세요 :)"
                    onChange={handleStateChange}
                  >
                    {detail.comment}
                  </textarea>
                </div>
              ) : (
                <div className="box commentbox">
                  <span>comment:</span>
                  <p>{detail.comment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background-size: 50%;
    opacity: 0.7;
  }
  header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .detailBox {
    background-color: #84cfcb;
    border-radius: 30px 0 0 0;
    padding: 30px 0 20px;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 80px);
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgBox {
      width: 95%;
      max-width: 900px;
      max-height: 450px;
      border: 4px solid #f6e6e7;
      border-bottom: none;
      border-radius: 30px 30px 0 0;
      box-sizing: border-box;
      overflow: hidden;
      img {
        width: 100%;
        vertical-align: bottom;
        aspect-ratio: 1.3;
        object-fit: cover;
      }
    }
    .detail {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 0 0 30px 30px;
      border: 4px solid #ffed90;
      border-top: none;
      width: 95%;
      max-width: 900px;
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
          background-color: #f6e6e7;
          border-radius: 5px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
      }
      .commentbox {
        text-align: left;
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
          background-color: #f2f7fb;
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

  input {
    border: 2px solid #ffed90;
    padding: 5px;
    border-radius: 5px;
    font-family: "sub";
    background-color: rgba(255, 255, 255, 0.7);
  }
  select {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid #ffed90;
  }
  textarea {
    padding: 5px;
    border-radius: 5px;
    border: 2px solid #ffed90;
    font-family: "sub";
    font-size: inherit;
    width: 100%;
  }
`;
export default Detail;
