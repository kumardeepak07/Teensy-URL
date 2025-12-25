require("dotenv").config();
const express = require("express");
const urlRoutes = require("./routes/url.routes");

const app = express();
app.use(express.json());

app.use("/", urlRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
