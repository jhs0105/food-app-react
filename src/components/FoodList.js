import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function FoodList({ map, title, search }) {
  const navigate = useNavigate();
  const [List, setList] = useState([]);
  const ellipsis = (str, total) => {
    return str.length > total ? str.substr(0, total - 1) + "..." : str;
  };

  useEffect(() => {
    axios
      .get(
        `https://port-0-food-app-server-20zynm2mljpmbmav.sel4.cloudtype.app/${search}`
      )
      .then((response) => {
        setList(response.data);
      });
  }, []);

  const whole = () => {
    axios
      .get(
        `https://port-0-food-app-server-20zynm2mljpmbmav.sel4.cloudtype.app/${search}`
      )
      .then((response) => {
        setList(response.data);
      });
  };

  const sub = (filter) => {
    axios
      .get(
        `https://port-0-food-app-server-20zynm2mljpmbmav.sel4.cloudtype.app/place/${search}/${filter}`
      )
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      });
  };

  const remove = (id) => {
    axios
      .delete(
        `https://port-0-food-app-server-20zynm2mljpmbmav.sel4.cloudtype.app/${search}/${id}`
      )
      .then((response) => {
        axios
          .get(
            `https://port-0-food-app-server-20zynm2mljpmbmav.sel4.cloudtype.app/${search}`
          )
          .then((response) => {
            setList(response.data);
          });
      });
  };
  return (
    <Wrapper>
      <header>
        <h2>{title} 맛집 리스트 :)</h2>
        <div className="btn">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-house"></i>
          </button>
          <button
            onClick={() => {
              navigate("/zone");
            }}
          >
            <i className="fa-solid fa-grip"></i>
          </button>
          <button
            onClick={() => {
              navigate(`/insert${search}`);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </header>
      <div className="bodypart">
        <div className="slidebox">
          <div
            className="all"
            onClick={() => {
              whole();
            }}
          >
            전체보기
          </div>
          <Swiper
            className="placeName"
            slidesPerView={"auto"}
            slidesPerGroup={1}
            loop={true}
            modules={[Navigation]}
            navigation={{ nextEl: ".next" }}
          >
            {map.map((item, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  onClick={(e) => {
                    sub(e.target.innerText);
                  }}
                >
                  {item.district}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className="next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <ul className="itemList">
          {List.slice(0)
            .reverse()
            .map((item, idx) => {
              return (
                <li className={`item ${item.place}`} key={idx}>
                  <div
                    className="imagebox"
                    onClick={() => navigate(`/detail/${search}/${item._id}`)}
                  >
                    <img src={item.foodImage} alt="" />
                  </div>
                  <div
                    className="contents"
                    onClick={() => {
                      navigate(`/detail/${search}/${item._id}`);
                    }}
                  >
                    <h3>{ellipsis(item.name, 7)}</h3>
                    <div className="score">
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
                  </div>
                  <div className="removebtn">
                    <button
                      onClick={(e) => {
                        if (window.confirm("삭제하시겠습니까?")) {
                          remove(item._id);
                        }
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 100vh;
  max-width: 1000px;
  margin: auto;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    height: 80px;
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
  .bodypart {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #84cfcb;
    padding: 30px 0;
    border-radius: 30px 0 0 0;
  }
  .slidebox {
    font-family: "sub";
    width: 92%;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0 10px;
    .all {
      width: 70px;
      font-size: 20px;
      font-family: "main";
      margin-top: -4px;
    }
    .next {
      border: none;
      background: none;
      width: 20px;
      text-align: right;
    }
    .placeName {
      font-family: "sub";
      width: calc(100% - 90px);
      box-sizing: border-box;
      font-size: 15px;
      display: flex;
      justify-content: center;
      .swiper-slide {
        width: 58px;
        display: flex;
        justify-content: center;
      }
    }
  }

  .itemList {
    width: 95%;
    box-sizing: border-box;
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    > li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      width: calc(33.333% - 10px);
      box-sizing: border-box;
      margin: 10px 5px 4px;
      background-color: rgba(255, 255, 255, 0.7);
      position: relative;
      border-radius: 20px;
      border: 1.6px solid #f6e6e7;
      .imagebox {
        vertical-align: bottom;
        border-radius: 20px 20px 0 0;
        overflow: hidden;
        img {
          width: 100%;
          aspect-ratio: 1.2;
          object-fit: cover;
        }
      }
      .contents {
        padding: 5px 5px 5px;
        font-family: "sub";
        h3 {
          margin: 0;
          font-size: 15px;
        }
        .score {
          margin-top: -2px;
          margin-bottom: 3px;
          i {
            font-size: 10px;
          }
        }
      }
      .removebtn {
        position: absolute;
        right: 5px;
        bottom: 5px;
        button {
          border: none;
          background-color: #fff;
          width: 25px;
          height: 25px;
          border-radius: 100px;
        }
      }
    }
  }
`;
export default FoodList;
