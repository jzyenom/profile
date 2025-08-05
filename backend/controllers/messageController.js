import Contact from "../models/contact.model.js";
import axios from "axios";

export const sendSMS = async (req, res) => {
  try {
    const { message, recipients } = req.body;

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res
        .status(400)
        .json({ error: "Recipients must be a non-empty array." });
    }
    console.log("API_KEY:", process.env.TERMII_API_KEY);
    console.log("SENDER_ID:", process.env.TERMII_SENDER_ID);
    // Join recipients for Termii's expected comma-separated format
    const to = recipients.join(",");

    const response = await axios.post(
      "https://api.ng.termii.com/api/sms/send",
      {
        to: "2348028901519",
        from: process.env.TERMII_SENDER_ID,
        sms: "message",
        type: "plain",
        channel: "generic",
        api_key: process.env.TERMII_API_KEY,
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Termii SMS Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};

export const receiveSMS = (req, res) => {
  // Handle webhook from SMS provider
  console.log("Incoming SMS:", req.body);
  res.sendStatus(200);
};

export const uploadContacts = async (req, res) => {
  const contacts = req.body.contacts;
  const result = await Contact.insertMany(contacts);
  res.json(result);
};
