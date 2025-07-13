import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import "./RestaurantSearch.css";

const RestaurantSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the query to reduce request frequency
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(handler);
  }, [query]);

  // Fetch restaurants when debouncedQuery updates
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `/api/restaurant/search?q=${debouncedQuery}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    fetchRestaurants();
  }, [debouncedQuery]);

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <Search size={18} className="search-icon" />
      </div>

      <div className="search-results">
        {results.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card">
            <h4>{restaurant.name}</h4>
            <p>{restaurant.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSearch;
