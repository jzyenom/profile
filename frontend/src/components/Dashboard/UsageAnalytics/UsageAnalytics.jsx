import { useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./UsageAnalytics.css";

const UsageAnalytics = ({ from, to, usage, setUsage, restaurantId }) => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    if (restaurantId) {
      fetchUsageRecords();
    }
  }, [restaurantId]);

  const fetchUsageRecords = async () => {
    try {
      const res = await axios.get(`${API_URL}/usage/${restaurantId}`, {
        withCredentials: true,
      });
      setUsage(res.data);
    } catch (error) {
      toast.error("Failed to fetch usage records");
      console.error(error);
    } finally {
    }
  };

  // const mockData = [
  //   {
  //     _id: "6843f4df689dc46891da284d",
  //     name: "Rice",
  //     quantity: 7,
  //     price: 4000,
  //     unit: "kg",
  //     createdAt: "2025-06-07T08:14:23.352Z",
  //   },
  //   {
  //     _id: "6846bab7ce795c32d0204b02",
  //     name: "meat",
  //     quantityUsed: 1,
  //     totalCost: 17500,
  //     createdAt: "2025-06-09T10:43:03.783Z",
  //   },
  //   {
  //     _id: "6846bb76ce795c32d0204b1b",
  //     name: "meat",
  //     quantityUsed: 7000,
  //     totalCost: 17500,
  //     createdAt: "2025-06-09T10:46:14.447Z",
  //   },
  //   {
  //     _id: "6846bba2ce795c32d0204b29",
  //     name: "Beans",
  //     quantityUsed: 1,
  //     totalCost: 2272.73,
  //     createdAt: "2025-06-09T10:46:58.566Z",
  //   },
  //   {
  //     _id: "6846bcaece795c32d0204b31",
  //     name: "test",
  //     quantityUsed: 1,
  //     totalCost: 9.09,
  //     createdAt: "2025-06-09T10:51:26.827Z",
  //   },
  //   {
  //     _id: "68473126b211869a63ac8158",
  //     name: "Rice",
  //     quantityUsed: 1.5,
  //     totalCost: 750,
  //     createdAt: "2025-06-09T19:08:22.692Z",
  //   },
  //   {
  //     _id: "6848d6cce96348f0a85640ba",
  //     name: "Rice",
  //     quantityUsed: 0.5,
  //     totalCost: 307.69,
  //     createdAt: "2025-06-11T01:07:24.996Z",
  //   },
  //   {
  //     _id: "6848d6e2e96348f0a85640c8",
  //     name: "Beans",
  //     quantityUsed: 10000,
  //     totalCost: 23437.5,
  //     createdAt: "2025-06-11T01:07:46.190Z",
  //   },
  //   {
  //     _id: "6848d719e96348f0a85640d6",
  //     name: "test",
  //     quantityUsed: 400,
  //     totalCost: 4000,
  //     createdAt: "2025-06-11T01:08:41.726Z",
  //   },
  // ];

  const filteredData = useMemo(() => {
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    const usageItems = usage.filter((item) => {
      if (!item.quantityUsed || !item.totalCost) return false;
      const itemDate = new Date(item.createdAt);
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;
      return true;
    });

    const grouped = usageItems.reduce((acc, item) => {
      const existing = acc.find((entry) => entry.name === item.name);
      if (existing) {
        existing.quantityUsed += item.quantityUsed;
        existing.totalCost += item.totalCost;
      } else {
        acc.push({
          name: item.name,
          quantityUsed: item.quantityUsed,
          totalCost: item.totalCost,
        });
      }
      return acc;
    }, []);

    return grouped;
  }, [from, to]);

  return (
    <div className="usage-chart-container">
      <div className="usage-chart-header">
        <h2>Usage & Cost Summary</h2>
      </div>

      <div className="usage-chart-legend">
        <span>
          <span className="dot sky" /> quantityUsed
        </span>
        <span>
          <span className="dot orange" /> totalCost
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          barSize={20}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6b7280" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#6b7280" }} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              borderColor: "#e5e7eb",
            }}
          />
          <Bar dataKey="quantityUsed" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          <Bar dataKey="totalCost" fill="#fb923c" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageAnalytics;
