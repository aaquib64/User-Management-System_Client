
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./UserList.css";

const UserList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [editUser, setEdit] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users", {
        params: { page, limit: 8, search, role: roleFilter },
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const openCreate = () => {
    setEdit(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user",
      status: "active",
    });
    setModal(true);
  };

  const openEdit = (u) => {
    setEdit(u);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
      status: u.status,
    });
    setModal(true);
  };

  const handleSave = async () => {
    try {
      if (editUser) {
        await api.put(`/users/${editUser._id}`, form);
      } else {
        await api.post("/users", form);
      }
      setModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving user");
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const pages = Math.ceil(total / 8);

  return (
    <div className="container">
      <div className="header">
        <h2>User Management</h2>
        {currentUser.role === "admin" && (
          <button className="addBtn" onClick={openCreate}>
            + Add User
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="search"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="select"
          value={roleFilter}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge">{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.status}`}>{u.status}</span>
                  </td>
                  <td>{u.createdBy?.name || "—"}</td>

                  <td className="actions">
                    <button className="editBtn" onClick={() => openEdit(u)}>
                      Edit
                    </button>

                    {currentUser.role === "admin" && u.status === "active" && (
                      <button
                        className="delBtn"
                        onClick={() => handleDeactivate(u._id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="pageBtn"
        >
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
          className="pageBtn"
        >
          Next
        </button>
      </div>

      {/* Modal (Add/Edit User) */}
{showModal && (
  <div className="overlay">
    <div className="modal">
      <h3>{editUser ? "Edit User" : "Create User"}</h3>

      {["name", "email", "password"].map((field) => (
        <input
          key={field}
          type={
            field === "password"
              ? "password"
              : field === "email"
              ? "email"
              : "text"
          }
          placeholder={
            field.charAt(0).toUpperCase() +
            field.slice(1) +
            (field === "password" && editUser
              ? " (leave blank to keep)"
              : "")
          }
          value={form[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
          className="input"
        />
      ))}

      {currentUser.role === "admin" && (
        <select
          className="input"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <select
        className="input"
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="modalActions">
        <button className="addBtn" onClick={handleSave}>
          Save
        </button>
        <button className="pageBtn" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserList;
