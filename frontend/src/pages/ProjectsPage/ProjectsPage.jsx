// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "./ProjectsPage.css";

// const ProjectsPage = () => {
//   // inside ProjectsPage component
//   const location = useLocation();

//   useEffect(() => {
//     if (location.hash) {
//       const sectionId = location.hash.replace("#", "");
//       const section = document.getElementById(sectionId);
//       if (section) {
//         setTimeout(() => {
//           section.scrollIntoView({ behavior: "smooth" });
//         }, 100); // slight delay to ensure DOM is ready
//       }
//     }
//   }, [location]);

//   const completedProjects = [
//     {
//       title: "Birnin Kebbi Road Rehabilitation",
//       description: "Reconstructed 25km of urban roads with proper drainage.",
//       img: "./assets/images/infrastructure.jpeg",
//     },
//     {
//       title: "School Renovations",
//       description: "Renovated 150 schools across the 21 local governments.",
//       img: "./assets/images/education.jpeg",
//     },
//     {
//       title: "Mobile Health Outreach",
//       description: "Deployed mobile clinics to rural areas.",
//       img: "./assets/images/health.jpg",
//     },
//     {
//       title: "Water Supply Project",
//       description: "Commissioned water boreholes in 300 communities.",
//       img: "./assets/images/water.jpg",
//     },
//   ];

//   const ongoingProjects = [
//     {
//       title: "State University Upgrade",
//       description: "Expanding facilities and updating curriculum.",
//       img: "./assets/images/education-2.jpg",
//     },
//     {
//       title: "Agricultural Equipment Distribution",
//       description: "Tractors and inputs distributed to over 50,000 farmers.",
//       img: "./assets/images/kaura-2.jpg",
//     },
//     {
//       title: "Rural Electrification",
//       description: "Solar electrification for remote towns.",
//       img: "./assets/images/energy.jpg",
//     },
//     {
//       title: "New Road Projects",
//       description: "Major road constructions across Argungu and Yauri.",
//       img: "./assets/images/infrastructure.jpeg",
//     },
//   ];

//   const proposedProjects = [
//     {
//       title: "Digital Innovation Hubs",
//       description: "Building youth-focused tech centers across Kebbi.",
//       img: "./assets/images/tech.jpg",
//     },
//     {
//       title: "Hospital Expansion",
//       description: "Upgrade of General Hospitals to teaching hospitals.",
//       img: "./assets/images/health.jpg",
//     },
//     {
//       title: "Kebbi Metro Bus Project",
//       description: "Safe, affordable transportation for major towns.",
//       img: "./assets/images/transport.jpg",
//     },
//     {
//       title: "Cultural Heritage Village",
//       description: "A tourist attraction to promote local culture.",
//       img: "./assets/images/culture.jpeg",
//     },
//   ];

//   const renderProjects = (projects) =>
//     projects.map((project, index) => (
//       <div className="project-card" key={index}>
//         <img src={project.img} alt={project.title} className="project-img" />
//         <h4 className="project-title">{project.title}</h4>
//         <p className="project-description">{project.description}</p>
//       </div>
//     ));

//   return (
//     <main className="projects-main">
//       <section className="projects-hero">
//         <div className="projects-container text-center text-white">
//           <h1 className="projects-heading">State Projects & Development</h1>
//           <p className="projects-subtext">
//             Explore the completed, ongoing, and proposed projects by Governor
//             Nasir Idris' administration.
//           </p>
//           <div className="projects-nav">
//             <a href="#completed">Completed</a>
//             <a href="#ongoing">Ongoing</a>
//             <a href="#proposed">Proposed</a>
//           </div>
//         </div>
//       </section>

//       <section id="completed" className="project-section">
//         <div className="projects-container">
//           <h2 className="section-title">✅ Completed Projects</h2>
//           <div className="project-grid">
//             {renderProjects(completedProjects)}
//           </div>
//         </div>
//       </section>

//       <section id="ongoing" className="project-section bg-light">
//         <div className="projects-container">
//           <h2 className="section-title">🚧 Ongoing Projects</h2>
//           <div className="project-grid">{renderProjects(ongoingProjects)}</div>
//         </div>
//       </section>

//       <section id="proposed" className="project-section">
//         <div className="projects-container">
//           <h2 className="section-title">📌 Proposed Projects</h2>
//           <div className="project-grid">{renderProjects(proposedProjects)}</div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ProjectsPage;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostStore } from "../../store/projectStore";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const location = useLocation();
  const { posts, getPosts, isLoading, error } = usePostStore();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Filter posts based on their status
  const completedProjects = posts.filter(
    (post) => post.status?.toLowerCase() === "completed"
  );
  const ongoingProjects = posts.filter(
    (post) => post.status?.toLowerCase() === "ongoing"
  );
  const proposedProjects = posts.filter(
    (post) => post.status?.toLowerCase() === "pending" // or 'proposed' if you use that status
  );

  const renderProjects = (projects) =>
    projects.map((project, index) => (
      <div className="project-card" key={project._id || index}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
          />
        )}
        <h4 className="project-title">{project.title}</h4>
        <p className="project-description">{project.description}</p>
      </div>
    ));

  return (
    <main className="projects-main">
      <section className="projects-hero">
        <div className="projects-container text-center text-white">
          <h1 className="projects-heading">State Projects & Development</h1>
          <p className="projects-subtext">
            Explore the completed, ongoing, and proposed projects by Governor
            Nasir Idris' administration.
          </p>
          <div className="projects-nav">
            <a href="#completed">Completed</a>
            <a href="#ongoing">Ongoing</a>
            <a href="#proposed">Proposed</a>
          </div>
        </div>
      </section>

      {isLoading ? (
        <p className="loading-msg">Loading projects...</p>
      ) : error ? (
        <p className="error-msg">Error: {error}</p>
      ) : (
        <>
          <section id="completed" className="project-section">
            <div className="projects-container">
              <h2 className="section-title">✅ Completed Projects</h2>
              <div className="project-grid">
                {renderProjects(completedProjects)}
              </div>
            </div>
          </section>

          <section id="ongoing" className="project-section bg-light">
            <div className="projects-container">
              <h2 className="section-title">🚧 Ongoing Projects</h2>
              <div className="project-grid">
                {renderProjects(ongoingProjects)}
              </div>
            </div>
          </section>

          <section id="proposed" className="project-section">
            <div className="projects-container">
              <h2 className="section-title">📌 Proposed Projects</h2>
              <div className="project-grid">
                {renderProjects(proposedProjects)}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default ProjectsPage;
