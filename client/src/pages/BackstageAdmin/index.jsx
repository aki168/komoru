import React from "react";
import AdminHeader from "../../components/BackstageAdminHeader";
import Sidebar from "../../components/BackstageAdminSidebar";

function BackstageAdmin() {
  return (
    <>
      <div className="row g-0 ">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <AdminHeader />
        </div>
      </div>
    </>
  );
}

export default BackstageAdmin;
