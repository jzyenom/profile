// components/UsageFilter.jsx
import "./UsageFilter.css";
const UsageFilter = ({ from, to, setFrom, setTo }) => {
  return (
    <div className="usage-chart-filters">
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
    </div>
  );
};

export default UsageFilter;
