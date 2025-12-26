require("dotenv").config();
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/url.routes");

const app = express();

// 1. Properly parse origins (removing spaces)
const allowedOrigins = process.env.FRONTEND_URLS 
  ? process.env.FRONTEND_URLS.split(",").map(o => o.trim()) 
  : [];

// 2. Use ONE CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200 // Essential for Vercel/legacy browsers
}));

app.use(express.json());

// 3. Mount Routes
app.use("/", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;