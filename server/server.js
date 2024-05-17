const express = require("express");
const connectDataBase = require("./connections/db");
const cors = require("cors");
const app = express();
require("dotenv").config();

connectDataBase();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello airbnb");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
