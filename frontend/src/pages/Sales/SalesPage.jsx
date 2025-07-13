import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./SalesPage.css";

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const SalesPage = () => {
  const { user } = useAuthStore();

  const [sales, setSales] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [form, setForm] = useState({
    itemName: "",
    quantitySold: "",
    unitPrice: "",
    totalAmount: "",
    dateOfSale: "",
    paymentMethod: "",
    customerName: "",
    notes: "",
    owner: user?._id || "",
    restaurantId: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurant/get`);
        const allRestaurants = res.data;

        const ownedRestaurant = allRestaurants.find(
          (rest) => String(rest.owner) === String(user._id)
        );

        if (!ownedRestaurant) {
          toast.error("No restaurant found for this user.");
          return;
        }

        setRestaurant(ownedRestaurant._id);
        setForm((prev) => ({
          ...prev,
          restaurantId: ownedRestaurant._id,
          owner: user._id,
        }));
      } catch (err) {
        toast.error("Failed to fetch restaurant.");
        console.error(err);
      }
    };

    if (user?._id) {
      fetchRestaurant();
    }
  }, [user?._id]);

  useEffect(() => {
    if (restaurant) fetchSales();
  }, [restaurant]);

  const fetchSales = async () => {
    try {
      const res = await axios.get(`${API_URL}/sale/${restaurant}`);
      setSales(res.data);
    } catch (err) {
      toast.error("Failed to fetch sales");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSale = async () => {
    try {
      const sale = {
        ...form,
        owner: user._id,
        restaurantId: restaurant,
        quantitySold: Number(form.quantitySold),
        unitPrice: Number(form.unitPrice),
        totalAmount:
          form.totalAmount ||
          Number(form.quantitySold) * Number(form.unitPrice),
        dateOfSale: form.dateOfSale || new Date().toISOString(),
      };
      const res = await axios.post(`${API_URL}/sale/create`, sale);
      setSales([...sales, res.data]);
      toast.success("Sale added");
      resetForm();
    } catch (err) {
      toast.error("Failed to add sale");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/sale/${id}`);
      setSales(sales.filter((sale) => sale._id !== id));
      toast.success("Sale deleted");
    } catch (err) {
      toast.error("Failed to delete sale");
    }
  };

  const handleEdit = (sale) => {
    setForm(sale);
    setEditingId(sale._id);
  };

  const handleUpdate = async () => {
    try {
      const updatedSale = {
        ...form,
        quantitySold: Number(form.quantitySold),
        unitPrice: Number(form.unitPrice),
        totalAmount:
          form.totalAmount ||
          Number(form.quantitySold) * Number(form.unitPrice),
        owner: user._id,
        restaurantId: restaurant,
      };
      const res = await axios.put(`${API_URL}/sale/${editingId}`, updatedSale);
      setSales(sales.map((s) => (s._id === editingId ? res.data : s)));
      toast.success("Sale updated");
      resetForm();
      setEditingId(null);
    } catch (err) {
      toast.error("Failed to update sale");
    }
  };

  const resetForm = () => {
    setForm({
      itemName: "",
      quantitySold: "",
      unitPrice: "",
      totalAmount: "",
      dateOfSale: "",
      paymentMethod: "",
      customerName: "",
      notes: "",
      owner: user?._id,
      restaurantId: restaurant || "",
    });
  };

  const exportToCSV = () => {
    const ws = utils.json_to_sheet(sales);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sales");
    writeFile(wb, "sales_data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Item",
      "Qty",
      "Unit Price",
      "Total",
      "Date",
      "Payment",
      "Customer",
      "Notes",
    ];
    const tableRows = sales.map((sale) => [
      sale.itemName,
      sale.quantitySold,
      sale.unitPrice,
      sale.totalAmount,
      new Date(sale.dateOfSale).toLocaleDateString(),
      sale.paymentMethod,
      sale.customerName,
      sale.notes,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("sales_data.pdf");
  };

  return (
    <div className="sales-page">
      <h2 className="sales-title">Sales Page</h2>

      <div className="sales-form">
        <input
          type="text"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="sales-input"
        />
        <input
          type="number"
          name="quantitySold"
          value={form.quantitySold}
          onChange={handleChange}
          placeholder="Quantity Sold"
          className="sales-input"
        />
        <input
          type="number"
          name="unitPrice"
          value={form.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="sales-input"
        />
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount (auto if empty)"
          className="sales-input"
        />
        <input
          type="date"
          name="dateOfSale"
          value={form.dateOfSale}
          onChange={handleChange}
          className="sales-input"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="sales-input"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="POS">POS</option>
          <option value="Transfer">Transfer</option>
          <option value="Online">Online</option>
        </select>
        <input
          type="text"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          className="sales-input"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="sales-input"
          rows={2}
        />
        {editingId ? (
          <button onClick={handleUpdate} className="btn update-btn">
            Update Sale
          </button>
        ) : (
          <button onClick={handleAddSale} className="btn add-btn">
            Add Sale
          </button>
        )}
      </div>

      <div className="export-buttons">
        <button className="btn export-btn" onClick={exportToCSV}>
          Export to Excel
        </button>
        <button className="btn export-btn" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>

      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Customer</th>
              <th>Notes</th>
              <th>Store ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.itemName}</td>
                <td>{sale.quantitySold}</td>
                <td>₦{sale.unitPrice}</td>
                <td>₦{sale.totalAmount}</td>
                <td>{new Date(sale.dateOfSale).toLocaleDateString()}</td>
                <td>{sale.paymentMethod}</td>
                <td>{sale.customerName}</td>
                <td>{sale.notes}</td>
                <td>{sale.restaurantId}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleEdit(sale)}
                      className="action-btn edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="action-btn delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;
