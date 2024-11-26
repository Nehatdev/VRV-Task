import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserModal = ({ show, handleClose, saveUser, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    role: "User",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        status: currentUser.status || "Active",
        role: currentUser.role || "User",
      });
    } else {
      setFormData({ name: "", email: "", status: "Active", role: "User" });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ ...currentUser, ...formData });
    handleClose();
  };
  if (!show) return null;
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentUser ? "Edit User" : "Add User"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default UserModal;
