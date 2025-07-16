import React from "react";
import "./NewsPage.css";

const newsItems = [
  {
    img: "education-2.jpg",
    title: "Massive School Renovation",
    text: "Over 150 schools across Kebbi State are being renovated to enhance learning environments for students and teachers alike.",
  },
  {
    img: "kaura-2.jpg",
    title: "Agricultural Equipment Distribution",
    text: "Governor Nasir Idris flags off the distribution of tractors and inputs to empower over 50,000 farmers across the state.",
  },
  {
    img: "infrastructure.jpeg",
    title: "New Road Projects",
    text: "The government launches key road infrastructure across remote areas to boost transportation and economic growth.",
  },
  {
    img: "kaura-2.jpg",
    title: "Youth Innovation Bootcamp",
    text: "Kebbi State launches a youth tech and innovation program to empower future entrepreneurs and digital leaders.",
  },
  {
    img: "health.jpg",
    title: "Mobile Healthcare Units Deployed",
    text: "Governor Idris deploys mobile clinics to rural areas to provide free medical care for underserved communities.",
  },
  {
    img: "kaura.jpg",
    title: "Community Engagement Drive",
    text: "The administration holds town hall meetings across districts to foster inclusion and participatory governance.",
  },
];

const NewsPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-container">
          <h1 className="news-title">Latest from Kebbi State</h1>
          <p className="news-subtitle">
            Stay informed with recent updates, initiatives, and milestones from
            Governor Nasir Idris and his administration.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-section">
        <div className="news-container">
          <h2 className="news-heading">Featured News & Updates</h2>
          <div className="news-grid">
            {newsItems.map((item, i) => (
              <div className="news-card" key={i}>
                <img
                  src={`./assets/images/${item.img}`}
                  alt={item.title}
                  className="news-card-img"
                />
                <div className="news-card-body">
                  <h5 className="news-card-title">{item.title}</h5>
                  <p className="news-card-text">{item.text}</p>
                  <a href="#" className="news-read-more">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
