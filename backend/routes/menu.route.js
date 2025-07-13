// routes/menuRoutes.js
import express from "express";
import {
  getMenuByRestaurant,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  ValidateMenuForOrder,
} from "../controllers/menu.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public
router.get("/get", getAllMenuItems); // all items in a restaurant
router.get("/get/:id", getMenuByRestaurant); // all items in a restaurant
router.get("/item/:id", getMenuItem); // single item

router.post("/validate", ValidateMenuForOrder);

// Protected (restaurant owner)
router.post("/create", verifyToken, createMenuItem);
router.put("/update/:id", verifyToken, updateMenuItem);
router.delete("/delete/:id", verifyToken, deleteMenuItem);

export default router;
