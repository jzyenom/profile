import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import RestaurantLists from "../Restaurant/RestaurantList.jsx";
import AllMenus from "../../components/All-Menus/AllMenus.jsx";

const Homepage = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* <Header /> */}
      {/* SHOW RESTAURANTS LISTNG AND LET THE USER CHOOSE FROM A PARTICULAR RESTAURANT */}
      {/* <RestaurantLists category={category} /> */}

      {/* SHOW JUST MENUS AND LET USERS CHOOSE BASED ON CATEGORY */}
      <AllMenus  category={category}  />
      {/* <FoodDisplay category={category} /> */}

      {/*  */}
      {/* <ExploreMenu category={category} setCategory={setCategory} />

      <FoodDisplay category={category} /> */}
      {/* <AppDownload /> */}
    </div>
  );
};

export default Homepage;
