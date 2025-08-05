import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { LoaderCircle } from "lucide-react";
import "./UserList.css"; // Optional: for custom enhancements

const UserList = () => {
  const { getUsers, users, isLoading } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const result = users.filter(
      (user) =>
        user.gender?.toLowerCase().includes(term) ||
        user.state?.toLowerCase().includes(term) ||
        user.pollingUnit?.toLowerCase().includes(term)
    );
    setFilteredUsers(result);
  }, [searchTerm, users]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User List</h2>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Search by gender, state, or polling unit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button
          className="btn btn-outline-primary"
          onClick={() => setSearchTerm(searchTerm.trim())}
        >
          Search
        </button> */}
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center my-5">
          <LoaderCircle className="spin text-primary" size={40} />
          <p className="mt-2">Loading users...</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="row">
          {filteredUsers.map((user) => (
            <div className="col-md-4 mb-4" key={user._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <p className="card-text mb-1">
                    <strong>State:</strong> {user.state}
                  </p>
                  <p className="card-text">
                    <strong>Polling Unit:</strong> {user.pollingUnit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
