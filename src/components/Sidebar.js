import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-3">
      <h4 className="text-center">Admin Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="#users" className="nav-link text-white">Users</a>
        </li>
        <li className="nav-item">
          <a href="#roles" className="nav-link text-white">Roles</a>
        </li>
        <li className="nav-item">
          <a href="#permissions" className="nav-link text-white">Permissions</a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
