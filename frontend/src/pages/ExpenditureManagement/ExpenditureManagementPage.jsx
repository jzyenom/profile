// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuthStore } from "../../store/authStore";
// import "./ExpenditureManagementPage.css";
// import Loader from "../../components/Loader/Loader";

// const ExpenditureManagementPage = () => {
//   const { user } = useAuthStore();

//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   const [expenditures, setExpenditures] = useState([]);
//   const [restaurant, setRestaurant] = useState(null);
//   const [editingItemId, setEditingItemId] = useState(null);

//   const [formData, setFormData] = useState({
//     purpose: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     owner: user?._id,
//     restaurantId: "",
//   });

//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/restaurant/get`);
//         const ownedRestaurant = res.data.find(
//           (rest) => String(rest.owner) === String(user._id)
//         );

//         if (!ownedRestaurant) {
//           toast.error("No restaurant found for this user.");
//           return;
//         }

//         setRestaurant(ownedRestaurant);
//         setFormData((prev) => ({
//           ...prev,
//           restaurantId: ownedRestaurant._id,
//         }));

//         fetchExpenditures(ownedRestaurant._id);
//       } catch (err) {
//         toast.error("Failed to fetch restaurant.");
//         console.error(err);
//       }
//     };

//     if (user?._id) {
//       fetchRestaurant();
//     }
//   }, [user?._id]);

//   const fetchExpenditures = async (restaurantId) => {
//     try {
//       const res = await axios.get(`${API_URL}/expenditure/${restaurantId}`, {
//         withCredentials: true,
//       });
//       setExpenditures(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch expenditures.");
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       purpose: "",
//       amount: "",
//       date: new Date().toISOString().split("T")[0],
//       owner: user?._id,
//       restaurantId: restaurant?._id || "",
//     });
//     setEditingItemId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingItemId) {
//       try {
//         await axios.put(`${API_URL}/expenditure/${editingItemId}`, formData, {
//           withCredentials: true,
//         });
//         toast.success("Expenditure updated successfully");
//         fetchExpenditures(formData.restaurantId);
//         resetForm();
//       } catch (err) {
//         toast.error("Failed to update expenditure");
//         console.error(err);
//       }
//     } else {
//       try {
//         await axios.post(`${API_URL}/expenditure/create`, formData, {
//           withCredentials: true,
//         });
//         toast.success("Expenditure added successfully");
//         resetForm();
//         fetchExpenditures(formData.restaurantId);
//       } catch (err) {
//         toast.error("Failed to add expenditure");
//         console.error(err);
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       purpose: item.purpose,
//       amount: item.amount,
//       date: item.date.split("T")[0],
//       owner: user?._id,
//       restaurantId: restaurant?._id || "",
//     });
//     setEditingItemId(item._id);
//   };

//   const handleDelete = async (itemId) => {
//     if (!window.confirm("Are you sure you want to delete this expenditure?"))
//       return;

//     try {
//       await axios.delete(`${API_URL}/expenditure/${itemId}`, {
//         withCredentials: true,
//       });
//       toast.success("Expenditure deleted successfully");
//       fetchExpenditures(formData.restaurantId);
//       if (editingItemId === itemId) resetForm();
//     } catch (err) {
//       toast.error("Failed to delete expenditure");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="inventory-container">
//       <h1 className="inventory-title">Expenditure Tracker</h1>

//       {restaurant ? (
//         <>
//           <form className="inventory-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="purpose"
//               value={formData.purpose}
//               onChange={handleChange}
//               placeholder="Purpose (e.g., Transport, Gas)"
//               required
//             />
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="Amount (₦)"
//               required
//             />
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//             <button className="add-btn" type="submit">
//               {editingItemId ? "Update Record" : "Add Record"}
//             </button>
//             {editingItemId && (
//               <button
//                 type="button"
//                 className="cancel-btn"
//                 onClick={resetForm}
//                 style={{ marginLeft: "10px" }}
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </form>

//           <table className="inventory-table">
//             <thead>
//               <tr>
//                 <th>Purpose</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenditures.map((item) => (
//                 <tr key={item._id}>
//                   <td data-label="Purpose">{item.purpose}</td>
//                   <td data-label="Amount">₦{item.amount}</td>
//                   <td data-label="Date">
//                     {new Date(item.date).toLocaleDateString()}
//                   </td>
//                   <td data-label="Actions">
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEdit(item)}
//                       style={{ marginRight: "6px" }}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p
//           style={{ textAlign: "center", marginTop: "2rem", fontWeight: "500" }}
//         >
//           <Loader />
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExpenditureManagementPage;
//
//
//
//
//
//

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAuthStore } from "../../store/authStore";
import "./ExpenditureManagementPage.css";

const ExpenditureManagementPage = () => {
  const { user } = useAuthStore();

  const [expenditures, setExpenditures] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
    period: "all",
  });

  const restaurantId = "your-restaurant-id";

  useEffect(() => {
    if (restaurantId) {
      fetchExpenditures();
    }
  }, [restaurantId]);

  const fetchExpenditures = async () => {
    try {
      const { data } = await axios.get(`/api/expenditure/${restaurantId}`);
      setExpenditures(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load expenditures");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!purpose || !amount) return toast.error("All fields are required");
    if (!user?._id) return toast.error("User must be logged in");

    try {
      setLoading(true);

      if (editingId) {
        const { data } = await axios.put(`/api/expenditure/${editingId}`, {
          purpose,
          amount: Number(amount),
        });

        setExpenditures((prev) =>
          prev.map((exp) => (exp._id === editingId ? data : exp))
        );
        toast.success("Expenditure updated");
      } else {
        const { data } = await axios.post("/api/expenditure/create", {
          purpose,
          amount: Number(amount),
          restaurantId,
          owner: user._id,
          date: new Date().toISOString(),
        });

        setExpenditures((prev) => [...prev, data]);
        toast.success("Expenditure recorded");
      }

      setPurpose("");
      setAmount("");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save expenditure");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setPurpose(item.purpose);
    setAmount(item.amount);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expenditure?"))
      return;

    try {
      await axios.delete(`/api/expenditure/${id}`);
      setExpenditures((prev) => prev.filter((item) => item._id !== id));
      toast.success("Expenditure deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const isInPeriod = (dateObj, period) => {
    const now = new Date();
    switch (period) {
      case "day":
        return (
          dateObj.getDate() === now.getDate() &&
          dateObj.getMonth() === now.getMonth() &&
          dateObj.getFullYear() === now.getFullYear()
        );
      case "week": {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return dateObj >= startOfWeek && dateObj <= endOfWeek;
      }
      case "month":
        return (
          dateObj.getMonth() === now.getMonth() &&
          dateObj.getFullYear() === now.getFullYear()
        );
      case "year":
        return dateObj.getFullYear() === now.getFullYear();
      case "all":
      default:
        return true;
    }
  };

  const filteredExpenditures = expenditures.filter((item) => {
    const amt = item.amount;
    const date = new Date(item.date);

    const withinAmount =
      (!filters.minAmount || amt >= parseFloat(filters.minAmount)) &&
      (!filters.maxAmount || amt <= parseFloat(filters.maxAmount));

    const withinDateRange =
      (!filters.startDate || date >= new Date(filters.startDate)) &&
      (!filters.endDate || date <= new Date(filters.endDate));

    const withinPeriod = isInPeriod(date, filters.period);

    return withinAmount && withinDateRange && withinPeriod;
  });

  const totalExpenditure = filteredExpenditures.reduce(
    (sum, item) => sum + item.amount,
    0
  );

const exportToCSV = () => {
  if (!filteredExpenditures || filteredExpenditures.length === 0) {
    toast.error("No expenditures to export");
    return;
  }

  const headers = ["Purpose", "Amount (₦)", "Date"];
  const rows = filteredExpenditures.map((item) => [
    `"${item.purpose}"`,
    item.amount.toFixed(2),
    new Date(item.date).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [`\uFEFF${csvContent}`], // BOM for Excel encoding support
    { type: "text/csv;charset=utf-8;" }
  );

  saveAs(blob, "expenditures.csv");
};



  const exportToPDF = () => {
    if (!filteredExpenditures.length) {
      toast.error("No expenditures to export");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(14);
    doc.text("Expenditures", 40, 40);

    // Prepare table headers and rows
    const headers = [["Purpose", "Amount (₦)", "Date"]];
    const rows = filteredExpenditures.map((item) => [
      item.purpose,
      item.amount.toFixed(2),
      new Date(item.date).toLocaleDateString(),
    ]);

    // Auto table options
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
      theme: "striped",
      styles: { fontSize: 12 },
      headStyles: { fillColor: [255, 99, 71] }, // tomato red for header
    });

    doc.save("expenditures.pdf");
  };

  return (
    <div
      className="container"
      style={{ maxWidth: 900, margin: "auto", padding: 20 }}
    >
      <h1>Expenditure Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          style={{ marginRight: 10, padding: 6, minWidth: 200 }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
          style={{ marginRight: 10, padding: 6, width: 100 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "6px 12px" }}
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add Expenditure"}
        </button>
      </form>

      <div
        className="filters"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <h3>Filter</h3>
        <label>
          Min ₦:{" "}
          <input
            type="number"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minAmount: e.target.value }))
            }
            style={{ width: 80 }}
          />
        </label>
        <label>
          Max ₦:{" "}
          <input
            type="number"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxAmount: e.target.value }))
            }
            style={{ width: 80 }}
          />
        </label>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </label>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </label>
        <label>
          Period:{" "}
          <select
            value={filters.period}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, period: e.target.value }))
            }
          >
            <option value="all">All</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </label>

        <button
          type="button"
          onClick={exportToCSV}
          style={{ padding: "6px 12px" }}
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={exportToPDF}
          style={{ padding: "6px 12px" }}
        >
          Export PDF
        </button>
      </div>

      <h2>
        Total Expenditure: ₦
        {totalExpenditure.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "8px" }}>Purpose</th>
            <th style={{ padding: "8px" }}>Amount (₦)</th>
            <th style={{ padding: "8px" }}>Date</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenditures.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: "10px", textAlign: "center" }}>
                No expenditures found
              </td>
            </tr>
          )}
          {filteredExpenditures.map((item) => (
            <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{item.purpose}</td>
              <td style={{ padding: "8px" }}>{item.amount.toFixed(2)}</td>
              <td style={{ padding: "8px" }}>
                {new Date(item.date).toLocaleDateString()}
              </td>
              <td className="action-buttons">
  <button onClick={() => handleEdit(item)} className="btn-update">
    Update
  </button>
  <button onClick={() => handleDelete(item._id)} className="btn-delete">
    Delete
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenditureManagementPage;
