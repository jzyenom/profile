// import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/authStore";

// const UserList = () => {
//   const { getUsers, users, isLoading } = useAuthStore();

//   // Form states for filtering
//   const [filters, setFilters] = useState({
//     gender: "",
//     state: "",
//     pollingUnit: "",
//   });

//   useEffect(() => {
//     // Initial load with default filter
//     getUsers({ gender: "Female", state: "Kebbi", pollingUnit: "Unit5" });
//   }, []);

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFilter = () => {
//     getUsers(filters);
//   };

//   return (
//     <div>
//       <h2>User List</h2>

//       {/* Filter Inputs */}
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Gender"
//           name="gender"
//           value={filters.gender}
//           onChange={handleChange}
//           style={{ marginRight: "0.5rem" }}
//         />
//         <input
//           type="text"
//           placeholder="State"
//           name="state"
//           value={filters.state}
//           onChange={handleChange}
//           style={{ marginRight: "0.5rem" }}
//         />
//         <input
//           type="text"
//           placeholder="Polling Unit"
//           name="pollingUnit"
//           value={filters.pollingUnit}
//           onChange={handleChange}
//           style={{ marginRight: "0.5rem" }}
//         />
//         <button onClick={handleFilter}>Filter</button>
//       </div>

//       {/* User List */}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         users.map((user) => <div key={user._id}>{user.name}</div>)
//       )}
//     </div>
//   );
// };

// export default UserList;

// import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/authStore";

// const UserList = () => {
//   const { getUsers, users, isLoading } = useAuthStore();

//   const [filters, setFilters] = useState({
//     gender: "",
//     state: "",
//     pollingUnit: "",
//   });

//   const handleInputChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = () => {
//     getUsers(filters);
//   };

//   useEffect(() => {
//     getUsers(filters); // optional: load all or defaults
//   }, []);

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">User List</h2>

//       <div className="row mb-4 g-3 justify-content-center">
//         <div className="col-md-3">
//           <input
//             type="text"
//             name="gender"
//             value={filters.gender}
//             onChange={handleInputChange}
//             className="form-control"
//             placeholder="Gender (e.g., Female)"
//           />
//         </div>

//         <div className="col-md-3">
//           <input
//             type="text"
//             name="state"
//             value={filters.state}
//             onChange={handleInputChange}
//             className="form-control"
//             placeholder="State (e.g., Kebbi)"
//           />
//         </div>

//         <div className="col-md-3">
//           <input
//             type="text"
//             name="pollingUnit"
//             value={filters.pollingUnit}
//             onChange={handleInputChange}
//             className="form-control"
//             placeholder="Polling Unit (e.g., Unit5)"
//           />
//         </div>

//         <div className="col-md-2 d-grid">
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="card p-3">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : users.length > 0 ? (
//           users.map((user) => (
//             <div key={user._id} className="border-bottom py-2">
//               {user.name}
//             </div>
//           ))
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserList;

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const UserList = () => {
  const { getUsers, users, isLoading } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers(); // Fetch all users initially
  }, [getUsers]);

  useEffect(() => {
    // Filter users whenever searchTerm or users changes
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
    <div className="container mt-4">
      <h2 className="mb-3">User List</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by gender, state, or polling unit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            // trigger filtering (although already done onChange)
            setSearchTerm(searchTerm.trim());
          }}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div key={user._id} className="card mb-2 p-2">
            <h5>{user.name}</h5>
            <p className="mb-1">Gender: {user.gender}</p>
            <p className="mb-1">State: {user.state}</p>
            <p className="mb-1">Polling Unit: {user.pollingUnit}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
