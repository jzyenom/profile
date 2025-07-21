import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AllMenus.css";
import FoodItem from "../FoodItem/FoodItem";

const AllMenus = ({ onSelectItem }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu/get`);
        setMenuItems(res.data);
      } catch (err) {
        toast.error("Failed to fetch menu items");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/get`);
        setCategories([
          {
            name: "All",
            image:
              "https://i.pinimg.com/736x/05/0e/c8/050ec8c783569b61e66a84765c08e38c.jpg",
          },
          ...res.data,
        ]);
      } catch (err) {
        toast.error("Failed to fetch categories");
        console.error(err);
      }
    };

    fetchMenuItems();
    fetchCategories();
  }, []);

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-display" id="food-display">
      <h2>View Products & Prices</h2>

      <input
        type="text"
        placeholder="Search for meals..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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

      <hr className="divider" />

      <div className="food-display-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onSelect={() =>
                onSelectItem({
                  name: item.name,
                  price:
                    typeof item.price === "number"
                      ? item.price
                      : parseFloat(item.price),
                  restaurantId: item.owner,
                  quantity: 1,
                })
              }
            />
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMenus;
