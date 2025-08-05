import Contact from "../models/contact.model.js";
// Mock message sending
export const sendSMS = async (req, res) => {
  const { message, recipients } = req.body;
  // Integration point with Twilio or Termii
  console.log("Sending SMS to:", recipients);
  res.json({ status: "Sent", message });
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
