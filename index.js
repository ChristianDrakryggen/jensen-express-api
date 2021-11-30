const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());

mongoose.connect(
  "mongodb+srv://christianDrakryggenJensen:i7fc2WP02HtIHHFu@my-first-api-db.3kdti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
