// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuthStore } from "../../store/authStore";
// import "./InventoryPage.css";
// import Loader from "../../components/Loader/Loader";

// const InventoryPage = () => {
//   const { user } = useAuthStore();

//   const API_URL =
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5000/api"
//       : "/api";

//   const [inventory, setInventory] = useState([]);
//   const [restaurant, setRestaurant] = useState(null);
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [trackingItemId, setTrackingItemId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     quantity: "",
//     unit: "",
//     price: "",
//     category: "",
//     lowStockThreshold: "",
//     owner: user?._id,
//     restaurantId: "",
//   });

//   const [usageData, setUsageData] = useState({
//     name: "",
//     quantityUsed: "",
//   });

//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/restaurant/get`);
//         const ownedRestaurant = res.data.find(
//           (rest) => String(rest.owner) === String(user._id)
//         );

//         if (!ownedRestaurant) {
//           toast.error("No restaurant found for this user.");
//           return;
//         }

//         setRestaurant(ownedRestaurant);
//         setFormData((prev) => ({
//           ...prev,
//           restaurantId: ownedRestaurant._id,
//         }));

//         fetchInventory(ownedRestaurant._id);
//       } catch (err) {
//         toast.error("Failed to fetch restaurant.");
//         console.error(err);
//       }
//     };

//     if (user?._id) {
//       fetchRestaurant();
//     }
//   }, [user?._id]);

//   const fetchInventory = async (restaurantId) => {
//     try {
//       const res = await axios.get(`${API_URL}/inventory/${restaurantId}`, {
//         withCredentials: true,
//       });
//       setInventory(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch inventory.");
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUsageChange = (e) => {
//     setUsageData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       quantity: "",
//       unit: "",
//       price: "",
//       category: "",
//       lowStockThreshold: "",
//       owner: user?._id,
//       restaurantId: restaurant?._id || "",
//     });
//     setEditingItemId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingItemId) {
//       try {
//         await axios.put(`${API_URL}/inventory/${editingItemId}`, formData, {
//           withCredentials: true,
//         });
//         toast.success("Item updated successfully");
//         fetchInventory(formData.restaurantId);
//         resetForm();
//       } catch (err) {
//         toast.error("Failed to update item");
//         console.error(err);
//       }
//     } else {
//       try {
//         await axios.post(`${API_URL}/inventory/create`, formData, {
//           withCredentials: true,
//         });
//         toast.success("Item added successfully");
//         resetForm();
//         fetchInventory(formData.restaurantId);
//       } catch (err) {
//         toast.error("Failed to add item");
//         console.error(err);
//       }
//     }
//   };

//   const handleUsageSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const item = inventory.find((i) => i._id === trackingItemId);
//       const updatedQuantity =
//         Number(item.quantity) - Number(usageData.quantityUsed);

//       if (updatedQuantity < 0) {
//         toast.error("Cannot use more than available quantity.");
//         return;
//       }

//       const updatedItem = {
//         ...item,
//         quantity: updatedQuantity,
//       };

//       await axios.put(`${API_URL}/inventory/${trackingItemId}`, updatedItem, {
//         withCredentials: true,
//       });

//       toast.success("Item usage tracked successfully");
//       fetchInventory(item.restaurantId);
//       setTrackingItemId(null);
//       setUsageData({ name: "", quantityUsed: "" });
//     } catch (err) {
//       toast.error("Failed to track usage");
//       console.error(err);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       name: item.name,
//       quantity: item.quantity,
//       unit: item.unit,
//       price: item.price,
//       category: item.category,
//       lowStockThreshold: item.lowStockThreshold,
//       owner: user?._id,
//       restaurantId: restaurant?._id || "",
//     });
//     setEditingItemId(item._id);
//   };

//   const handleDelete = async (itemId) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     try {
//       await axios.delete(`${API_URL}/inventory/${itemId}`, {
//         withCredentials: true,
//       });
//       toast.success("Item deleted successfully");
//       fetchInventory(formData.restaurantId);
//       if (editingItemId === itemId) resetForm();
//     } catch (err) {
//       toast.error("Failed to delete item");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="inventory-container">
//       <h1 className="inventory-title">Inventory Management</h1>

//       {restaurant ? (
//         <>
//           {!trackingItemId && (
//             <form className="inventory-form" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Item Name"
//                 required
//               />
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 placeholder="Quantity"
//                 required
//               />
//               <input
//                 type="text"
//                 name="unit"
//                 value={formData.unit}
//                 onChange={handleChange}
//                 placeholder="Unit (kg, pcs, etc.)"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Price (₦)"
//                 required
//               />
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Category (e.g., Protein)"
//                 required
//               />
//               <input
//                 type="number"
//                 name="lowStockThreshold"
//                 value={formData.lowStockThreshold}
//                 onChange={handleChange}
//                 placeholder="Low Stock Threshold"
//               />
//               <button className="add-btn" type="submit">
//                 {editingItemId ? "Update Item" : "Add Item"}
//               </button>
//               {editingItemId && (
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={resetForm}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Cancel Edit
//                 </button>
//               )}
//             </form>
//           )}

//           {trackingItemId && (
//             <form className="usage-form" onSubmit={handleUsageSubmit}>
//               <h3>Track Item Usage</h3>
//               <input type="text" name="name" value={usageData.name} readOnly />
//               <input
//                 type="number"
//                 name="quantityUsed"
//                 value={usageData.quantityUsed}
//                 onChange={handleUsageChange}
//                 placeholder="Quantity Used"
//                 required
//               />
//               <input
//                 type="number"
//                 name="quantityUsed"
//                 value={usageData.quantityUsed}
//                 onChange={handleUsageChange}
//                 placeholder="Quantity Used"
//                 required
//               />
//               <button type="submit" className="use-btn">
//                 Use Item
//               </button>
//               <button
//                 type="button"
//                 className="cancel-btn"
//                 onClick={() => {
//                   setTrackingItemId(null);
//                   setUsageData({ name: "", quantityUsed: "" });
//                 }}
//               >
//                 Cancel
//               </button>
//             </form>
//           )}

//           <table className="inventory-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Qty</th>
//                 <th>Unit</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {inventory.map((item) => (
//                 <tr key={item._id}>
//                   <td data-label="Name">{item.name}</td>
//                   <td data-label="Qty">{item.quantity}</td>
//                   <td data-label="Unit">{item.unit}</td>
//                   <td data-label="Price">₦{item.price}</td>
//                   <td data-label="Category">{item.category}</td>
//                   <td
//                     data-label="Status"
//                     className={`status ${
//                       item.quantity <= item.lowStockThreshold
//                         ? "out-of-stock"
//                         : "in-stock"
//                     }`}
//                   >
//                     {item.quantity <= item.lowStockThreshold
//                       ? "Low Stock"
//                       : "In Stock"}
//                   </td>
//                   <td data-label="Actions">
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEdit(item)}
//                       style={{ marginRight: "6px" }}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(item._id)}
//                       style={{ marginRight: "6px" }}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="track-btn"
//                       onClick={() => {
//                         setTrackingItemId(item._id);
//                         setUsageData({ name: item.name, quantityUsed: "" });
//                       }}
//                     >
//                       Use
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p
//           style={{ textAlign: "center", marginTop: "2rem", fontWeight: "500" }}
//         >
//           <Loader />
//         </p>
//       )}
//     </div>
//   );
// };

// export default InventoryPage;
//
//
//
//
//
//
// ... [IMPORTS]

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import "./InventoryPage.css";
import Loader from "../../components/Loader/Loader";
import "./inventoryPage.css";

const InventoryPage = () => {
  const { user } = useAuthStore();

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const [inventory, setInventory] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [trackingItemId, setTrackingItemId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    price: "",
    category: "",
    lowStockThreshold: "",
    owner: user?._id,
    restaurantId: "",
  });

  // usageData will hold quantityUsed and totalCost; unitPrice is calculated dynamically
  const [usageData, setUsageData] = useState({
    name: "",
    quantityUsed: "",
    totalCost: "0.00",
  });

  // Store original quantity and price of the tracked item for calculation
  const [trackedItemDetails, setTrackedItemDetails] = useState({
    originalQuantity: 0,
    originalPrice: 0,
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurant/get`);
        const ownedRestaurant = res.data.find(
          (rest) => String(rest.owner) === String(user._id)
        );

        if (!ownedRestaurant) {
          toast.error("No restaurant found for this user.");
          return;
        }

        setRestaurant(ownedRestaurant);
        setFormData((prev) => ({
          ...prev,
          restaurantId: ownedRestaurant._id,
        }));

        fetchInventory(ownedRestaurant._id);
      } catch (err) {
        toast.error("Failed to fetch restaurant.");
        console.error(err);
      }
    };

    if (user?._id) {
      fetchRestaurant();
    }
  }, [user?._id]);

  const fetchInventory = async (restaurantId) => {
    try {
      const res = await axios.get(`${API_URL}/inventory/${restaurantId}`, {
        withCredentials: true,
      });
      setInventory(res.data);
    } catch (err) {
      toast.error("Failed to fetch inventory.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUsageChange = (e) => {
    const quantityUsed = e.target.value;
    if (!quantityUsed.match(/^\d*\.?\d*$/)) {
      // Prevent invalid number input
      return;
    }

    // Calculate unit price = originalPrice / originalQuantity
    const unitPrice =
      trackedItemDetails.originalQuantity > 0
        ? trackedItemDetails.originalPrice / trackedItemDetails.originalQuantity
        : 0;

    const usedQtyNum = parseFloat(quantityUsed);
    const totalCost =
      !isNaN(usedQtyNum) && usedQtyNum >= 0
        ? (usedQtyNum * unitPrice).toFixed(2)
        : "0.00";

    setUsageData({
      ...usageData,
      quantityUsed,
      totalCost,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      quantity: "",
      unit: "",
      price: "",
      category: "",
      lowStockThreshold: "",
      owner: user?._id,
      restaurantId: restaurant?._id || "",
    });
    setEditingItemId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingItemId) {
      try {
        await axios.put(`${API_URL}/inventory/${editingItemId}`, formData, {
          withCredentials: true,
        });
        toast.success("Item updated successfully");
        fetchInventory(formData.restaurantId);
        resetForm();
      } catch (err) {
        toast.error("Failed to update item");
        console.error(err);
      }
    } else {
      try {
        await axios.post(`${API_URL}/inventory/create`, formData, {
          withCredentials: true,
        });
        toast.success("Item added successfully");
        resetForm();
        fetchInventory(formData.restaurantId);
      } catch (err) {
        toast.error("Failed to add item");
        console.error(err);
      }
    }
  };

  const handleUsageSubmit = async (e) => {
    e.preventDefault();

    const item = inventory.find((i) => i._id === trackingItemId);
    if (!item) {
      toast.error("Tracked item not found");
      return;
    }

    const usedQtyNum = parseFloat(usageData.quantityUsed);
    if (isNaN(usedQtyNum) || usedQtyNum <= 0) {
      toast.error("Please enter a valid quantity used");
      return;
    }

    if (usedQtyNum > item.quantity) {
      toast.error("Cannot use more than available quantity.");
      return;
    }

    const updatedQuantity = item.quantity - usedQtyNum;

    try {
      // Update inventory quantity
      await axios.put(
        `${API_URL}/inventory/${trackingItemId}`,
        {
          ...item,
          quantity: updatedQuantity,
        },
        {
          withCredentials: true,
        }
      );

      // Create usage record
      await axios.post(
        `${API_URL}/usage/create`,
        {
          owner: user?._id,
          restaurantId: restaurant?._id || "",
          name: usageData.name,
          quantityUsed: usedQtyNum,
          totalCost: parseFloat(usageData.totalCost),
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Item usage tracked and usage recorded successfully");
      fetchInventory(item.restaurantId);
      setTrackingItemId(null);
      setUsageData({ name: "", quantityUsed: "", totalCost: "0.00" });
      setTrackedItemDetails({ originalQuantity: 0, originalPrice: 0 });
    } catch (err) {
      toast.error("Failed to track usage");
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      price: item.price,
      category: item.category,
      lowStockThreshold: item.lowStockThreshold,
      owner: user?._id,
      restaurantId: restaurant?._id || "",
    });
    setEditingItemId(item._id);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/inventory/${itemId}`, {
        withCredentials: true,
      });
      toast.success("Item deleted successfully");
      fetchInventory(formData.restaurantId);
      if (editingItemId === itemId) resetForm();
    } catch (err) {
      toast.error("Failed to delete item");
      console.error(err);
    }
  };

  const handleTrackUsageClick = (item) => {
    setTrackingItemId(item._id);
    setUsageData({
      name: item.name,
      quantityUsed: "",
      totalCost: "0.00",
    });
    setTrackedItemDetails({
      originalQuantity: parseFloat(item.quantity),
      originalPrice: parseFloat(item.price),
    });
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Inventory Management</h1>

      {restaurant ? (
        <>
          {!trackingItemId && (
            <form className="inventory-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
                required
              />
              <input
                type="number"
                step="any"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
                min="0"
              />
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit (kg, pcs, etc.)"
                required
              />
              <input
                type="number"
                step="any"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Total Price (₦)"
                required
                min="0"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (e.g., Protein)"
                required
              />
              <input
                type="number"
                step="any"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                placeholder="Low Stock Threshold"
                min="0"
              />
              <button className="add-btn" type="submit">
                {editingItemId ? "Update Item" : "Add Item"}
              </button>
              {editingItemId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          )}

          {trackingItemId && (
            <form className="usage-form" onSubmit={handleUsageSubmit}>
              <h3>Track Item Usage</h3>
              <input
                type="text"
                name="name"
                value={usageData.name}
                readOnly
                placeholder="Item Name"
              />
              <input
                type="number"
                step="any"
                name="quantityUsed"
                value={usageData.quantityUsed}
                onChange={handleUsageChange}
                placeholder="Quantity Used"
                required
                min="0"
                max={trackedItemDetails.originalQuantity}
              />
              <input
                type="text"
                name="totalCost"
                value={usageData.totalCost}
                readOnly
                placeholder="Total Cost (₦)"
              />
              <button
                onClick={handleUsageSubmit}
                type="submit"
                className="use-btn"
              >
                Use Item
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setTrackingItemId(null);
                  setUsageData({
                    name: "",
                    quantityUsed: "",
                    totalCost: "0.00",
                  });
                  setTrackedItemDetails({
                    originalQuantity: 0,
                    originalPrice: 0,
                  });
                }}
              >
                Cancel
              </button>
            </form>
          )}

          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price (₦)</th>
                <th>Category</th>
                <th>Low Stock Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No inventory items found.
                  </td>
                </tr>
              )}
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.lowStockThreshold || "N/A"}</td>
                  <td
                    style={{
                      color:
                        item.quantity <= (item.lowStockThreshold || 0)
                          ? "red"
                          : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.quantity <= (item.lowStockThreshold || 0)
                      ? "Low Stock"
                      : "In Stock"}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="track-btn"
                      onClick={() => handleTrackUsageClick(item)}
                    >
                      Track Usage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default InventoryPage;
