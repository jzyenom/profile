import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import "./CreateCategory.css"; // Reuse same styling

const UpdateCategory = () => {
  const params = useParams();
  const updateId = params.updateId;
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

  useEffect(() => {
    const fetchRestaurant = async () => {
      const updateId = params.updateId;
      const res = await fetch(`${API_URL}/category/get/${updateId}`);
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setFormData(data.category);
      console.log("Data: ", formData);

      setImagePreview(data.category.image);
    };

    fetchRestaurant();
  }, []);

  //   console.log(formData);

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

      const payload = {
        name: formData.name,
        restaurantId: formData.restaurantId,
        image: imageUrl,
      };

      await axios.put(`${API_URL}/category/update/${updateId}`, payload, {
        withCredentials: true,
      });

      toast.success("Category updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update category.";
      toast.error(message);
      console.error(err);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Update Food Category</h2>
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
          <label htmlFor="restaurantId">Restaurant ID</label>
          <input
            type="text"
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            disabled
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
