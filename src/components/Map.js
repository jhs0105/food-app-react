import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const { kakao } = window;

function Map() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { place } = useParams();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const value = process.env.REACT_APP_NAME;
  const kakaoKey = process.env.REACT_APP_KAKAO_KEY;

  useEffect(() => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${name}`,
        {
          headers: {
            Authorization: kakaoKey,
          },
        }
      )
      .then((res) => {
        setAddress(res.data.documents[0].road_address_name);
        setPhone(res.data.documents[0].phone);
      });

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 5px;">${name}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }, [address]);

  return (
    <Wrapper>
      <header>
        <h2>{name} 위치</h2>
        <div className="btn">
          <button
            onClick={() => {
              navigate(`/${place}`);
            }}
          >
            <i className="fa-solid fa-list"></i>
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
      <div className="mapbox">
        <div id="map"></div>
        <div className="address">
          <p>
            <span>주소:</span> {address}
          </p>
          {phone && (
            <p>
              <span>전화:</span> {phone}
            </p>
          )}
          {phone && (
            <button
              onClick={() => {
                document.location.href = `tel:${phone}`;
              }}
            >
              <i className="fa-solid fa-phone"></i>
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
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
  .mapbox {
    width: 100%;
    height: calc(100% - 80px);
    margin: 0 auto;
    background-color: #84cfcb;
    padding: 30px 0px;
    border-radius: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    #map {
      width: 95%;
      max-width: 800px;
      aspect-ratio: 0.9;
      border-radius: 30px 30px 0 0;
      border: 4px solid #f6e6e7;
      border-bottom: none;
      box-sizing: border-box;
    }
    .address {
      width: 95%;
      font-size: 20px;
      background-color: #fff;
      border: 4px solid #ffed90;
      border-top: none;
      padding: 20px 10px 15px;
      box-sizing: border-box;
      max-width: 800px;
      position: relative;
      p {
        display: flex;
        font-family: "sub";
        font-size: 17px;
        align-items: center;
        line-height: 1.3;
      }
      span {
        width: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bolder;
      }
      button {
        border: none;
        position: absolute;
        right: 10px;
        bottom: 20px;
        width: 35px;
        height: 35px;
        border-radius: 5px;
        background-color: #f6e6e7;
      }
    }
  }
`;
export default Map;
