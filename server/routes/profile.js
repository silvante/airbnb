const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./login");

router.get("/", (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id, verificated, username, avatar, bio } =
          await User.findById(userData.id);
        res.json({ name, email, _id, verificated, username, avatar, bio });
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
