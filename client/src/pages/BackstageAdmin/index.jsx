import React from "react";
import AdminHeader from "../../components/BackstageAdminHeader";
import Sidebar from "../../components/BackstageAdminSidebar";

function BackstageAdmin() {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-2" style={{ boxShadow: "6px 0px 5px rgba(0, 0, 0, 0.1)", zIndex: "9999" }}
        >
          <Sidebar />
        </div>
        <div className="col-md-10" style={{ boxShadow: "6px 0px 5px rgba(0, 0, 0, 1)" }}>
          <AdminHeader />
        </div>
      </div>

    </>
  );
}

export default BackstageAdmin;
