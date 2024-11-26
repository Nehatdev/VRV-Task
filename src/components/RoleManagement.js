import React, { useState } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ]);
  return (
    <div className="p-4" id="roles">
      <h2>Role Management</h2>
      <button className="btn btn-primary mb-3">Add Role</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button className="btn btn-warning btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RoleManagement;
