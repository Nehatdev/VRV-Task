import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => toast.error("Failed to fetch user data"));
  }, []);

  const handleShow = (user = null) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSave = (user) => {
    if (user.id) {
      // Edit user
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then(() => {
          setUsers(users.map((u) => (u.id === user.id ? user : u)));
          toast.success("User updated successfully!");
        })
        .catch(() => toast.error("Failed to update user"));
    } else {
      // Add new user
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, id: Date.now() }),
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          toast.success("User added successfully!");
        })
        .catch(() => toast.error("Failed to add user"));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
        toast.success("User deleted successfully!");
      })
      .catch(() => toast.error("Failed to delete user"));
  };

  // Filtered Users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorted Users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="p-4" id="users">
      {/* Toast Notification */}
      <ToastContainer />

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        style={{ width: "50%", margin: "0 auto" }} // Adjusted search bar size
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2>User Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => handleShow()}>
        Add User
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th onClick={() => handleSort("role")}>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
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

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

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
