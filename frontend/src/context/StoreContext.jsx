import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  // const API_URL = "https://api-kebbi-government-profile.onrender.com";

  // Fetch food list manually when requested
  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/menu/get`);
      if (!response.ok) throw new Error("Failed to fetch food list");
      const data = await response.json();
      setFoodList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    if (!foodList || foodList.length === 0) {
      console.warn("Food list is empty. Cannot add item to cart.");
      return;
    }

    const itemInfo = foodList.find((item) => item._id === itemId);
    if (!itemInfo) {
      console.warn("Item not found in food list.");
      return;
    }

    setCartItems((prev) => {
      const existing = prev[itemId];
      return {
        ...prev,
        [itemId]: existing
          ? { ...existing, quantity: existing.quantity + 1 }
          : {
              name: itemInfo.name,
              price: itemInfo.price,
              restaurantId: itemInfo.owner,
              quantity: 1,
            },
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;

      updated[itemId].quantity -= 1;
      if (updated[itemId].quantity <= 0) delete updated[itemId];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const clearCart = (restaurantId = null) => {
    if (restaurantId) {
      setCartItems((prev) => {
        const updated = { ...prev };
        for (let key in updated) {
          if (updated[key].restaurantId === restaurantId) {
            delete updated[key];
          }
        }
        return updated;
      });
    } else {
      setCartItems({});
    }
  };

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    fetchFoodList, // ✅ expose fetch
    loading,
    error,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
//
//
//
//
//
// import React, { createContext, useState, useEffect } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : {};
//   });

//   const [foodList, setFoodList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   // ✅ Fetch food list on startup
//   useEffect(() => {
//     fetchFoodList();
//   }, []);

//   // ✅ Fetch food list from API
//   const fetchFoodList = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/menu/get`);
//       if (!response.ok) throw new Error("Failed to fetch food list");
//       const data = await response.json();
//       console.log("Fetched food list:", data); // Debugging log
//       setFoodList(data);
//     } catch (err) {
//       console.error("Error fetching food list:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Persist cart in localStorage
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ Add to cart
//   const addToCart = (itemId) => {
//     if (!foodList || foodList.length === 0) {
//       console.warn("Food list is empty. Cannot add item to cart.");
//       return;
//     }

//     const itemInfo = foodList.find((item) => item._id === itemId);
//     if (!itemInfo) {
//       console.warn("Item not found in food list.");
//       return;
//     }

//     setCartItems((prev) => {
//       const existing = prev[itemId];
//       return {
//         ...prev,
//         [itemId]: existing
//           ? { ...existing, quantity: existing.quantity + 1 }
//           : {
//               name: itemInfo.name,
//               price: itemInfo.price,
//               restaurantId: itemInfo.owner,
//               quantity: 1,
//             },
//       };
//     });
//   };

//   // ✅ Remove from cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const updated = { ...prev };
//       if (!updated[itemId]) return prev;

//       updated[itemId].quantity -= 1;
//       if (updated[itemId].quantity <= 0) delete updated[itemId];
//       return updated;
//     });
//   };

//   // ✅ Calculate total
//   const getTotalCartAmount = () => {
//     return Object.values(cartItems).reduce(
//       (sum, item) => sum + parseFloat(item.price) * item.quantity,
//       0
//     );
//   };

//   // ✅ Clear cart (optional by restaurant)
//   const clearCart = (restaurantId = null) => {
//     if (restaurantId) {
//       setCartItems((prev) => {
//         const updated = { ...prev };
//         for (let key in updated) {
//           if (updated[key].restaurantId === restaurantId) {
//             delete updated[key];
//           }
//         }
//         return updated;
//       });
//     } else {
//       setCartItems({});
//     }
//   };

//   const contextValue = {
//     foodList,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     clearCart,
//     fetchFoodList,
//     loading,
//     error,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
