import React, { useEffect } from "react";
import "./AchievementsPage.css";
import { useLocation } from "react-router-dom";

const AchievementsPage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => {
          const yOffset = -80; // Offset for sticky header if you have one
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100); // Delay to allow DOM to render
      }
    }
  }, [location]);
  return (
    <main className="achievements-main">
      {/* Hero Banner */}
      <section className="achievements-hero">
        <div className="achievements-container text-center text-white">
          <h1 className="achievements-title">Kebbi State Achievements</h1>
          <p className="achievements-subtitle">
            Celebrating milestones and honoring leaders who shaped our progress.
          </p>
        </div>
      </section>

      {/* Media */}
      <section id="media" className="achievements-section">
        <div className="achievements-container">
          <h2 className="achievements-heading">Media Highlights</h2>
          <p className="achievements-text">
            Over the years, Kebbi State has made national headlines for
            successful programs, cultural festivals, and international
            collaborations. Media coverage has played a vital role in showcasing
            the state’s progress and promoting transparency.
          </p>
          <ul className="achievements-list">
            <li>Broadcast of Argungu Festival on global platforms</li>
            <li>
              Governor’s speeches on national development aired on NTA and
              Channels TV
            </li>
            <li>Documentaries featuring Kebbi’s agricultural transformation</li>
            <li>Online press coverage of major government projects</li>
          </ul>
        </div>
      </section>

      {/* Past Governors */}
      <section id="past-governors" className="achievements-section bg-light">
        <div className="achievements-container">
          <h2 className="achievements-heading">Past Governors</h2>
          <p className="achievements-text">
            Since its creation in 1991, Kebbi State has been led by visionary
            individuals who contributed to the growth of the state.
          </p>
          <ul className="achievements-list">
            <li>
              <strong>Major General Patrick Aziza</strong> – Pioneer
              Administrator (1991–1992)
            </li>
            <li>
              <strong>Adamu Aliero</strong> – Civilian Governor (1999–2007)
            </li>
            <li>
              <strong>Saidu Dakingari</strong> – Governor (2007–2015)
            </li>
            <li>
              <strong>Atiku Bagudu</strong> – Governor (2015–2023)
            </li>
          </ul>
        </div>
      </section>

      {/* House of Reps */}
      <section id="house-of-reps" className="achievements-section">
        <div className="achievements-container">
          <h2 className="achievements-heading">
            Past House of Representatives Members
          </h2>
          <p className="achievements-text">
            The state has been represented by honorable members who contributed
            to national dialogue, lawmaking, and constituency development.
          </p>
          <ul className="achievements-list">
            <li>
              Hon. Sani Zorro – Advocated for rural development and press
              freedom
            </li>
            <li>
              Hon. Bello Dantani – Instrumental in youth empowerment bills
            </li>
            <li>
              Hon. Shehu Koko – Known for agricultural funding initiatives
            </li>
            <li>
              Other regional representatives across Yauri, Zuru, Argungu, and
              Birnin Kebbi zones
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AchievementsPage;
