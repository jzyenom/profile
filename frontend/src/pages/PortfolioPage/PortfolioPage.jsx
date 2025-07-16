import React from "react";
import "./PortfolioPage.css";

const PortfolioPage = () => {
  return (
    <main>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <h1 className="hero-title">Governor's Portfolio</h1>
          <p className="hero-subtext">
            A record of achievements, leadership impact, and service to the people
            of Kebbi State.
          </p>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="section-light">
        <div className="container portfolio-overview">
          <div className="portfolio-image">
            <img
              src="./assets/images/kaura.jpg"
              alt="Governor Nasir Idris"
            />
          </div>
          <div className="portfolio-info">
            <h3 className="portfolio-name">Comrade Dr. Nasir Idris (Kauran Gwandu)</h3>
            <p className="portfolio-text">
              With a vision rooted in unity, education, and socioeconomic
              reform, Governor Idris has committed to building a Kebbi that
              works for every citizen.
            </p>
            <p className="portfolio-text">
              His background as a unionist and educationist continues to shape
              bold policy decisions and infrastructural strides across the
              state.
            </p>
            <a href="#milestones" className="portfolio-button">View Milestones</a>
          </div>
        </div>
      </section>

      {/* Key Categories */}
      <section className="section-white">
        <div className="container">
          <h2 className="section-title">Focus Areas</h2>
          <div className="card-grid">
            {[
              {
                img: "education.jpeg",
                title: "Education",
                text: "Upgraded schools, teacher training, and the introduction of free basic education across the state.",
              },
              {
                img: "health.jpg",
                title: "Healthcare",
                text: "Built new PHCs, deployed mobile health units, and improved maternal/child care access in rural areas.",
              },
              {
                img: "infrastructure.jpeg",
                title: "Infrastructure",
                text: "Modern roads, bridges, water systems, and electricity projects connecting towns and boosting trade.",
              },
            ].map((item, i) => (
              <div className="card" key={i}>
                <img src={`./assets/images/${item.img}`} alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="milestones" className="section-light">
        <div className="container">
          <h2 className="section-title">Milestone Achievements</h2>
          <div className="card-grid">
            {[
              {
                title: "🗓️ First 100 Days",
                text: "Launched free school feeding, flagged off road construction projects, and recruited 2,000 teachers into the civil service.",
              },
              {
                title: "🏥 Healthcare Boost",
                text: "Over 15 new Primary Healthcare Centres built and equipped with solar energy in underserved regions.",
              },
              {
                title: "🌾 Youth in Agriculture",
                text: "Empowered 5,000 youths through mechanized farming cooperatives and training in agribusiness.",
              },
            ].map((item, i) => (
              <div className="card" key={i}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Together, We Build Kebbi</h2>
          <p className="cta-text">
            Support the journey of progress and be part of Kebbi’s future.
          </p>
          <a href="./contact.html" className="cta-button">
            Contact the Governor’s Office
          </a>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
