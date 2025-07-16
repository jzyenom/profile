import React, { useEffect } from "react";
import "./HistoryPage.css";

const HistoryPage = () => {


  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location]);

  return (
    <main className="history-main">
      {/* Hero Banner */}
      <section className="history-hero">
        <div className="history-container text-center text-white">
          <h1 className="history-title">History of Kebbi State</h1>
          <p className="history-subtitle">
            Explore the roots, people, faith, and economy that shape our state.
          </p>
        </div>
      </section>

      {/* The Land */}
      <section id="the-land" className="history-section">
        <div className="history-container">
          <h2 className="history-heading">The Land</h2>
          <p className="history-text">
            Kebbi State is located in northwestern Nigeria and shares a border with Niger Republic. 
            Known for its vast fertile plains, rivers (notably the River Niger), and rolling savannahs, 
            the land supports robust agricultural activities. From the floodplains of Argungu to the 
            Sahelian stretches near Dandi, Kebbi’s geography is as diverse as it is rich in potential.
          </p>
        </div>
      </section>

      {/* People of Sokoto */}
      <section id="people" className="history-section bg-light">
        <div className="history-container">
          <h2 className="history-heading">People of Sokoto</h2>
          <p className="history-text">
            The people of Kebbi are predominantly Hausa and Fulani, with deep cultural and ancestral 
            ties to the ancient Sokoto Caliphate. Their values of hospitality, communal living, and 
            religious devotion form the social fabric of the region. Traditional leaders still play 
            a vital role in conflict resolution, cultural preservation, and community cohesion.
          </p>
        </div>
      </section>

      {/* Religion */}
      <section id="religion" className="history-section">
        <div className="history-container">
          <h2 className="history-heading">Religion</h2>
          <p className="history-text">
            Islam is the dominant religion in Kebbi State, practiced by the vast majority of the population. 
            It influences governance, education, and daily life. However, the state is also home to 
            smaller communities of Christians and adherents of traditional faiths, living in peaceful coexistence.
          </p>
        </div>
      </section>

      {/* The Economy */}
      <section id="economy" className="history-section bg-light">
        <div className="history-container">
          <h2 className="history-heading">The Economy</h2>
          <p className="history-text">
            Kebbi’s economy is heavily reliant on agriculture, with rice, millet, sorghum, and fishing being 
            major livelihoods. The Argungu Fishing Festival reflects this deep connection to aquatic resources. 
            Recent years have also seen efforts to boost agro-processing, small businesses, and regional trade.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HistoryPage;
