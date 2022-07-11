import React from "react";
import {Link} from 'react-router-dom'
import MyNavLink from "../BackstageAdminMyNarLink";
import { RiBarChart2Line } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiSpyLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
// import { RiBuildingLine } from "react-icons/ri";
// import { IoBedOutline } from "react-icons/io5";
import LOGO from "../../assets/my-logo.png";
import "./BackstageAdminSidebar.css";

function Sidebar() {
  return (
    <>
      <div
        className=" container sticky-top"
        id="sticky-sidebar"
        // style={{ background: "#EFA16A" }}
        style={{ background: "white" }}
      >
        <ul
          className=" container nav flex-column text-start fs-4 d-block nav-pills"
          style={{ height: "100vh" }}
        >
          <div className="pt-4 pb-5  ">
            <Link to="order">
              <img
                style={{ width: "210px", height: "70px", marginLeft: "20px" }}
                src={LOGO}
                alt=""
              />
            </Link>
          </div>
          <li className="nav-item" style={{alignItem:'center'}}>
              <MyNavLink to="order">
              <RiFileList3Line className="mx-2 ms-4" />
              <span>訂單管理</span>
            </MyNavLink>
            
          </li>
          <li className="nav-item">
            <MyNavLink to="partnership">
              <RiSpyLine className="mx-2 ms-4" />
              合作夥伴管理
            </MyNavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link dropdown-toggle pt-2 "
              // aria-expanded="false"
              style={{ textDecoration: "none",height:'60px' }}
            >
              <span
                className="kmr-font-color-primary km-sidebar"
                
              >
                <RiHome2Line className="mx-2 ms-4" />
                飯店房型管理
              </span>
            </a>
            <ul
              className="collapse nav hidden flex-column h-50 km-sidebar"
              id="submenu1"
              data-bs-parent="#menu"
              styl
            >
              <li >
                <MyNavLink className="nav-link text-center pt-3" style={{height:'60px'}} to="hotel">
                  <p style={{ paddingRight: "80px" }}>飯店</p>
                </MyNavLink>
              </li>
              <li>
                <MyNavLink className=" nav-link text-center pt-3" style={{height:'60px'}} to="room">
                  <p style={{ paddingRight: "80px" }}>房型</p>
                </MyNavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <MyNavLink to="dashboard">
              <RiBarChart2Line className="mx-2 ms-4" />
              分區報表
            </MyNavLink>
          </li>
          <li className="nav-item">
            <MyNavLink to="employee">
              <BiUser className="mx-2 ms-4" />
              員工管理
            </MyNavLink>
          </li>
        </ul>
        <div className="row">
          <div className="flex-column"></div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
