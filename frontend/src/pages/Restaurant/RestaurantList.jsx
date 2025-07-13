// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import "./RestaurantList.css"; // Add your own CSS
// import { useAuthStore } from "../../store/authStore";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const RestaurantList = ({ category }) => {
//   // const { loading } = useAuthStore();
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/restaurant/get`);
//         setRestaurants(res.data);
//         setLoading(false);
//       } catch (err) {
//         toast.error("Failed to fetch restaurants.");
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   const navigate = useNavigate();

//   // const handleViewRestaurant = (restaurantId) => {
//   //   // Redirect to restaurant details page
//   //   navigate(`/restaurant/${restaurantId}`);
//   // };

//   if (loading) {
//     return (
//       <div>
//         <LoadingSpinner />
//       </div>
//     ); // Or a loading spinner
//   }

//   return (
//     <div className="restaurant-list-container" id="menu">
//       <h2>All Restaurants</h2>
//       {restaurants.length === 0 ? (
//         <p>No restaurants found.</p>
//       ) : (
//         <div className="restaurant-list">
//           {restaurants.map((restaurant) => (
//             <Link
//               to={`/restaurant/${restaurant.owner}`}
//               className="restaurant-item"
//               key={restaurant._id}
//             >
//               <img
//                 src={restaurant.image}
//                 alt={restaurant.name}
//                 className="restaurant-image"
//               />
//               <div className="restaurant-info">
//                 <h3>{restaurant.name}</h3>
//                 <p>{restaurant.description}</p>
//                 <p>{restaurant.address}</p>
//                 <p>Rating: {restaurant.rating}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantList;
//
//
//
//
//
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./RestaurantList.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurant/get`);
        setRestaurants(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch restaurants.");
        setLoading(false);
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, []);

  const isRestaurantOpen = (openTimeStr, closeTimeStr) => {
    const now = new Date();

    const [openH, openM] = openTimeStr.split(":").map(Number);
    const [closeH, closeM] = closeTimeStr.split(":").map(Number);

    const open = new Date(now);
    open.setHours(openH, openM, 0, 0);

    let close = new Date(now);
    close.setHours(closeH, closeM, 0, 0);

    // Handle overnight shift (e.g., 22:00 to 03:00)
    if (close <= open) {
      // Move close to next day
      close.setDate(close.getDate() + 1);
      if (now < open) {
        // If now is before open time, it might be after midnight but still valid
        now.setDate(now.getDate() + 1);
      }
    }

    return now >= open && now < close;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="restaurant-list-container" id="menu">
      <h2>All Beef Sellers</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="restaurant-list">
          {restaurants.map((restaurant) => {
            const isOpen = isRestaurantOpen(
              restaurant.opentime,
              restaurant.closeTime
            );

            return (
              <Link
                to={`/restaurant/${restaurant.owner}`}
                className={`restaurant-item ${!isOpen ? "closed" : ""}`}
                key={restaurant._id}
              >
                <div className="restaurant-card">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.description}</p>
                    <p>{restaurant.address}</p>
                    <p>Rating: {restaurant.rating}</p>
                    <p>
                      Hours: {restaurant.opentime} - {restaurant.closeTime}
                    </p>
                  </div>
                  {!isOpen && (
                    <div className="closed-watermark">Closed for today</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
