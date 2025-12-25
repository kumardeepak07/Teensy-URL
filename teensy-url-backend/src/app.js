require("dotenv").config();
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/url.routes");

const app = express();

const allowedOrigins = process.env.FRONTEND_URLS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
  })
);

app.use(express.json());
app.use("/", urlRoutes);

module.exports = app;
