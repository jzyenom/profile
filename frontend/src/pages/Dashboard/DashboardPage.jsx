// AdvancedDashboardPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import RestaurantInfo from "../../components/Dashboard/RestaurantInfo/RestaurantInfo";
import UserInfo from "../../components/Dashboard/UserInfo/UserInfo";
import UsageAnalytics from "../../components/Dashboard/UsageAnalytics/UsageAnalytics";
import ExpenditureAnalytics from "../../components/Dashboard/ExpenditureAnalytics/ExpenditureAnalytics";
import SalesAnalytics from "../../components/Dashboard/SalesAnalytics/SalesAnalytics";
import FinancialSummaryAnalysis from "../../components/Dashboard/FinancialSummaryAnalysis/FinancialSummaryAnalysis";
// import AIModelAnalysis from "../../components/Dashboard/AIModelAnalysis/AIModelAnalysis";
import "./Dashboard.css";
import UsageFilter from "../../components/UsageFilter/UsageFilter";

const DashboardPage = () => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const { user } = useAuthStore();
  const [restaurant, setRestaurant] = useState(null);
  // const [filter, setFilter] = useState({ from: "", to: "" });
  const [sale, setSale] = useState(null);
  const [expenditure, setExpenditure] = useState(null);
  const [usage, setUsage] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurant/get`);
        const owned = res.data.find((r) => r.owner === user._id);
        setRestaurant(owned);
      } catch (err) {
        console.error("Failed to fetch restaurant", err);
      }
    };
    fetchRestaurant();
  }, [user._id]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!restaurant) return <p>Loading dashboard...</p>;

  return (
    <div className="advanced-dashboard">
      <UserInfo user={user} />
      <RestaurantInfo
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        user={user}
      />
      <UsageFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
      <UsageAnalytics
        restaurantId={restaurant._id}
        usage={usage}
        setUsage={setUsage}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />
      <ExpenditureAnalytics
        restaurantId={restaurant._id}
        usage={usage}
        expenditure={expenditure}
        setExpenditure={setExpenditure}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />
      <SalesAnalytics
        restaurantId={restaurant._id}
        sale={sale}
        setSale={setSale}
        usage={usage}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />
      <FinancialSummaryAnalysis
        restaurantId={restaurant._id}
        sale={sale}
        usage={usage}
        expenditure={expenditure}
      />
    </div>
  );
};

export default DashboardPage;
