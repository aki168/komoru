import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import DashboardChartsNorth from "./DashboardChartsNorth";
import DashboardChartsSouth from "./DashboardChartsSouth";
import DashboardChartsMiddle from "./DashboardChartsMiddle";
import DashboardChartsEast from "./DashboardChartsEast";
import './Dashboard.css'
import northImage from '../../../assets/area/north.jpg'
import eastImage from '../../../assets/area/east.jpg'
import sorthImage from '../../../assets/area/sorth.jpg'
import middleImage from '../../../assets/area/middle.jpg'

function Dashboard() {

  const [dateData, setDateData] = useState({
    dateRange: "2022-06",
  });

  /*20220704 YN
  登入狀態為false自動轉跳Login頁面 */
  let navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/checkIsLogin",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === false) {
          navigate("/BackstageLogin", { replace: true });
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dateRangeChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newEditFormData = { ...dateData };
    newEditFormData[fieldName] = fieldValue;

    setDateData(newEditFormData);
    console.log(newEditFormData);
  }
  return (
    <>
      <div className="mx-5  mb-5">
        <div className="d-flex mt-3 mb-5 justify-content-between">
          <h2 >分區報表</h2>
          <select name="dateRange" onChange={dateRangeChangeHandle}>
            <option value="2022-06" selected>2022-06</option>
            <option value="2022-07">2022-07</option>
            <option value="2022-08">2022-08</option>
            <option value="2022-09">2022-09</option>
            <option value="2022-10">2022-10</option>
            <option value="2022-11">2022-11</option>
            <option value="2022-12">2022-12</option>
          </select>
        </div>

        <div className="row " style={{ height: "300px" }}>
          <NavLink className="col me-5 main-nav" to="north" >
            <div class="tabs-img">
              <img class="cover-fit" src={northImage} alt="" />
            </div>
          </NavLink>
          <NavLink className="col me-5 main-nav" to="middle">
            <div class="tabs-img">
              <img class="cover-fit" src={middleImage} alt="" />
            </div>
          </NavLink>
          <NavLink className="col me-5 main-nav" to="south">
            <div class="tabs-img">
              <img class="cover-fit" src={sorthImage} alt="" />
            </div>
          </NavLink>
          <NavLink className="col main-nav"to="east">
            <div class="tabs-img">
              <img class="cover-fit" src={eastImage} alt="" />
            </div>
          </NavLink>
        </div>
      </div>
      <Outlet />

      <Routes>
        <Route path="north" element={<DashboardChartsNorth dateData={dateData} />} />
        <Route path="middle" element={<DashboardChartsMiddle dateData={dateData} />} />
        <Route path="south" element={<DashboardChartsSouth dateData={dateData} />} />
        <Route path="east" element={<DashboardChartsEast dateData={dateData} />} />
        <Route path="/" element={<Navigate to="north" />}></Route>
      </Routes>
    </>
  );
}

export default Dashboard;
