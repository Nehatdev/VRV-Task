import React, { useState } from "react";
import UserModal from "./UserModel";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", status: "Active", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", status: "Inactive", role: "Editor" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleShow = (user = null) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSave = (user) => {
    if (user.id) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new user
      setUsers([...users, { ...user, id: Date.now() }]);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-4" id="users">
      <h2>User Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => handleShow()}>
        Add User
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleShow(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        saveUser={handleSave}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UserTable;
