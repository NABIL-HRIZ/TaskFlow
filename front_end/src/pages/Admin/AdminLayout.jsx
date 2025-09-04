import React from "react";
import Sidebar from "./SideBar";
import "../../styles/AdminDashboard.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="dashboard-main-content">{children}</div>
    </div>
  );
};

export default AdminLayout;
