import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useAuthStore } from "../../store/authStore";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";

const DELIVERY_FEE = 1000;

const PlaceOrder = () => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { clearCart } = useContext(StoreContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "jamesothniel7@gmail.com",
    userRef: user?._id,
  });

  const [validatedCart, setValidatedCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    const validateCart = async () => {
      const raw = localStorage.getItem("cartItems");
      if (!raw) return setLoading(false);

      const cart = JSON.parse(raw);
      const itemIds = Object.keys(cart);
      if (itemIds.length === 0) return setLoading(false);

      try {
        const res = await fetch(`${API_URL}/menu/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemIds }),
        });

        if (!res.ok) {
          throw new Error("Failed to validate cart items");
        }

        const data = await res.json();
        const { validItems, invalidItemIds } = data;

        const groupedCart = {};
        validItems.forEach((item) => {
          const original = cart[item._id];
          if (!groupedCart[item.restaurantId]) {
            groupedCart[item.restaurantId] = {};
          }
          groupedCart[item.restaurantId][item._id] = {
            ...original,
            name: item.name,
            price: item.price,
          };
        });

        if (invalidItemIds.length > 0) {
          invalidItemIds.forEach((id) => {
            delete cart[id];
          });
          localStorage.setItem("cartItems", JSON.stringify(cart));
        }

        if (Object.keys(groupedCart).length === 0) {
          setErrorMessage(
            "Cart validation failed. All items have been removed or are invalid."
          );
          localStorage.removeItem("cartItems");
        } else {
          setValidatedCart(groupedCart);
        }
      } catch (err) {
        console.error("Validation error:", err);
        setErrorMessage("Something went wrong during cart validation.");
      }

      setLoading(false);
    };

    validateCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = (items) => {
    return Object.values(items).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const handlePaymentSuccess = async (restaurantId, orderData) => {
    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order placement failed");

      const currentCart = JSON.parse(localStorage.getItem("cartItems") || "{}");
      const updatedCart = Object.fromEntries(
        Object.entries(currentCart).filter(
          ([_, item]) => item.restaurantId !== restaurantId
        )
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      clearCart(restaurantId);

      const updatedValidatedCart = { ...validatedCart };
      delete updatedValidatedCart[restaurantId];
      setValidatedCart(updatedValidatedCart);

      setForm({ name: "", phone: "", email: "", address: "" });

      setTimeout(() => {
        window.location.reload();
      }, 200);

      navigate(user?._id ? "/all-orders" : "/order-success");
    } catch (err) {
      console.error("Order placement error:", err);
      alert("There was a problem placing your order.");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Validating cart...</p>;
  if (errorMessage)
    return (
      <p style={{ padding: "2rem", color: "red", fontWeight: "bold" }}>
        {errorMessage}
      </p>
    );

  return (
    <form className="place-order" onSubmit={(e) => e.preventDefault()}>
      <div className="place-order-left">
        <h2 className="title">Delivery Details</h2>
        <input
          name="name"
          type="text"
          placeholder="Your Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          type="text"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="WhatsApp Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="place-order-right">
        {Object.entries(validatedCart).map(([restaurantId, items]) => {
          const subtotal = calculateSubtotal(items);
          const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE;
          const total = subtotal + deliveryFee;

          const orderItems = Object.entries(items).map(([itemId, item]) => ({
            itemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }));

          const orderData = {
            ...form,
            items: orderItems,
            restaurantId,
            isGuest: true,
            total,
          };

          const componentProps = {
            email: form.email,
            amount: total * 100,
            metadata: {
              name: form.name,
              phone: form.phone,
            },
            publicKey,
            text: "Pay Now",
            onSuccess: () => handlePaymentSuccess(restaurantId, orderData),
            onClose: () =>
              alert("Transaction was not completed. Please try again."),
          };

          return (
            <div key={restaurantId} className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Total</h2>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>
                    <span>&#8358;</span>
                    {subtotal}
                  </p>
                </div>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>
                    <span>&#8358;</span>
                    {deliveryFee}
                  </p>
                </div>
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    <span>&#8358;</span>
                    {total}
                  </b>
                </div>
                <PaystackButton
                  {...componentProps}
                  className="paystack-button"
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default PlaceOrder;
