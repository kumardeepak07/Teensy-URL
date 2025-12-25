require("dotenv").config();
const express = require("express");
const urlRoutes = require("./routes/url.routes");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server or Postman requests (no origin)
    if (!origin) return callback(null, true);

    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(require("cors")(corsOptions));

app.use(express.json());

app.use("/", urlRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
