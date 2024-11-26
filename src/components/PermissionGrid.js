import React from "react";
const PermissionGrid = () => {
  const permissions = ["Read", "Write", "Delete"];
  return (
    <div className="p-4" id="permissions">
      <h2>Permissions</h2>
      <div className="d-flex">
        {permissions.map((permission) => (
          <div key={permission} className="card m-2 p-3">
            <h5>{permission}</h5>
            <p>Description of {permission} permission.</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PermissionGrid;
