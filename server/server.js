const express = require("express");
const connectDataBase = require("./connections/db");
const cors = require("cors");
const app = express();
require("dotenv").config();

// requiring routes
const users = require("./routes/users");

connectDataBase();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello airbnb");
});

const port = process.env.PORT;

// routes
app.use("/api/users", users);

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
