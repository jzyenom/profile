// import React from "react";
// import "./ExploreMenu.css";
// import { menu_list } from '../../assets/assets'

// const ExploreMenu = ({ category, setCategory }) => {
//   return (
//     <div className="explore-menu" id="explore-menu">
//       <h1>Explore our menu</h1>
//       <p className="explore-menu-text">
//         Choose from a diverse menu featuring a delectable array of dishes. Our
//         mission is to satisfy your cravings and elevate your dining experience,
//         one delicious meal at a time.
//       </p>
//       <div className="explore-menu-list">
//         {menu_list.map((item, index) => {
//           return (
//             <div
//               onClick={() =>
//                 setCategory((prev) =>
//                   prev === item.menu_name ? "All" : item.menu_name
//                 )
//               }
//               key={index}
//               className="explore-menu-list-item"
//             >
//               <img
//                 className={category === item.menu_name ? "active" : ""}
//                 src={item.menu_image}
//                 alt=""
//               />
//               <p>{item.menu_name}</p>
//             </div>
//           );
//         })}
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default ExploreMenu;
// 
// 
// 
// 
// 
import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axios from "axios";
import toast from "react-hot-toast";

const ExploreMenu = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/get`);
        setCategories(res.data);
      } catch (err) {
        toast.error("Failed to fetch categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        <div
          onClick={() => setCategory("All")}
          className="explore-menu-list-item"
        >
          <img
            className={category === "All" ? "active" : ""}
            src="https://cdn-icons-png.flaticon.com/512/1239/1239711.png" // A generic "All" icon; you can replace this with any custom image
            alt="All"
          />
          <p>All</p>
        </div>

        {categories.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              setCategory((prev) =>
                prev === item.name ? "All" : item.name
              )
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item.name ? "active" : ""}
              src={item.image}
              alt={item.name}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
