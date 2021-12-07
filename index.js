const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
const path = require("path");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(express.static(path.join(__dirname, "client")));

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

/*app.get("/posts", (req, res) => {
  res.send("Hello");
});*/

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
