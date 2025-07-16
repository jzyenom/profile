// routes/menuRoutes.js
import express from "express";
import {
  createNewsAndEvents,
  deleteNewsAndEvents,
  getAllNewsAndEvents,
  updateNewsAndEvents,
} from "../controllers/newsAndEvents.contoller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public
router.get("/get", getAllNewsAndEvents); // all items in a restaurant

// Protected (restaurant owner)
router.post("/create", verifyToken, createNewsAndEvents);
router.put("/update/:id", verifyToken, updateNewsAndEvents);
router.delete("/delete/:id", verifyToken, deleteNewsAndEvents);

export default router;
