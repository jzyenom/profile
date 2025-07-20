
import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import { toast } from "react-hot-toast";

const Cart = () => {
  if (!sessionStorage.getItem("hasRefreshed")) {
    sessionStorage.setItem("hasRefreshed", "true");
    window.location.reload();
  }

  const { cartItems, foodList, removeFromCart, clearCart } =
    useContext(StoreContext);

  const navigate = useNavigate();
  // const API_URL =
  //   import.meta.env.MODE === "development"
  //     ? "http://localhost:5000/api"
  //     : "/api";
  const API_URL = "https://api-kebbi-government-profile.onrender.com";

  useEffect(() => {
    console.log("cartItems: ", cartItems);
  }, [cartItems]);

  if (
    !foodList ||
    foodList.length === 0 ||
    Object.keys(cartItems).length === 0
  ) {
    return (
      <div className="cart">
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  // Group cart items by restaurantId
  const groupedCart = {};
  for (const itemId in cartItems) {
    const item = cartItems[itemId];
    const restaurantId = item.restaurantId;
    if (!groupedCart[restaurantId]) {
      groupedCart[restaurantId] = [];
    }
    const food = foodList.find((f) => f._id === itemId);
    if (food) {
      groupedCart[restaurantId].push({ ...food, quantity: item.quantity });
    }
  }

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (restaurantId, items) => {
    navigate(`/order/${restaurantId}`);
    // const orderItems = items.map((item) => ({
    //   id: item._id,
    //   name: item.name,
    //   quantity: item.quantity,
    //   price: item.price,
    // }));

    // try {
    //   const response = await axios.post(`${API_URL}/api/order/create`, {
    //     restaurantId,
    //     items: orderItems,
    //   });

    //   if (response.data.success) {
    //     toast.success("Order placed successfully!");
    //     clearCart(restaurantId); // Clear only this restaurant's items
    //   } else {
    //     throw new Error("Order not successful");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Failed to place order.");
    // }
  };

  return (
    <div className="cart">
      {Object.entries(groupedCart).map(([restaurantId, items]) => (
        <div key={restaurantId} className="cart-section">
          {/* <h2>Restaurant: {restaurantId}</h2> */}
          <h2>Things in your cart</h2>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {items.map((item) => (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>
                    <span>&#8358;</span>
                    {item.price}
                  </p>
                  <p>{item.quantity}</p>
                  <p>
                    <span>&#8358;</span>
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h3>Total summation before checkout</h3>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>
                  <span>&#8358;</span>
                  {calculateTotal(items).toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>
                  <span>&#8358;</span>500.00
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  <span>&#8358;</span>
                  {(calculateTotal(items) + 500).toFixed(2)}
                </b>
              </div>
              <button onClick={() => handlePlaceOrder(restaurantId, items)}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
