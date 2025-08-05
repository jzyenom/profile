// routes/postRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByStatus,
} from "../controllers/postController.js";

const router = express.Router();

// Configure Multer storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets"); // Save in public/assets
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Only allow image types
const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG images are allowed."));
    }
  },
});

// Routes
router.post("/create", upload.single("image"), createPost);
router.get("/posts", getPosts);
router.get("/posts/status", getPostsByStatus); // ?status=pending
router.get("/post/:id", getPost);
router.put("/update/:id", upload.single("image"), updatePost);
router.delete("/delete/:id", deletePost);

export default router;
