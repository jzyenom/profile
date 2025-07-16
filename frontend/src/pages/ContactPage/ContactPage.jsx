import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <main>
      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Get in touch with Governor Nasir Idris'
            office for inquiries, feedback, or support.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container contact-grid">
          {/* Contact Form */}
          <div className="contact-form">
            <h2 className="contact-heading">Send a Message</h2>
            <form>
              <div className="form-group">
                <label className="form-label">Contacting As</label>
                <div className="radio-group">
                  <label className="radio-inline">
                    <input type="radio" name="contactType" value="Individual" defaultChecked />
                    Individual
                  </label>
                  <label className="radio-inline">
                    <input type="radio" name="contactType" value="Group" />
                    Group
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input type="number" id="phone" placeholder="+234-00000000" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lga">Local Government</label>
                <input type="text" id="lga" placeholder="Local Government" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ward">Ward</label>
                <input type="text" id="ward" placeholder="Your Ward" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>

              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="contact-heading">Contact Information</h2>
            <ul>
              <li>
                <strong>Office:</strong> Gwadan Gwaji Secretariat, Birnin Kebbi, Kebbi State
              </li>
              <li>
                <strong>Phone:</strong> +234 801 234 5678
              </li>
              <li>
                <strong>Email:</strong> info@kebbistate.gov.ng
              </li>
            </ul>

            <div className="map-responsive">
              <iframe
                src="https://maps.google.com/maps?q=Birnin%20Kebbi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                allowFullScreen
                title="Birnin Kebbi Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
