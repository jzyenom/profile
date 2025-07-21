import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./CategoryList.css";
import { useAuthStore } from "../../store/authStore";

const CategoryList = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/get`);
        // If authenticated, filter by user's restaurant ID
        if (user?._id) {
          const myCategories = res.data.filter(
            (cat) => cat.restaurantId === user._id
          );
          setCategories(myCategories);
        } else {
          // Guests: show all categories
          setCategories(res.data);
        }
      } catch (err) {
        toast.error("Failed to fetch categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!confirm) return;

      await axios.delete(`${API_URL}/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success("Category deleted.");
    } catch (err) {
      toast.error("Failed to delete category.");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-list-container">
      <h2>{isAuthenticated ? "My Food Categories" : "Food Categories"}</h2>

      {categories.length === 0 ? (
        <div className="no-categories">
          <p>No categories found.</p>
          {isAuthenticated && (
            <Link to="/categories/create" className="create-btn">
              Create Category
            </Link>
          )}
        </div>
      ) : (
        <div className="category-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat._id}>
              <img src={cat.image} alt={cat.name} className="category-image" />
              <h3>{cat.name}</h3>
              {isAuthenticated && cat.restaurantId === user?._id && (
                <div className="category-actions">
                  <Link
                    to={`/update-category/${cat._id}`}
                    className="btn update-btn"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
