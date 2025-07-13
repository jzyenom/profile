import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import "./CreateRestaurant.css"; // reuse same styling

const UpdateRestaurant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    image: "",
    opentime: "",
    closeTime: "",
    rating: "",
    owner: user._id,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const updateId = params.updateId;
      const res = await fetch(`${API_URL}/restaurant/get/${updateId}`);
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setFormData(data);
      setImagePreview(data.image);
    };

    fetchRestaurant();
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
    setFormData((prev) => ({ ...prev, image: "" }));
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
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const cloudinaryData = await res.json();
        imageUrl = cloudinaryData.secure_url;
      }

      const payload = { ...formData, image: imageUrl };

      await axios.put(
        `${API_URL}/restaurant/update/${params.updateId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      toast.success("Restaurant updated successfully!");
      navigate("/dashboard"); // Or wherever you want to redirect
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update restaurant.";
      toast.error(message);
      console.error(err);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Update Restaurant</h2>
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
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Update Image</label>
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

        <div className="form-group time-groups">
          <div>
            <label htmlFor="opentime">Opening Time</label>
            <input
              type="time"
              id="opentime"
              name="opentime"
              value={formData.opentime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="closeTime">Closing Time</label>
            <input
              type="time"
              id="closeTime"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            id="rating"
            name="rating"
            placeholder="Choose a number from 1 to 5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
