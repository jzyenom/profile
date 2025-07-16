// models/newsAndEventsSchema.js
import mongoose from "mongoose";

const newsAndEventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    typeOfData: {
      type: String, // the type will either be news or events
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const newsAndEvents = mongoose.model("newsAndEvent", newsAndEventsSchema);
export default newsAndEvents;
