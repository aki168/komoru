import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";
import DashboardChartsNorth from "./DashboardChartsNorth";
import DashboardChartsSouth from "./DashboardChartsSouth";
import DashboardChartsMiddle from "./DashboardChartsMiddle";
import DashboardChartsEast from "./DashboardChartsEast";
import "./Dashboard.css";
import northImage from "../../../assets/area/north-gray.jpg";
import eastImage from "../../../assets/area/east-gray.jpg";
import sorthImage from "../../../assets/area/sorth-gray.jpg";
import middleImage from "../../../assets/area/middle-gray.jpg";
// import northImageOr from "../../../assets/area/north-or.jpg";

function Dashboard() {
  /*20220709 YN
  資料選取月份狀態初始化 */
  const [dateData, setDateData] = useState({
    dateRange: "2022-06",
  });

  /*20220709 YN
  區域標題狀態初始化 */
  const [titleArea, setTitleArea] = useState("北區");

  const [imgChange, setImgChange] = useState("");
  // setTitleArea('北區');

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
  };

  return (
    <>
      <div className="mx-5" style={{ marginBottom: "50px" }}>
        <div className="ms-5 me-5 d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-5 km-page-title">分區報表 &gt; {titleArea}</h3>
          <select
            class="form-select mt-5 mb-5"
            style={{ width: "200px" }}
            aria-label="Default select example"
            name="dateRange"
            onChange={dateRangeChangeHandle}
          >
            <option value="2022-06" selected>
              2022-06
            </option>
            <option value="2022-07">2022-07</option>
            <option value="2022-08">2022-08</option>
            <option value="2022-09">2022-09</option>
            <option value="2022-10">2022-10</option>
            <option value="2022-11">2022-11</option>
            <option value="2022-12">2022-12</option>
          </select>
        </div>
        <div className="ms-5 me-5">
          <div className="row g-0" style={{ height: "300px" }}>
            <NavLink
              className="col me-5 km-img-north km-dashboard-img-north km-dashboard-text km-dashboard-hover"
              to="north"
            >
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <h2>北區</h2>
                {/* <img class="cover-fit " src={northImage} alt="" /> */}
              </div>
            </NavLink>
            <NavLink
              className="col me-5 km-img-middle km-dashboard-img-middle km-dashboard-text km-dashboard-hover"
              to="middle"
            >
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <h2>中區</h2>
                {/* <img class="cover-fit" src={middleImage} alt="" /> */}
              </div>
            </NavLink>
            <NavLink
              className="col me-5 km-img-sorth km-dashboard-img-sorth km-dashboard-text km-dashboard-hover"
              to="south"
            >
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <h2>南區</h2>
                {/* <img class="cover-fit" src={sorthImage} alt="" /> */}
              </div>
            </NavLink>
            <NavLink
              className="col km-img-east km-dashboard-img-east km-dashboard-text km-dashboard-hover"
              to="east"
            >
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <h2>東區</h2>
                {/* <img class="cover-fit" src={eastImage} alt="" /> */}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />

      <Routes>
        <Route
          path="north"
          element={
            <DashboardChartsNorth
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="middle"
          element={
            <DashboardChartsMiddle
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="south"
          element={
            <DashboardChartsSouth
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="east"
          element={
            <DashboardChartsEast
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route path="/" element={<Navigate to="north" />}></Route>
      </Routes>
    </>
  );
}

export default Dashboard;
