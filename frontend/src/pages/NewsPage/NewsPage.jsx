// import React from "react";
// import "./NewsPage.css";

// const newsItems = [
//   {
//     img: "education-2.jpg",
//     title: "Massive School Renovation",
//     text: "Over 150 schools across Kebbi State are being renovated to enhance learning environments for students and teachers alike.",
//   },
//   {
//     img: "kaura-2.jpg",
//     title: "Agricultural Equipment Distribution",
//     text: "Governor Nasir Idris flags off the distribution of tractors and inputs to empower over 50,000 farmers across the state.",
//   },
//   {
//     img: "infrastructure.jpeg",
//     title: "New Road Projects",
//     text: "The government launches key road infrastructure across remote areas to boost transportation and economic growth.",
//   },
//   {
//     img: "kaura-2.jpg",
//     title: "Youth Innovation Bootcamp",
//     text: "Kebbi State launches a youth tech and innovation program to empower future entrepreneurs and digital leaders.",
//   },
//   {
//     img: "health.jpg",
//     title: "Mobile Healthcare Units Deployed",
//     text: "Governor Idris deploys mobile clinics to rural areas to provide free medical care for underserved communities.",
//   },
//   {
//     img: "kaura.jpg",
//     title: "Community Engagement Drive",
//     text: "The administration holds town hall meetings across districts to foster inclusion and participatory governance.",
//   },
// ];

// const NewsPage = () => {
//   return (
//     <main>
//       {/* Hero Section */}
//       <section className="news-hero">
//         <div className="news-container">
//           <h1 className="news-title">Latest from Kebbi State</h1>
//           <p className="news-subtitle">
//             Stay informed with recent updates, initiatives, and milestones from
//             Governor Nasir Idris and his administration.
//           </p>
//         </div>
//       </section>

//       {/* News Grid */}
//       <section className="news-section">
//         <div className="news-container">
//           <h2 className="news-heading">Featured News & Updates</h2>
//           <div className="news-grid">
//             {newsItems.map((item, i) => (
//               <div className="news-card" key={i}>
//                 <img
//                   src={`./assets/images/${item.img}`}
//                   alt={item.title}
//                   className="news-card-img"
//                 />
//                 <div className="news-card-body">
//                   <h5 className="news-card-title">{item.title}</h5>
//                   <p className="news-card-text">{item.text}</p>
//                   <a href="#" className="news-read-more">
//                     Read More
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default NewsPage;
//
//
//
//
//
//
//

import React, { useEffect, useState } from "react";
import { LoaderCircle, FilePlus, Newspaper, Trash2, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./NewsPage.css";

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const res = await fetch(`${API_URL}/newsAndEvents/get`);
      const data = await res.json();
      const filteredNews = data.filter((item) => item.typeOfData === "news");
      setNews(filteredNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this news?");
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
          Latest News
        </h1>
        <Link to="/create-newsandevents" className="create-news-btn">
          <FilePlus className="icon" />
          Create News
        </Link>
      </div>

      {loading ? (
        <div className="loader">
          <LoaderCircle className="spin" size={40} />
          <p>Loading news...</p>
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
                    onClick={() => navigate(`/update-newsandevents/${item._id}`)}
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
        <p className="no-news">No news available.</p>
      )}
    </div>
  );
};

export default NewsPage;
