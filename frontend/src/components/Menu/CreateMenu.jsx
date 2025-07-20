import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateMenu.css";

const CreateMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  // const API_URL =
  //   import.meta.env.MODE === "development"
  //     ? "http://localhost:5000/api"
  //     : "/api";

  const API_URL = "https://api-kebbi-government-profile.onrender.com";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    kitchen: "",
    category: "",
    image: "",
    owner: user._id,
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/get`);
        console.log("Category API response:", res.data);

        const filtered = res.data.filter(
          (cat) => String(cat.restaurantId) === String(user._id)
        );
        console.log("Filtered categories:", filtered);

        setCategories(filtered);
      } catch (err) {
        toast.error("Failed to load categories");
        console.error("Fetch category error:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error?.message || "Image upload failed");
        }

        imageUrl = result.secure_url;
      }

      const payload = { ...formData, image: imageUrl };

      await axios.post(`${API_URL}/menu/create`, payload, {
        withCredentials: true,
      });

      toast.success("Menu item created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        kitchen: "",
        category: "",
        image: "",
        owner: user._id,
      });
      setImageFile(null);
      setImagePreview(null);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.message ||
        err.response?.data?.message ||
        "Failed to create menu item.";
      toast.error(message);
      console.error("Submission Error:", err);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Create Menu Item</h2>
      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="kitchen">Meat Shop</label>
          <input
            type="text"
            id="kitchen"
            name="kitchen"
            value={formData.kitchen}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" onClick={handleImageRemove}>
                ×
              </button>
            </div>
          )}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMenu;
