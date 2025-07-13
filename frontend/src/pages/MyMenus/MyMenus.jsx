import React, { useEffect, useState } from "react";
import "./MyMenus.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const MyMenus = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuthStore();

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu/get`);
        const userMenus = res.data.filter((item) => item.owner === user._id);
        setMenuItems(userMenus);
      } catch (err) {
        toast.error("Failed to fetch menu items");
        console.error(err);
      }
    };

    fetchMenuItems();
  }, [user._id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/get`);
        setCategories([
          {
            name: "All",
            image: "https://cdn-icons-png.flaticon.com/512/126/126515.png",
          },
          ...res.data,
        ]);
      } catch (err) {
        toast.error("Failed to fetch categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?"))
      return;
    try {
      await axios.delete(`${API_URL}/menu/delete/${id}`);
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Menu item deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  const handleUpdate = (item) => {
    // You can replace this with navigation or modal logic
    toast("Update action for: " + item.name);
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Explore Your Menus</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Category list */}
      <div className="category-buttons">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`category-card ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.image && (
              <img src={cat.image} alt={cat.name} className="category-image" />
            )}
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </div>

      <hr className="category-divider" />

      {/* Menu items */}
      <div className="food-display-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-image" />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="menu-price">₦{item.price}</p>
                <div className="menu-actions">
                  <Link to={`/update-menu/${item._id}`} className="update-btn">
                    <button className="update-btn">Update</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No menus created yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyMenus;
