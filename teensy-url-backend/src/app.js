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
const allowedOrigin = "https://teensy-url-pbt3.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200 
}));

app.use(express.json());

// 3. Mount Routes
app.use("/", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;