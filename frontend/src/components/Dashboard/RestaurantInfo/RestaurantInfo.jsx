import { useEffect, useState } from "react";
import "./RestaurantInfo.css";

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const RestaurantInfo = ({ user, restaurant, setRestaurant }) => {
  // const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${API_URL}/restaurant/get`);
        const data = await res.json();

        const ownedRestaurant = data.find((r) => r.owner === user._id);
        if (ownedRestaurant) {
          setRestaurant(ownedRestaurant);
        }
      } catch (err) {
        console.error("Failed to fetch restaurant", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchRestaurant();
    }
  }, [user]);

  if (loading) return <p>Loading restaurant info...</p>;
  if (!restaurant) return <p>No shop found for this user.</p>;

  return (
    <div className="restaurant-info-card">
      <h2>Beef Seller Details</h2>
      <div className="restaurant-info-grid">
        <div className="restaurant-text">
          <p>
            <strong>Name:</strong> {restaurant.name}
          </p>
          <p>
            <strong>Description:</strong> {restaurant.description}
          </p>
        </div>
        {restaurant.image && (
          <div className="restaurant-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
