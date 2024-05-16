const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("hello airbnb");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
