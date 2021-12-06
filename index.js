const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
const path = require("path");

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(express.static(path.join(__dirname, "client")));

mongoose.connect(
  /*"mongodb+srv://christianDrakryggenJensen:i7fc2WP02HtIHHFu@my-first-api-db.3kdti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"*/ "mongodb://localhost:27017/posts-db",
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

/*app.get("/posts", (req, res) => {
  res.send("Hello");
});*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
