require("dotenv").config();
const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");

const app = express();

const allowedOrigins = process.env.FRONTEND_URLS || [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server / Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed"), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204
};

/**
 * IMPORTANT:
 * Enable CORS for ALL routes and preflight
 */
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 👈 THIS FIXES PREFLIGHT

app.use(express.json());
app.use("/", urlRoutes);

module.exports = app;
