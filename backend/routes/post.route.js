// import express from 'express';
// import multer from 'multer';
// import path from "path";

// import { createPost } from '../controllers/postController.js';

// const router = express.Router();

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage: fileStorageEngine,
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error("Only images are allowed"));
//     }
//   },
// });
// const upload = multer({ dest: 'uploads/' });

// router.post('/create', upload.single('image'), createPost);

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

// Configure storage for images
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Only allow images
const upload = multer({
  storage: fileStorageEngine,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Use the upload middleware
router.post("/create", upload.single("image"), createPost);
router.get("/posts", getPosts);

export default router;
