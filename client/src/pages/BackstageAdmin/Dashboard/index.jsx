import React from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import DashboardChartsNorth from "./DashboardChartsNorth";
import DashboardChartsSouth from "./DashboardChartsSouth";
import DashboardChartsMiddle from "./DashboardChartsMiddle";
import DashboardChartsEast from "./DashboardChartsEast";

function Dashboard() {
  return (
    <>
      <div className="mx-5  mb-5">
        <h2 className="mt-5 mb-5">分區報表</h2>
        <div className="row " style={{ height: "300px" }}>
          <Link className="col bg-light me-5" to="north">
            <div>台北</div>
          </Link>
          <Link className="col bg-light me-5" to="middle">
            <div className="col bg-light me-5">
              <span>台中</span>
            </div>
          </Link>
          <Link className="col bg-light me-5" to="south">
            <div className="col bg-light me-5">
              <span>台南</span>
            </div>
          </Link>
          <Link className="col bg-light " to="east">
            <div className="col bg-light ">
              <span>台東</span>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />

      <Routes>
        <Route path="north" element={<DashboardChartsNorth />} />
        <Route path="middle" element={<DashboardChartsMiddle />} />
        <Route path="south" element={<DashboardChartsSouth />} />
        <Route path="east" element={<DashboardChartsEast />} />
        <Route path="/" element={<Navigate to="north" />}></Route>
      </Routes>
    </>
  );
}

export default Dashboard;
