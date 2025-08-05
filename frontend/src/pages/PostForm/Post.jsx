import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../store/projectStore";
import "./CreatePost.css";

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // if present, we're updating

  const { createPost, updatePost, getPost, post, error, isLoading } =
    usePostStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "proposed",
  });
  const [image, setImage] = useState(null);
  const [localError, setLocalError] = useState("");

  // Load post data if editing
  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  // When post is fetched, populate form
  useEffect(() => {
    if (id && post) {
      setFormData({
        title: post.title || "",
        description: post.description || "",
        status: post.status || "proposed",
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("status", formData.status);
    if (image) form.append("image", image);

    if (id) {
      await updatePost(id, form);
    } else {
      await createPost(form);
    }

    // Navigate only if no error and not loading anymore
    setTimeout(() => {
      const hasError = usePostStore.getState().error;
      if (!hasError) navigate("/projects");
    }, 500);
  };

  return (
    <div className="create-post-container">
      <h2>{id ? "Update Project" : "Create New Project"}</h2>
      {error || localError ? (
        <p className="error-msg">{localError || error}</p>
      ) : null}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="proposed">Proposed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image (optional):</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? id
              ? "Updating..."
              : "Creating..."
            : id
            ? "Update Project"
            : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
