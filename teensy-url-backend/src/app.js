require("dotenv").config();
const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");

const app = express();

const allowedOrigins =
  process.env.FRONTEND_URLS?.split(",") || [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // 👈 important
      }

      // IMPORTANT: still allow preflight to respond
      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS","HEAD","PUT","PATCH","DELETE"],
    allowedHeaders: ["*"],
    optionsSuccessStatus: 204
  })
);

app.use(express.json());

/**
 * ✅ MOUNT ROUTES (THIS WAS MISSING)
 */
app.use("/", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
