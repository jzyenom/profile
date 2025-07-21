import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ExpenditureAnalytics.css";

const ExpenditureAnalytics = ({
  restaurantId,
  expenditure,
  setExpenditure,
  from,
  to,
  setFrom,
  setTo,
}) => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_API_URL;

  const [filteredData, setFilteredData] = useState([]);

  // Fetch expenditure on mount
  useEffect(() => {
    if (restaurantId) {
      fetchExpenditure();
    }
  }, [restaurantId]);

  const fetchExpenditure = async () => {
    try {
      const res = await axios.get(`${API_URL}/expenditure/${restaurantId}`, {
        withCredentials: true,
      });
      setExpenditure(res.data);
    } catch (error) {
      toast.error("Failed to fetch expenditure records");
      console.error(error);
    }
  };

  // Filter by date
  useEffect(() => {
    if (!restaurantId || !Array.isArray(expenditure)) return;

    let filtered = expenditure;

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // End of day

      filtered = expenditure.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    setFilteredData(filtered);
  }, [expenditure, from, to, restaurantId]);

  // Aggregate data for chart
  const chartData = useMemo(() => {
    const result = [];

    filteredData.forEach((item) => {
      const existing = result.find((entry) => entry.purpose === item.purpose);
      if (existing) {
        existing.amount += item.amount;
      } else {
        result.push({ purpose: item.purpose, amount: item.amount });
      }
    });

    return result;
  }, [filteredData]);

  const total = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="expenditure-analytics">
      <h2>Expenditure Analytics</h2>

      {from && to && (
        <p className="filter-info">
          Showing from <strong>{from}</strong> to <strong>{to}</strong>
        </p>
      )}

      <p className="total">Total Expenditure: ₦{total.toLocaleString()}</p>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="purpose" />
            <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
            <Bar dataKey="amount" fill="#FF6347" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No expenditure data available for selected date range.</p>
      )}
    </div>
  );
};

export default ExpenditureAnalytics;
