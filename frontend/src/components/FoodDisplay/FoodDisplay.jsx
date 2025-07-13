// import React, { useEffect, useState } from "react";
// import "./FoodDisplay.css";
// import FoodItem from "../FoodItem/FoodItem";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// const FoodDisplay = ({ category, onSelectItem }) => {
//   const [menuItems, setMenuItems] = useState([]);
//   const { restaurantId } = useParams();

//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/menu/get`);
//         const filtered = res.data.filter(
//           (item) => String(item.owner) === String(restaurantId)
//         );
//         setMenuItems(filtered);
//       } catch (err) {
//         toast.error("Failed to fetch menu items");
//         console.error(err);
//       }
//     };

//     fetchMenuItems();
//   }, [restaurantId]);

//   const filteredItems =
//     category === "All"
//       ? menuItems
//       : menuItems.filter((item) => item.category === category);

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <FoodItem
//               key={item._id}
//               id={item._id}
//               name={item.name}
//               description={item.description}
//               price={item.price}
//               image={item.image}
//               onSelect={() =>
//                 onSelectItem({
//                   name: item.name,
//                   price:
//                     typeof item.price === "number"
//                       ? item.price
//                       : parseFloat(item.price),
//                   restaurantId: item.owner,
//                   quantity: 1,
//                 })
//               }
//             />
//           ))
//         ) : (
//           <p>No menu items found for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;
// 
// 
// 
// 
// 
// 
import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import toast from "react-hot-toast";
import axios from "axios";

const FoodDisplay = ({ category, onSelectItem }) => {
  const [menuItems, setMenuItems] = useState([]);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu/get`);
        setMenuItems(res.data);
      } catch (err) {
        toast.error("Failed to fetch menu items");
        console.error(err);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onSelect={() =>
                onSelectItem({
                  name: item.name,
                  price:
                    typeof item.price === "number"
                      ? item.price
                      : parseFloat(item.price),
                  restaurantId: item.owner,
                  quantity: 1,
                })
              }
            />
          ))
        ) : (
          <p>No menu items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
