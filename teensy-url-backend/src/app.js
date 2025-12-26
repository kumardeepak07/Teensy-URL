require("dotenv").config();
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/url.routes");

const app = express();

// Ensure no spaces and correct splitting
const allowedOrigins = process.env.FRONTEND_URLS 
  ? process.env.FRONTEND_URLS.split(",").map(o => o.trim()) 
  : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Logic error fix: If the origin is not allowed, 
      // we still need to let the request through so the browser can 
      // see the CORS failure properly, or throw a clear error.
      callback(null, false); 
    }
  },
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200 // Better than 204 for some legacy browsers/CDNs
}));

app.use(express.json());

// Mount routes
app.use("/", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;