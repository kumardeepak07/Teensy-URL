require('@dotenvx/dotenvx').config();
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/url.routes");

const app = express();

// 1. Clean and parse origins
const allowedOrigins = process.env.FRONTEND_URLS 
  ? process.env.FRONTEND_URLS.split(",").map(o => o.trim()) 
  : [];

// 2. Use ONLY the CORS package with these specific settings
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman/mobile)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200 // CRITICAL for Vercel preflight checks
  })
);

app.use(express.json());

// 3. Mount routes
app.use("/", urlRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;