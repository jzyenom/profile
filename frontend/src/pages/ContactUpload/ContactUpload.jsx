import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const API_URL = "http://localhost:5000/api/message"; // Update for production

const isValidNigerianNumber = (number) => {
  return /^((\+234)|0)(70|80|81|90|91|91|71|60|61)\d{8}$/.test(number);
};

const ContactUpload = () => {
  const [contacts, setContacts] = useState([{ name: "", phone: "" }]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addContactField = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
  };

  const uploadContacts = async () => {
    const invalids = contacts.filter(
      (c) => !isValidNigerianNumber(c.phone) || !c.name.trim()
    );
    if (invalids.length) {
      return setStatus(
        "Ensure all names are filled and phone numbers are valid Nigerian numbers."
      );
    }

    try {
      const res = await axios.post(`${API_URL}/contacts/upload`, { contacts });
      setStatus("✅ Contacts uploaded successfully.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error uploading contacts.");
    }
  };

  const sendSMS = async () => {
    const invalids = contacts.filter((c) => !isValidNigerianNumber(c.phone));
    if (!message.trim()) return setStatus("❌ Message cannot be empty.");
    if (invalids.length) return setStatus("❌ Some phone numbers are invalid.");

    setShowConfirm(false); // Hide modal

    try {
      const phones = contacts.map((c) => c.phone);
      const res = await axios.post(`${API_URL}/send`, {
        message,
        recipients: phones,
      });
      setStatus(`✅ SMS sent to: ${phones.join(", ")}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send SMS.");
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-primary">📇 Contact Upload & SMS</h3>

      {contacts.map((contact, i) => (
        <Row key={i} className="mb-3">
          <Col md={5}>
            <Form.Control
              placeholder="Name"
              value={contact.name}
              onChange={(e) => handleContactChange(i, "name", e.target.value)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Control
              placeholder="Phone (e.g., 0803...)"
              value={contact.phone}
              onChange={(e) => handleContactChange(i, "phone", e.target.value)}
              required
              isInvalid={contact.phone && !isValidNigerianNumber(contact.phone)}
            />
          </Col>
        </Row>
      ))}

      <Button variant="secondary" onClick={addContactField} className="me-2">
        ➕ Add More
      </Button>

      <Button variant="primary" onClick={uploadContacts} className="me-2">
        📤 Upload Contacts
      </Button>

      <hr />

      <h5 className="mt-4 mb-3">💬 Message</h5>
      <Form.Control
        as="textarea"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />

      <Button
        variant="success"
        className="mt-3"
        onClick={() => setShowConfirm(true)}
      >
        🚀 Send SMS
      </Button>

      {status && (
        <Alert
          variant={status.startsWith("✅") ? "success" : "danger"}
          className="mt-3"
        >
          {status}
        </Alert>
      )}

      {/* Confirm Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm SMS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send this message to{" "}
          <strong>{contacts.length}</strong> contact(s)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={sendSMS}>
            Yes, Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactUpload;
