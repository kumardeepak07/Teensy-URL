require("dotenv").config();
const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");

const app = express();

const allowedOrigins = process.env.FRONTEND_URLS?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        // Instead of false, you can also allow it but the browser will block it
        // Or strictly block it here.
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});


app.use(express.json());

/**
 * ✅ MOUNT ROUTES (THIS WAS MISSING)
 */
app.use("/", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
