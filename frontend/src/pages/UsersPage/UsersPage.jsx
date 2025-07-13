import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield } from "lucide-react";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingRoles, setEditingRoles] = useState({}); // Track new role values for each user

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user/get", {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setEditingRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdate = async (userId) => {
    try {
      const newRole = editingRoles[userId];
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      await fetchUsers(); // Refresh user list after update
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <motion.div
      className="users-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="users-title">User Management</h2>

      <div className="filter-controls">
        <label>Filter by role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="guest">Guest</option>
          <option value="restaurantOwner">Restaurant Owner</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              className="user-card"
              whileHover={{ scale: 1.03 }}
            >
              <div className="user-info">
                <User size={18} />
                <span>{user.name}</span>
              </div>
              <div className="user-info">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
              <div className="user-info">
                <Shield size={18} />
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>

              <div className="user-actions">
                <select
                  value={editingRoles[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="guest">Guest</option>
                  <option value="restaurantOwner">Restaurant Owner</option>
                  {/* <option value="admin">Admin</option> */}
                </select>
                <button onClick={() => handleUpdate(user._id)}>Update</button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default UsersPage;
