// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
// import "./RestaurantPage.css";

// const RestaurantPage = () => {
//   const [category, setCategory] = useState("All");
//   const { restaurantId } = useParams();
//   const [restaurant, setRestaurant] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   useEffect(() => {
//     const fetchRestaurantAndCategories = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/restaurant/get-owner/${restaurantId}`
//         );
//         setRestaurant(res.data);

//         const catRes = await axios.get(`${API_URL}/category/get`);
//         const restaurantCategories = catRes.data.filter(
//           (cat) => String(cat.restaurantId) === String(restaurantId)
//         );
//         setCategories(restaurantCategories);
//       } catch (err) {
//         toast.error("Failed to load restaurant or categories");
//         console.error(err);
//       }
//     };

//     fetchRestaurantAndCategories();
//   }, [restaurantId]);

//   const handleSelectItem = (item) => {
//     // Sanitize item before storing
//     const sanitizedItem = {
//       _id: item._id,
//       name: item.name,
//       price:
//         typeof item.price === "number"
//           ? item.price
//           : typeof item.price === "string"
//           ? parseFloat(item.price) || 0
//           : 0,
//       restaurantId: item.restaurantId,
//       quantity: item.quantity || 1,
//     };

//     setSelectedItems((prev) => {
//       const exists = prev.find((i) => i._id === sanitizedItem._id);
//       return exists
//         ? prev.filter((i) => i._id !== sanitizedItem._id)
//         : [...prev, sanitizedItem];
//     });
//   };

//   if (!restaurant) return <div className="loading">Loading...</div>;

//   return (
//     <div className="restaurant-page">
//       <div className="restaurant-header">
//         <img
//           src={restaurant.image}
//           alt={restaurant.name}
//           className="restaurant-cover"
//         />
//         <div className="restaurant-info">
//           <h1>{restaurant.name}</h1>
//           <p>{restaurant.description}</p>
//         </div>
//       </div>

//       <h1>Explore our menu</h1>
//       <p className="explore-menu-text">
//         Choose from a diverse menu featuring a delectable array of dishes. Our
//         mission is to satisfy your cravings and elevate your dining experience,
//         one delicious meal at a time.
//       </p>

//       <div className="category-slider">
//         <div
//           className={`category-card ${category === "All" ? "active" : ""}`}
//           onClick={() => setCategory("All")}
//         >
//           <img src="/assets/all.png" alt="All" />
//           <p>All</p>
//         </div>
//         {categories.length > 0 ? (
//           categories.map((cat) => (
//             <div
//               className={`category-card ${
//                 category === cat.name ? "active" : ""
//               }`}
//               key={cat._id}
//               onClick={() => setCategory(cat.name)}
//             >
//               <img src={cat.image || "/placeholder.png"} alt={cat.name} />
//               <p>{cat.name}</p>
//             </div>
//           ))
//         ) : (
//           <p>No categories found for this restaurant.</p>
//         )}
//       </div>

//       <FoodDisplay
//         category={category}
//         setCategory={setCategory}
//         onSelectItem={handleSelectItem}
//         restaurantId={restaurantId}
//       />

//       {selectedItems.length > 0 && (
//         <div className="selected-items">
//           <h3>Selected Items</h3>
//           <ul>
//             {selectedItems.map((item, i) => (
//               <li key={i}>
//                 {item.name} - ₦{item.price.toFixed(2)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantPage;
//
//
//
//
//
//
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./RestaurantPage.css";
import { Loader } from "lucide-react";

const RestaurantPage = () => {
  const [category, setCategory] = useState("All");
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    const fetchRestaurantAndCategories = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/restaurant/get-owner/${restaurantId}`
        );
        setRestaurant(res.data);

        const catRes = await axios.get(`${API_URL}/category/get`);
        const restaurantCategories = catRes.data.filter(
          (cat) => String(cat.restaurantId) === String(restaurantId)
        );
        setCategories(restaurantCategories);

        // Check if restaurant is open
        const now = new Date();
        const [openH, openM] = res.data.opentime.split(":").map(Number);
        const [closeH, closeM] = res.data.closeTime.split(":").map(Number);
        const open = new Date(now);
        const close = new Date(now);
        open.setHours(openH, openM, 0, 0);
        close.setHours(closeH, closeM, 0, 0);

        if (open.getTime() === close.getTime()) {
          setIsOpen(false);
        } else if (close <= open) {
          // Overnight hours
          const closeTomorrow = new Date(open);
          closeTomorrow.setDate(closeTomorrow.getDate() + 1);
          closeTomorrow.setHours(closeH, closeM, 0, 0);
          setIsOpen(now >= open || now < closeTomorrow);
        } else {
          // Same day
          setIsOpen(now >= open && now < close);
        }
      } catch (err) {
        toast.error("Failed to load restaurant or categories");
        console.error(err);
      }
    };

    fetchRestaurantAndCategories();
  }, [restaurantId]);

  const handleSelectItem = (item) => {
    const sanitizedItem = {
      _id: item._id,
      name: item.name,
      price:
        typeof item.price === "number"
          ? item.price
          : typeof item.price === "string"
          ? parseFloat(item.price) || 0
          : 0,
      restaurantId: item.restaurantId,
      quantity: item.quantity || 1,
    };

    setSelectedItems((prev) => {
      const exists = prev.find((i) => i._id === sanitizedItem._id);
      return exists
        ? prev.filter((i) => i._id !== sanitizedItem._id)
        : [...prev, sanitizedItem];
    });
  };

  if (!restaurant)
    return (
      <div>
        <Loader className="loader-icon" />
      </div>
    );

  return (
    <div className="restaurant-page">
      <div className="restaurant-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-cover"
        />
        <div className="restaurant-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          {!isOpen && (
            <div className="closed-notice">We are closed for today</div>
          )}
        </div>
      </div>

      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <div className="category-slider">
        <div
          className={`category-card ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <img src="/assets/all.png" alt="All" />
          <p>All</p>
        </div>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              className={`category-card ${
                category === cat.name ? "active" : ""
              }`}
              key={cat._id}
              onClick={() => setCategory(cat.name)}
            >
              <img src={cat.image || "/placeholder.png"} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))
        ) : (
          <p>No categories found for this restaurant.</p>
        )}
      </div>

      <FoodDisplay
        category={category}
        setCategory={setCategory}
        onSelectItem={handleSelectItem}
        restaurantId={restaurantId}
      />

      {selectedItems.length > 0 && (
        <div className="selected-items">
          <h3>Selected Items</h3>
          <ul>
            {selectedItems.map((item, i) => (
              <li key={i}>
                {item.name} - ₦{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
