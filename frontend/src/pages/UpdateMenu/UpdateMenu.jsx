import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./UpdateMenu.css";

const UpdateMenu = () => {
  const { updateId } = useParams();
  const navigate = useNavigate();

  console.log("idddd: ", updateId);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    kitchen: "",
    image: "",
    category: "",
    owner: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch menu item by ID
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await fetch(`${API_URL}/menu/item/${updateId}`);
        const data = await res.json();

        // If your API doesn't wrap the response (like { success: true, data: {...} })
        // then use this:
        const { name, description, price, kitchen, image, category, owner } =
          data;

        setFormData({
          name: String(name || ""),
          description: String(description || ""),
          price: String(price || ""),
          kitchen: String(kitchen || ""),
          image: String(image || ""),
          category: String(category || ""),
          owner: String(owner || ""),
        });

        setImagePreview(image || null);
        console.log("Fetched item:", data);
      } catch (err) {
        toast.error("Error fetching menu item.");
        console.error(err);
      }
    };

    fetchMenuItem();
  }, [updateId]);

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
    console.log("Submitting form with data:", formData);

    try {
      let imageUrl = formData.image;

      // ✅ If there's a new image selected, upload it to Cloudinary
      if (imageFile) {
        console.log("Uploading new image to Cloudinary...");

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
        console.log("Cloudinary response:", cloudinaryData);

        if (!cloudinaryData.secure_url) {
          throw new Error("Image upload failed: No secure_url returned.");
        }

        imageUrl = cloudinaryData.secure_url;
      }

      // ✅ Build payload to send
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        kitchen: formData.kitchen,
        image: imageUrl,
        category: formData.category,
        owner: formData.owner,
      };

      console.log("Final payload being sent to backend: mn bnm", payload);

      // ✅ Send update request
      //   const response = await axios.put(
      //     `${API_URL}/menu/update/${updateId}`,
      //     payload,
      //     {
      //       withCredentials: true,
      //     }
      //   );
      await axios.put(`${API_URL}/menu/update/${updateId}`, payload, {
        withCredentials: true,
      });

      //   console.log("Server response after update:", response.data);

      toast.success("Menu item updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Full error caught in handleSubmit:", err);

      const message =
        err.response?.data?.message || "Failed to update menu item.";
      toast.error(message);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>Update Menu Item</h2>
      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="kitchen">Kitchen</label>
          <input
            type="text"
            name="kitchen"
            id="kitchen"
            value={formData.kitchen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            name="owner"
            id="owner"
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
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

        <button type="submit">Update Menu</button>
      </form>
    </div>
  );
};

export default UpdateMenu;
