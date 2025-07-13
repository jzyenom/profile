import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import "./CreateCategory.css";
import { useNavigate } from "react-router-dom";

// Helper function to generate a random string
const generateRandomString = (length = 4) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

const CreateCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const [formData, setFormData] = useState({
    name: "",
    restaurantId: user._id,
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

      // Upload image to Cloudinary if one was selected
      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "Food_Delivery_App"
        );

        const cloudName =
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "drfnkpnw3";

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

      // Prepare final payload with uploaded image URL
      const payload = { ...formData, image: imageUrl };

      // POST to your backend API
      await axios.post(`${API_URL}/category/create`, payload, {
        withCredentials: true,
      });

      toast.success("Restaurant created successfully!");

      // Reset form
      setFormData({
        name: "",
        restaurantId: user._id,
        image: "",
      });
      setImageFile(null);
      setImagePreview(null);
      navigate(`/dashboard`);
    } catch (err) {
      const message =
        err?.message ||
        err.response?.data?.message ||
        "Failed to create restaurant.";
      toast.error(message);
      console.error("Submission Error:", err);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Create Food Category</h2>
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
          <label htmlFor="name">Beef Seller ID</label>
          <input
            disabled
            type="text"
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            required
          />
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

export default CreateCategory;
