import React, { useEffect } from "react";

// 2022-07-06 PG
// 載入 Google Map
const GoogleMap = ({ dataList }) => {
  // 初始化資訊
  const zoom = {
    zoom: 18,
    maxZoom: 20,
    minZoom: 10,
  };
  const center = { lat: 0, lng: 0 };

  // 初始化地圖
  const initMap = () => {
    const google = window.google;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: dataList.location.from.addr },
      function (results, status) {
        if (status == "OK") {
          center.lat = results[0].geometry.location.lat();
          center.lng = results[0].geometry.location.lng();

          // 設定地圖選項
          const mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: zoom.zoom,
            maxZoom: zoom.maxZoom,
            minZoom: zoom.minZoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };
          console.log(dataList.mapId);
          const map = new google.maps.Map(
            document.getElementById(dataList.mapId),
            mapOptions
          );

          // 設定地標
          const marker = new google.maps.Marker({
            position: center,
            map: map,
            animation: google.maps.Animation.DROP,
          });

          // 設定文字框
          const infowindow = new google.maps.InfoWindow({
            content: "<h5>" + dataList.location.from.name + "</h5>",
            maxWidth: 200,
          });

          // 預設直接開啟文字框
          infowindow.open(map, marker);
        } else {
          // 若轉換失敗...
          console.log(status);
        }
      }
    );
  };

  useEffect(() => {
    initMap();
  });

  return (
    <>
      <div className="mx-5  mb-5">
        <div
          id={dataList.mapId}
          style={{ width: "400px", height: "400px" }}
        ></div>
      </div>
    </>
  );
};

export default GoogleMap;
