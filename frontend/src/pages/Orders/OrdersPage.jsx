import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, User, Store, ShoppingCart, Phone, Search } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import "./OrdersPage.css";

const OrdersPage = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api";

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/order/get-all`, {
        credentials: "include",
      });
      const data = await res.json();

      let filteredOrders = [];

      if (user.role === "guest") {
        filteredOrders = data.filter((order) => order.userRef === user._id);
      } else if (user.role === "restaurantOwner") {
        filteredOrders = data.filter(
          (order) => order.restaurantId === user._id
        );
      } else if (user.role === "admin") {
        filteredOrders = data;
      }

      setOrders(filteredOrders);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/order/update/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge status-pending";
      case "preparing":
        return "status-badge status-preparing";
      case "delivered":
        return "status-badge status-delivered";
      case "cancelled":
        return "status-badge status-cancelled";
      default:
        return "status-badge";
    }
  };

  const applyFilters = () => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesSearch =
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order._id.includes(searchQuery);

      return matchesStatus && matchesSearch;
    });
  };

  const groupOrdersByDate = (ordersList) => {
    const groups = {};

    ordersList.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
    });

    return groups;
  };

  const filteredOrders = applyFilters();

  return (
    <motion.div
      className="orders-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="orders-title">Orders</h2>

      {(user.role === "admin" || user.role === "restaurantOwner") && (
        <div className="filter-bar">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="search-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, phone or order ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
      ) : (
        Object.entries(groupOrdersByDate(filteredOrders))
          .sort(([a], [b]) => new Date(b) - new Date(a))
          .map(([date, group]) => (
            <div key={date} className="daily-group">
              <h3 className="date-heading">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>

              {group
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <motion.div
                    key={order._id}
                    className="order-card"
                    whileHover={{ scale: 1.02 }}
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <table className="order-table">
                      <tbody>
                        <tr className="order-info">
                          <td className="icon-cell">
                            <FileText size={18} />
                          </td>
                          <td className="label-cell">Order ID:</td>
                          <td className="value-cell">{order._id}</td>
                        </tr>
                        <tr className="order-info">
                          <td className="icon-cell">
                            <User size={18} />
                          </td>
                          <td className="label-cell">Name:</td>
                          <td className="value-cell">{order.name}</td>
                        </tr>
                        <tr className="order-info">
                          <td className="icon-cell">
                            <Phone size={18} />
                          </td>
                          <td className="label-cell">Phone:</td>
                          <td className="value-cell">{order.phone}</td>
                        </tr>
                        <tr className="order-info">
                          <td className="icon-cell">
                            <Store size={18} />
                          </td>
                          <td className="label-cell">Beef Seller ID:</td>
                          <td className="value-cell">{order.restaurantId}</td>
                        </tr>
                        <tr className="order-info">
                          <td />
                          <td className="label-cell">Status:</td>
                          <td className="value-cell">
                            <span className={getStatusClass(order.status)}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                        <tr className="order-info">
                          <td />
                          <td className="label-cell">Total:</td>
                          <td className="value-cell">
                            ₦
                            {order.items
                              .reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={3}>
                            <h4 className="items-title">
                              <ShoppingCart size={16} /> Items Ordered:
                            </h4>
                            <table className="items-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Price</th>
                                  <th>Qty</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, idx) => (
                                  <tr key={idx}>
                                    <td>{item.name}</td>
                                    <td>₦{item.price}</td>
                                    <td>{item.quantity}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {(user.role === "admin" ||
                          user.role === "restaurantOwner") && (
                          <tr>
                            <td colSpan={3} className="update-section">
                              <label
                                htmlFor={`status-${order._id}`}
                                className="status-label"
                              >
                                Update Status:
                              </label>
                              <select
                                id={`status-${order._id}`}
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(
                                    order._id,
                                    e.target.value
                                  )
                                }
                                className="status-select"
                              >
                                <option value="pending">Pending</option>
                                <option value="preparing">Preparing</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </motion.div>
                ))}
            </div>
          ))
      )}
    </motion.div>
  );
};

export default OrdersPage;
