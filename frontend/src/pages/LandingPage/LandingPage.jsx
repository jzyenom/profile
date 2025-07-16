import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h2>Leading Kebbi to Greatness with Kauran Gwandu</h2>
          <p className="hero-subtext">A Vision for Progress, Prosperity, and Unity</p>
          <a href="#events" className="hero-button">
            Join the Movement
          </a>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section section-light">
        <div className="custom-container">
          <h2 className="section-title">Portfolio</h2>
          <div className="portfolio-content">
            <div className="portfolio-img">
              <img src="./assets/images/kaura.jpg" alt="Governor Nasir Idris" />
            </div>
            <div className="portfolio-text">
              <p>
                Comrade Dr. Mohammed Nasir Idris, born August 6, 1965, in Birnin
              Kebbi, is the 9th Governor of Kebbi State, assuming office on May
              29, 2023. A dedicated unionist, educationist, and politician, he
              previously served as National President of the Nigeria Union of
              Teachers (NUT) and Deputy President of the Nigeria Labour Congress
              (NLC).
              </p>
              <p>
                He is a seasoned academic and public servant with a PhD in
              Education and an MBA from Usmanu Danfodio University, Sokoto.
              Throughout his career, he has demonstrated strong advocacy for
              educational reform, worker welfare, and institutional
              transparency. His governance style is people-centered and
              vision-driven, focused on transforming the socioeconomic landscape
              of Kebbi State.
              </p>
              <p>
                Since assuming office, Governor Idris has initiated bold reforms
              in education, infrastructure, and healthcare. His administration
              has championed free education policies, rebuilt dilapidated
              schools, improved road connectivity across rural areas, and
              enhanced access to healthcare. He remains committed to inclusive
              governance and the upliftment of the lives of everyday Kebbi
              citizens.
              </p>
              <a href="/portfolio.html" className="portfolio-button">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section section-light">
        <div className="custom-container">
          <h2 className="section-title">Our Vision</h2>
          <div className="vision-grid">
            {[
              {
                img: "education.jpeg",
                title: "Education",
                text: "Expanding access to quality education for all children.",
              },
              {
                img: "security.jpeg",
                title: "Security",
                text: "Investing in safety and modern security solutions.",
              },
              {
                img: "culture.jpeg",
                title: "Youth Empowerment",
                text: "Creating opportunities for youth to thrive.",
              },
              {
                img: "economy.jpeg",
                title: "Economy",
                text: "Driving local growth through business and innovation.",
              },
            ].map((item, i) => (
              <div className="vision-card" key={i}>
                <img src={`./assets/images/${item.img}`} alt={item.title} />
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section section-white">
        <div className="custom-container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {[
              {
                title: "Education Reform",
                text: "Investing in quality education to empower Kebbi’s youth...",
              },
              {
                title: "Agriculture & Food Security",
                text: "Promoting rice, sorghum, and millet production...",
              },
              {
                title: "Infrastructure Development",
                text: "Building roads, water plants, and healthcare centers...",
              },
            ].map((item, i) => (
              <div className="project-card" key={i}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section section-white">
        <div className="custom-container">
          <h2 className="section-title">Moments in Action</h2>
          <div className="gallery-grid">
            {["action.jpg", "action-2.jpg", "action-3.jpg"].map((img, i) => (
              <img
                key={i}
                src={`./assets/images/${img}`}
                alt={`Event ${i + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section section-light">
        <div className="custom-container">
          <h2 className="section-title">Latest News</h2>
          <div className="news-grid">
            {[
              {
                img: "road.jpg",
                title: "Infrastructure Launch",
                text: "Governor inaugurates new road projects...",
              },
              {
                img: "education-2.jpg",
                title: "Education Summit",
                text: "Dialogue with stakeholders on improving schools...",
              },
              {
                img: "health.jpg",
                title: "Health Outreach",
                text: "Governor launches free medical outreach...",
              },
            ].map((news, i) => (
              <div className="news-card" key={i}>
                <img src={`./assets/images/${news.img}`} alt={news.title} />
                <h5>{news.title}</h5>
                <p>{news.text}</p>
                <a href="#">Read More</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="section event-section">
        <div className="custom-container text-center">
          <h2>Events & Engagement</h2>
          <p>Stay updated and support Governor Nasir Idris’ vision for a prosperous Kebbi State.</p>
          <p>Text "KEBBI" to 12345 for campaign updates.</p>
          <p>Visit us at: Gwadan Gwaji Secretariate, Birnin Kebbi, Kebbi State</p>
          <p>Email: info@kebbistate.gov.ng</p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
