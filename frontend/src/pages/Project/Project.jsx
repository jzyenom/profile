import React, { useEffect, useState } from "react";
import {
  LoaderCircle,
  FilePlus,
  Newspaper,
  Trash2,
  Pencil,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Project.css";
import { usePostStore } from "../../store/projectStore";

const BASE_URL = "http://localhost:5000/";
// import.meta.env.MODE === "development" ? "http://localhost:5000/" : "/";

const STATUS_OPTIONS = ["pending", "ongoing", "completed"];

const ProjectPage = () => {
  const navigate = useNavigate();
  const { posts, getPosts, deletePost, isLoading, error } = usePostStore();
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deletePost(id);
        await getPosts(); // Refresh after delete
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const filteredPosts = posts.filter(
    (post) => post.status?.toLowerCase() === statusFilter
  );

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>
          <Newspaper className="icon" />
          Latest Projects
        </h1>
        <Link to="/create-newsandevents" className="create-news-btn">
          <FilePlus className="icon" />
          Create Project
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="status-filter">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            className={`status-btn ${statusFilter === status ? "active" : ""}`}
            onClick={() => setStatusFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="loader">
          <LoaderCircle className="spin" size={40} />
          <p>Loading projects...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="news-grid">
          {filteredPosts.map((post) => (
            <div className="news-card" key={post._id}>
              {post.image && (
                <img
                  src={`${BASE_URL}${post.image}`}
                  alt={post.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="news-actions">
                  <button
                    className="btn-update"
                    onClick={() =>
                      navigate(`/update-newsandevents/${post._id}`)
                    }
                  >
                    <Pencil className="icon" size={16} /> Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Trash2 className="icon" size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-news">No {statusFilter} projects available.</p>
      )}

      {error && <p className="error-msg">Error: {error}</p>}
    </div>
  );
};

export default ProjectPage;
