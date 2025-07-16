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
                <a href="#portfolio">Portfolio</a>
              </li>

              <li className="gov-dropdown">
                <span>Projects</span>
                <ul className="gov-dropdown-menu">
                  <li><a href="#">Completed</a></li>
                  <li><a href="#">Ongoing</a></li>
                  <li><a href="#">Proposed</a></li>
                </ul>
              </li>

              <li className="gov-dropdown">
                <span>Government</span>
                <ul className="gov-dropdown-menu">
                  <li><a href="#">Executives</a></li>
                  <li><a href="#">Judiciary</a></li>
                  <li><a href="#">Legislature</a></li>
                  <li><a href="#">MDA’s</a></li>
                  <li><a href="#">Local Governments</a></li>
                </ul>
              </li>

              <li className="gov-dropdown">
                <span>History</span>
                <ul className="gov-dropdown-menu">
                  <li><a href="#">The Land</a></li>
                  <li><a href="#">People of Sokoto</a></li>
                  <li><a href="#">Religion</a></li>
                  <li><a href="#">The Economy</a></li>
                </ul>
              </li>

              <li className="gov-dropdown">
                <span>Achievements</span>
                <ul className="gov-dropdown-menu">
                  <li><a href="#">Media</a></li>
                  <li><a href="#">Past Governors</a></li>
                  <li><a href="#">Past House of Reps</a></li>
                </ul>
              </li>

              <li><Link to="/news">News</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
