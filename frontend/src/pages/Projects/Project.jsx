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

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const ProjectPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const res = await fetch(`${API_URL}/newsAndEvents/get`);
      const data = await res.json();
      const filteredNews = data.filter((item) => item.typeOfData === "project");
      setNews(filteredNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/newsAndEvents/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNews(news.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>
          <Newspaper className="icon" />
          Latest Projects
        </h1>
        <Link to="/create-newsandevents" className="create-news-btn">
          <FilePlus className="icon" />
          Create Projects
        </Link>
      </div>

      {loading ? (
        <div className="loader">
          <LoaderCircle className="spin" size={40} />
          <p>Loading projects...</p>
        </div>
      ) : news.length > 0 ? (
        <div className="news-grid">
          {news.map((item) => (
            <div className="news-card" key={item._id}>
              <img src={item.image} alt={item.title} className="news-image" />
              <div className="news-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="news-actions">
                  <button
                    className="btn-update"
                    onClick={() =>
                      navigate(`/update-newsandevents/${item._id}`)
                    }
                  >
                    <Pencil className="icon" size={16} /> Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="icon" size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-news">No projects available.</p>
      )}
    </div>
  );
};

export default ProjectPage;
