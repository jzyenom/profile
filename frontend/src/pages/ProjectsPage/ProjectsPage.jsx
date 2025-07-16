import React from "react";
import "./ProjectsPage.css";

const projectData = {
  completed: [
    {
      title: "Birnin Kebbi–Argungu Highway",
      image: "./assets/images/road.jpg",
      desc: "A 120km modern highway connecting two major commercial hubs.",
    },
    {
      title: "Modern School Complex in Jega",
      image: "./assets/images/education.jpeg",
      desc: "Includes science labs, ICT centers, and staff housing.",
    },
    {
      title: "Solar Water System",
      image: "./assets/images/infrastructure.jpeg",
      desc: "Sustainable water system installed in 30+ rural communities.",
    },
    {
      title: "Women & Youth Empowerment Program",
      image: "./assets/images/action.jpg",
      desc: "Over 10,000 women and youth trained and equipped for SMEs.",
    },
  ],
  ongoing: [
    {
      title: "State Teaching Hospital",
      image: "./assets/images/health.jpg",
      desc: "Equipped with diagnostic labs and modern surgical wards.",
    },
    {
      title: "ICT Innovation Hub",
      image: "./assets/images/action-3.jpg",
      desc: "Tech hub under construction to foster digital entrepreneurship.",
    },
    {
      title: "New Market Complex",
      image: "./assets/images/kaura.jpg",
      desc: "Boosting local trade and small businesses in Argungu.",
    },
    {
      title: "Bilingual Education Pilot",
      image: "./assets/images/education-2.jpg",
      desc: "Curriculum integrating Hausa and English for literacy.",
    },
  ],
  proposed: [
    {
      title: "Green Energy Plant",
      image: "./assets/images/infrastructure.jpeg",
      desc: "Solar farm to power 5 LGAs and reduce grid dependency.",
    },
    {
      title: "Smart City Initiative",
      image: "./assets/images/action-2.jpg",
      desc: "Digitized governance and e-services for citizens.",
    },
    {
      title: "Rural Road Expansion",
      image: "./assets/images/road.jpg",
      desc: "Connecting 150+ remote villages to major towns.",
    },
    {
      title: "Tech & Trade College",
      image: "./assets/images/culture.jpeg",
      desc: "Vocational training center proposed in Yauri axis.",
    },
  ],
};

const ProjectsPage = () => {
  const renderProjects = (title, items, className) => (
    <section className={`project-section ${className}`}>
      <div className="project-container">
        <h2 className="project-title">{title}</h2>
        <div className="project-grid">
          {items.map((item, index) => (
            <div className="project-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="project-image"
              />
              <div className="project-content">
                <h4 className="project-name">{item.title}</h4>
                <p className="project-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <section className="projects-hero">
        <div className="hero-content">
          <h1 className="hero-title">Kebbi State Projects</h1>
          <p className="hero-subtitle">
            Explore the transformation journey through completed, ongoing, and
            proposed projects across the state.
          </p>
        </div>
      </section>

      {renderProjects("✅ Completed Projects", projectData.completed, "completed")}
      {renderProjects("🚧 Ongoing Projects", projectData.ongoing, "ongoing")}
      {renderProjects("📌 Proposed Projects", projectData.proposed, "proposed")}
    </main>
  );
};

export default ProjectsPage;
