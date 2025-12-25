require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins =
  process.env.FRONTEND_URLS?.split(",") || [];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // Postman / server-side

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed"), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // ✅ handles OPTIONS automatically
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
