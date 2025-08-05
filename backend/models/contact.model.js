import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Contact", contactSchema);

export const Contact = mongoose.model("Contact", contactSchema);
