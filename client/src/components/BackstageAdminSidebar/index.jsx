import React from "react";
import MyNavLink from "../BackstageAdminMyNarLink";
import { RiBarChart2Line } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { RiGroupLine } from "react-icons/ri";
import { RiSpyLine } from "react-icons/ri";
import { RiBuildingLine } from "react-icons/ri";
import { IoBedOutline } from "react-icons/io5";


function Sidebar() {
  return (
    <>
      <div className="bg-success sticky-top" id="sticky-sidebar">
        <ul
          className=" nav flex-column text-start fs-4 d-block nav-pills"
          style={{ height: "100vh" }}
        >
          <header className="text-center">
            <h1 className="pt-2 text-light">KOMORU</h1>
          </header>
          <li className="nav-item ">
            <MyNavLink to="order"><RiGroupLine className="mx-2 ms-4"/>訂單管理</MyNavLink>
          </li>
          <li className="nav-item">
            <MyNavLink to="partnership"><RiSpyLine className="mx-2 ms-4"/>合作夥伴管理</MyNavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link dropdown-toggle "
              aria-expanded="false"
            >
              <span> <RiHome2Line className="mx-2 ms-4"/>飯店房型管理</span>
            </a>
            <ul
              className="collapse nav hidden  flex-column h-50 "
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li>
                <MyNavLink to="hotel"><RiBuildingLine className="ms-5"/>飯店管理</MyNavLink>
              </li>
              <li>
                <MyNavLink to="room"><IoBedOutline className="ms-5"/>房型管理</MyNavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
           
            <MyNavLink to="dashboard"  ><RiBarChart2Line className="mx-2 ms-4"/>分區報表</MyNavLink>
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
