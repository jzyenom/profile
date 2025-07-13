import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useAuthStore } from "../../store/authStore";
import { ShoppingCart, User2 } from "lucide-react";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [menuItems, setMenuItems] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  // Load menu items ONLY if user is on cart page
  useEffect(() => {
    const isCartPage = location.pathname === "/cart";
    if (isCartPage && menuItems.length === 0) {
      const fetchMenuItems = async () => {
        try {
          const response = await axios.get(`${API_URL}/menu/get`);
          setMenuItems(response.data);
        } catch (err) {
          console.error("Failed to load menu items:", err);
        }
      };
      fetchMenuItems();
    }
  }, [location.pathname, menuItems.length]);

  // Load restaurants ONLY when search is opened
  useEffect(() => {
    if (searchOpen && restaurants.length === 0) {
      const fetchRestaurants = async () => {
        try {
          const res = await axios.get(`${API_URL}/restaurant/get`);
          setRestaurants(res.data);
        } catch (err) {
          console.error("Failed to fetch restaurants:", err);
        }
      };
      fetchRestaurants();
    }
  }, [searchOpen, restaurants.length]);

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img src={assets.logo} className="logo" alt="Logo" />
      </Link>

      {/* Menu links */}
      <ul className="navbar-menu">
        <Link
          to="/menu"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Menu
        </Link>
        {/* <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a> */}
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      {/* Right section: search icon, cart, user */}
      <div className="navbar-right">
        {/* <img
          src={assets.search_icon}
          alt="search"
          className="search-toggle"
          onClick={() => setSearchOpen(!searchOpen)}
        /> */}
        <Link to="/cart" className="color-gray navbar-search-icon">
          <ShoppingCart size={24} />
          {getTotalCartAmount(menuItems) > 0 && <div className="dot" />}
        </Link>
        <Link to={isAuthenticated ? "/dashboard" : "/login"}>
          <div className="user-icon">
            <User2 />
          </div>
        </Link>
      </div>

      {/* Search Dropdown Field */}
      {/* {searchOpen && (
        <div className="search-dropdown">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="search-results-dropdown">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((r) => (
                  <Link
                    key={r._id}
                    to={`/restaurant/${r.owner}`}
                    className="search-result-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    {r.name}
                  </Link>
                ))
              ) : (
                <div className="search-result-item">No results found</div>
              )}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
