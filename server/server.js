const express = require("express");
const connectDataBase = require("./connections/db");
const cors = require("cors");
const app = express();
require("dotenv").config();

// requiring routes
const users = require("./routes/users");
const login = require("./routes/login");

connectDataBase();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello airbnb");
});

const port = process.env.PORT;

// routes
app.use("/api/users", users);
app.use("/login", login);

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
