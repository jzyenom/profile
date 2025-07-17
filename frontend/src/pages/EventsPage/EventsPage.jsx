// import React from "react";
// import "./EventsPage.css";

// const events = [
//   {
//     img: "action-2.jpg",
//     title: "Town Hall Meeting in Zuru",
//     text: "Governor Nasir Idris met with local leaders, farmers, and youth in Zuru to discuss community priorities and share the administration’s progress.",
//     date: "📅 April 21, 2025",
//   },
//   {
//     img: "education.jpeg",
//     title: "Education Reform Dialogue",
//     text: "Stakeholders from across the state joined the governor to discuss strategies for improving public school infrastructure and performance.",
//     date: "📅 March 12, 2025",
//   },
//   {
//     img: "action-3.jpg",
//     title: "Commissioning of New Road",
//     text: "The Governor commissioned the Birnin Kebbi–Argungu road project, aimed at boosting trade and ease of transportation in the region.",
//     date: "📅 February 6, 2025",
//   },
//   {
//     img: "action.jpg",
//     title: "Youth Empowerment Bootcamp",
//     text: "Young innovators and entrepreneurs gathered for a government-sponsored bootcamp promoting tech, agriculture, and small business growth.",
//     date: "📅 January 20, 2025",
//   },
//   {
//     img: "health.jpg",
//     title: "Free Medical Outreach in Yauri",
//     text: "Hundreds of residents received free medical consultation and medication as part of the governor’s rural health initiative.",
//     date: "📅 December 5, 2024",
//   },
//   {
//     img: "kaura.jpg",
//     title: "Kebbi Unity Day Celebration",
//     text: "The government hosted a state-wide celebration honoring cultural heritage and fostering peace among diverse communities.",
//     date: "📅 November 27, 2024",
//   },
// ];

// const EventsPage = () => {
//   return (
//     <main>
//       {/* Hero Banner */}
//       <section className="events-hero">
//         <div className="events-container">
//           <h1 className="events-title">Upcoming & Past Events</h1>
//           <p className="events-subtitle">
//             Track the engagements, town halls, and developmental projects led by
//             Governor Nasir Idris across Kebbi State.
//           </p>
//         </div>
//       </section>

//       {/* Events Grid */}
//       <section className="events-section">
//         <div className="events-container">
//           <h2 className="events-heading">Highlights of Engagements</h2>
//           <div className="events-grid">
//             {events.map((event, i) => (
//               <div className="events-card" key={i}>
//                 <img
//                   src={`./assets/images/${event.img}`}
//                   alt={event.title}
//                   className="events-card-img"
//                 />
//                 <div className="events-card-body">
//                   <h5 className="events-card-title">{event.title}</h5>
//                   <p className="events-card-text">{event.text}</p>
//                   <p className="events-card-date">{event.date}</p>
//                   <a href="#" className="events-read-more">
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default EventsPage;
//
//
//
//
//
//
//

import React, { useEffect, useState } from "react";
import { Loader2, PlusCircle, CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./EventsPage.css";

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/newsAndEvents/get`);
        const data = await res.json();
        const filtered = data.filter((item) => item.typeOfData === "events");
        setEvents(filtered.reverse());
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${API_URL}/newsAndEvents/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEvents((prevEvents) => prevEvents.filter((e) => e._id !== id));
      } else {
        console.error("Failed to delete event.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>
          <CalendarDays className="icon" /> Events
        </h1>
        <Link to="/dashboard/create-news-and-events" className="create-btn">
          <PlusCircle className="icon" />
          Create Event
        </Link>
      </div>

      {loading ? (
        <div className="loading">
          <Loader2 className="spinner" />
          <p>Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <img src={event.image} alt={event.title} className="event-img" />
              <div className="event-content">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p className="event-date">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
                <div className="event-actions">
                  <Link
                    to={`/dashboard/update-news-and-events/${event._id}`}
                    className="update-btn"
                  >
                    <Pencil size={16} />
                    Update
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
