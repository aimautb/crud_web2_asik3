const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use("/blogs", require("./routes/blogRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running on " + process.env.PORT);
});
