import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./SalesAnalytics.css";

const SalesAnalytics = ({ restaurantId, sale, setSale, from, to }) => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    if (restaurantId) {
      fetchSales();
    }
  }, [restaurantId]);

  const fetchSales = async () => {
    try {
      const res = await axios.get(`${API_URL}/sale/${restaurantId}`, {
        withCredentials: true,
      });
      setSale(res.data);
    } catch (error) {
      toast.error("Failed to fetch sale records");
      console.error(error);
    } finally {
    }
  };

  const [filteredSales, setFilteredSales] = useState([]);
  useEffect(() => {
    if (!restaurantId || !sale || sale.length === 0) return;

    let filtered = sale;

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // ✅ include entire "to" day

      filtered = sale.filter((item) => {
        const saleDate = new Date(item.dateOfSale);
        return saleDate >= fromDate && saleDate <= toDate;
      });
    }

    setFilteredSales(filtered);
  }, [sale, from, to, restaurantId]);

  // Aggregate chart data by itemName
  const chartData = useMemo(() => {
    const result = [];

    filteredSales.forEach((item) => {
      const existing = result.find((entry) => entry.itemName === item.itemName);
      if (existing) {
        existing.totalAmount += item.totalAmount;
        existing.quantitySold += item.quantitySold;
      } else {
        result.push({
          itemName: item.itemName,
          totalAmount: item.totalAmount,
          quantitySold: item.quantitySold,
        });
      }
    });

    return result;
  }, [filteredSales]);

  const totalSales = filteredSales.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  return (
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <p className="total">Total Sales: ₦{totalSales.toLocaleString()}</p>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="itemName" />
            <Tooltip
              formatter={(value, name) => {
                return name === "totalAmount"
                  ? [`₦${value.toLocaleString()}`, "Sales"]
                  : [value, "Qty"];
              }}
            />
            <Bar dataKey="totalAmount" fill="#FF6347" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No sales data available for selected date range.</p>
      )}
    </div>
  );
};

export default SalesAnalytics;
