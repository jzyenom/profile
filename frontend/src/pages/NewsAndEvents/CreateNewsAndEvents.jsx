import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./CreateNewsAndEvents.css";

const CreateNewsAndEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    typeOfData: "news",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error?.message || "Image upload failed");
        }
        imageUrl = result.secure_url;
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      await axios.post(`${API_URL}/newsAndEvents/create`, payload, {
        withCredentials: true,
      });

      toast.success("News/Event created successfully!");
      setFormData({
        title: "",
        description: "",
        typeOfData: "news",
        image: "",
      });
      setImageFile(null);
      setImagePreview(null);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err?.message ||
          err.response?.data?.message ||
          "Failed to create News/Event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-event-form-container">
      <h2>Create News or Event</h2>
      <form onSubmit={handleSubmit} className="news-event-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter detailed description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="typeOfData">Type</label>
          <select
            id="typeOfData"
            name="typeOfData"
            value={formData.typeOfData}
            onChange={handleChange}
            required
          >
            <option value="news">News</option>
            <option value="events">Events</option>
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
                × Remove
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewsAndEvents;
