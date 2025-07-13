import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Facebook, Instagram, LinkedinIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato.com Logo" />
          <p>
            At Cornerstone Beef, we're passionate about delivering fresh,
            premium beef to your home or business. From tender premium cuts to
            hearty stew packs and soup bones, we supply only the finest quality
            beef with every order. Join countless satisfied customers who trust
            us for excellence, freshness, and unbeatable flavor — delivered
            straight to your doorstep.
          </p>
          <div className="center">
            <div className="footer-social-icons">
              <a href="www.facebook.com">
                <Facebook />
              </a>
              <a href="www.x.com">
                <TwitterIcon />
              </a>
              <a href="www.linkedin.com">
                <LinkedinIcon />
              </a>
              <a href="www.instagram.com">
                <Instagram />
              </a>
              {/* <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" /> */}
            </div>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>OUR COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Menu</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
            <li>123 Tomato St, New York, NY</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
