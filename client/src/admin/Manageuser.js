import React, { useEffect, useState } from "react";
import API from "../API";
import { toast } from "react-toastify";
import Navbaradmin from "../dashbord/Navbaradmin";
import './Users.css'

function Manageuser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/admin/users");
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = async (id) => {
    setActionLoading(id)
    try {
      const response = await API.put(`/admin/users/${id}/verify`);
      console.log(response)
      if (response.status === 200) {
        setUsers(users.map((user) => 
          user._id === id ? { ...user, isVerified: true } : user
        ));
        toast.success("User verified successfully!");
      } 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying user.");
    } finally {
      setActionLoading(null); 
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setActionLoading(id); 
    try {
      const response = await API.delete(`/admin/${id}/delete`);
     
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="user-list-container">
      <div>
        <Navbaradmin></Navbaradmin>
      </div>
      <div>
      <h2 className="user-list-title">Manage Users</h2>
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isVerified ? "✅ Verified" : "⛔ Not Verified"}</td>
                <td>
                  {!user.isVerified && (
                    <button 
                      className="verify-button"
                      onClick={() => handleVerify(user._id)}
                      disabled={actionLoading === user._id}
                    >
                      {actionLoading === user._id ? "Verifying..." : "Verify"}
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)}
                    disabled={actionLoading === user._id}
                  >
                    {actionLoading === user._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default Manageuser;
