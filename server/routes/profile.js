const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./login");

router.get("/", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, cookie) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(cookie.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json({});
  }
});

module.exports = router;
