import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useAuthStore } from "../../store/authStore";
import {
  format,
  startOfDay,
  startOfWeek,
  startOfMonth,
  isAfter,
} from "date-fns";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UsagePage = () => {
  const { user } = useAuthStore();

  const [usageRecords, setUsageRecords] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurant/get`);
        const ownedRestaurant = res.data.find(
          (rest) => String(rest.owner) === String(user._id)
        );

        if (!ownedRestaurant) {
          toast.error("No restaurant found for this user.");
          return;
        }

        setRestaurant(ownedRestaurant);
      } catch (err) {
        toast.error("Failed to fetch restaurant.");
        console.error(err);
      }
    };

    if (user?._id) {
      fetchRestaurant();
    }
  }, [user?._id]);

  useEffect(() => {
    if (restaurant?._id) {
      fetchUsageRecords();
    }
  }, [restaurant?._id]);

  useEffect(() => {
    applyFilter();
  }, [usageRecords, filter]);

  const fetchUsageRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/usage/${restaurant._id}`, {
        withCredentials: true,
      });
      setUsageRecords(res.data);
    } catch (error) {
      toast.error("Failed to fetch usage records");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (filter === "all") {
      setFilteredRecords(usageRecords);
      return;
    }

    const now = new Date();
    let filtered = [];

    if (filter === "day") {
      const dayStart = startOfDay(now);
      filtered = usageRecords.filter((record) =>
        isAfter(new Date(record.createdAt), dayStart)
      );
    } else if (filter === "week") {
      const weekStart = startOfWeek(now);
      filtered = usageRecords.filter((record) =>
        isAfter(new Date(record.createdAt), weekStart)
      );
    } else if (filter === "month") {
      const monthStart = startOfMonth(now);
      filtered = usageRecords.filter((record) =>
        isAfter(new Date(record.createdAt), monthStart)
      );
    }

    setFilteredRecords(filtered);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Usage Records", 14, 10);
    const tableData = filteredRecords.map((record) => [
      record.name,
      record.quantityUsed,
      `₦${Number(record.totalCost).toFixed(2)}`,
      format(new Date(record.createdAt), "PPpp"),
    ]);
    doc.autoTable({
      head: [["Name", "Quantity Used", "Total Cost", "Date Used"]],
      body: tableData,
    });
    doc.save("usage_records.pdf");
  };

  const csvData = filteredRecords.map((record) => ({
    Name: record.name,
    QuantityUsed: record.quantityUsed,
    TotalCost: Number(record.totalCost).toFixed(2),
    DateUsed: format(new Date(record.createdAt), "PPpp"),
  }));

  return (
    <div className="usage-container">
      <h1>Usage Records</h1>

      <div className="filter-controls">
        <label>Filter by: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <div className="export-buttons">
          <CSVLink data={csvData} filename="usage_records.csv">
            <button className="btn">Export CSV</button>
          </CSVLink>
          <button className="btn" onClick={exportPDF}>
            Export PDF
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <table className="usage-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity Used</th>
                <th>Total Cost (₦)</th>
                <th>Date Used</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No usage records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record._id}>
                    <td data-label="Name">{record.name}</td>
                    <td data-label="Quantity Used">{record.quantityUsed}</td>
                    <td data-label="Total Cost (₦)">
                      {Number(record.totalCost).toFixed(2)}
                    </td>
                    <td data-label="Date Used">
                      {format(new Date(record.createdAt), "PPpp")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsagePage;
