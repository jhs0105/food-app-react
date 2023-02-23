import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pattern from "../assets/images/cupcake.jpg";

function FoodList({ map, title, search }) {
  const navigate = useNavigate();
  const [List, setList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${search}`
      )
      .then((response) => {
        setList(response.data);
      });
  }, []);

  const whole = () => {
    axios
      .get(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${search}`
      )
      .then((response) => {
        setList(response.data);
      });
  };

  const sub = (filter) => {
    axios
      .get(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/place/${search}/${filter}`
      )
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      });
  };

  const remove = (id) => {
    axios
      .delete(
        `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${search}/${id}`
      )
      .then((response) => {
        axios
          .get(
            `https://port-0-food-app-server-4uvg2mlegvqqv1.sel3.cloudtype.app/${search}`
          )
          .then((response) => {
            setList(response.data);
          });
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
        <h1>{title} 맛집 리스트 :)</h1>
        <div className="btn">
          <button
            onClick={() => {
              navigate(`/insert${search}`);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </header>
      <ul className="placeName">
        {map.map((item, idx) => {
          return (
            <li
              key={idx}
              onClick={(e) => {
                sub(e.target.innerText);
              }}
            >
              {item.district}
            </li>
          );
        })}
        <li
          onClick={() => {
            whole();
          }}
        >
          전체보기
        </li>
      </ul>

      <ul className="itemList">
        {List.slice(0)
          .reverse()
          .map((item, idx) => {
            return (
              <li className={`item ${item.place}`} key={idx}>
                <div className="imagebox">
                  <img src={item.foodImage} alt="" />
                </div>
                <div
                  className="contents"
                  onClick={() => {
                    navigate(`/detail/${search}/${item._id}`);
                  }}
                >
                  <h3>{item.name}</h3>
                  <div className="address">
                    {item.place} {item.address}
                  </div>
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
                      console.log(item._id);
                      remove(item._id);
                    }}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <div
        className="background"
        style={{ backgroundImage: `url(${pattern})` }}
      ></div>
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
  .background {
    position: absolute;
    opacity: 0.5;
    z-index: -1;
    width: 100%;
    top: 0;
    bottom: 0;
    background-size: 50%;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    h1 {
      padding: 0 30px;
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
  .placeName {
    cursor: pointer;
    font-family: "sub";
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 800px;
    li {
      padding: 3px 10px;
      background-color: rgba(255, 192, 203, 0.5);
      margin: 5px;
      border-radius: 6px;
    }
  }
  .itemList {
    width: 95%;
    box-sizing: border-box;
    padding: 0 0 20px 0;
    max-width: 900px;
    > li {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      margin: 10px 0;
      border-radius: 40px;
      border: 4px solid pink;
      background-color: rgba(255, 255, 255, 0.7);
      position: relative;
      .imagebox {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 25px 0 0 25px;
        }
      }
      .contents {
        width: calc(100% - 95px);
        font-family: "sub";
        h3 {
          margin: 5px 0;
          font-size: 24px;
        }
        .score {
          margin: 3px 0;
          i {
            font-size: 13px;
          }
        }
      }
      .removebtn {
        position: absolute;
        right: 20px;
        bottom: 10px;
        button {
          border: none;
          background-color: #ddd;
          width: 30px;
          height: 30px;
          border-radius: 100px;
          box-shadow: 2px 2px 3px #333;
        }
      }
    }
  }
`;
export default FoodList;
