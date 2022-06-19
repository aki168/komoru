import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Order from "../../pages/BackstageAdmin/Order";
import Partnership from "../../pages/BackstageAdmin/Partnership";
import Dashboard from "../../pages/BackstageAdmin/Dashboard";
import Hotel from "../../pages/BackstageAdmin/Hotel";
import Room from "../../pages/BackstageAdmin/Room";
import { GrLogout } from "react-icons/gr";

function AdminHeader() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
        <div className="container-fluid justify-content-end">
          <form className="d-flex ">
            <h6 >UserName</h6>
            <button className="btn">
              
              <GrLogout size='2em' color=""/>
              
            </button>
          </form>
          
        </div>
      </nav>
      <Routes>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/partnership" element={<Partnership />}></Route>
        <Route path="/dashboard/*" element={<Dashboard/>}></Route>
        <Route path="/hotel" element={<Hotel />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/" element={<Navigate to="order" />}></Route>
      </Routes>
    </>
  );
}

export default AdminHeader;
