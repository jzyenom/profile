import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import colors from "colors";
import authRoutes from "./routes/auth.route.js";
import newsAndEvents from "./routes/newsAndEvents.router.js";

// Connect to MongoDB
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const allowedOrigins = [
  "http://localhost:5173", // development
  "https://profile-1aiq.onrender.com", // production
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON body
app.use(cookieParser()); //allows us to parse the incoming cookie

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/newsAndEvents", newsAndEvents);

// Serve static files from the public folder
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
//   });
// }

// //Test
app.get("/", (req, res) => {
  res.send("I am working. I hope you can see me!!!!!!!");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Listening on port ${PORT}`);
});
