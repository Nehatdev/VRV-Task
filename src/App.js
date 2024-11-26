import React from "react";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import RoleManagement from "./components/RoleManagement";
import PermissionGrid from "./components/PermissionGrid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <UserTable />
        <RoleManagement />
        <PermissionGrid />
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
