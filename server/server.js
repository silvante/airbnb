const express = require("express");
const connectDataBase = require("./connections/db");
const cors = require("cors");
const cp = require("cookie-parser");
const app = express();
require("dotenv").config();

// requiring routes
const users = require("./routes/users");
const { router } = require("./routes/login");
const profile = require("./routes/profile");
const logout = require("./routes/logout");

connectDataBase();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cp());

app.get("/", (req, res) => {
  res.send("hello airbnb");
});

const port = process.env.PORT;

// routes
app.use("/api/users", users);
app.use("/login", router);
app.use("/profile", profile);
app.use("/logout", logout);

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
