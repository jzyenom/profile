import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="gov-navbar">
      <div className="gov-container">
        <nav className="gov-nav">
          <Link className="gov-brand" to="/">
            Governor Nasir Idris
          </Link>

          <button
            className="gov-toggler"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle navigation"
          >
            <span className="gov-toggler-icon"></span>
          </button>

          <div className={`gov-collapse ${isNavOpen ? "open" : ""}`}>
            <ul className="gov-menu">
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>

              <li className="gov-dropdown">
                <Link to="/projects" className="span">
                  Projects
                </Link>
                <ul className="gov-dropdown-menu">
                  <li>
                    <Link to="/projects#completed">Completed</Link>
                  </li>
                  <li>
                    <Link to="/projects#ongoing">Ongoing</Link>
                  </li>
                  <li>
                    <Link to="/projects#proposed">Proposed</Link>
                  </li>
                </ul>
              </li>

              {/* <li className="gov-dropdown">
                <span>Government</span>
                <ul className="gov-dropdown-menu">
                  <li>
                    <Link to="#">Executives</Link>
                  </li>
                  <li>
                    <Link to="#">Judiciary</Link>
                  </li>
                  <li>
                    <Link to="#">Legislature</Link>
                  </li>
                  <li>
                    <Link to="#">MDA’s</Link>
                  </li>
                  <li>
                    <Link to="#">Local Governments</Link>
                  </li>
                </ul>
              </li> */}

              <li className="gov-dropdown">
                <Link to="/history" className="span">
                  History
                </Link>
                <ul className="gov-dropdown-menu">
                  <li>
                    <Link to="/history#the-land">The Land</Link>
                  </li>
                  <li>
                    <Link to="/history#people">People of Sokoto</Link>
                  </li>
                  <li>
                    <Link to="/history#religion">Religion</Link>
                  </li>
                  <li>
                    <Link to="/history#economy">The Economy</Link>
                  </li>
                </ul>
              </li>

              <li className="gov-dropdown">
                <span>Achievements</span>
                <ul className="gov-dropdown-menu">
                  <li>
                    <Link to="#">Media</Link>
                  </li>
                  <li>
                    <Link to="#">Past Governors</Link>
                  </li>
                  <li>
                    <Link to="#">Past House of Reps</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
