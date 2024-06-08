const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "thefool_ahsvausakashvklashcvlaysgaus";

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (userDoc) {
      const passwordOk = bcryptjs.compareSync(password, userDoc.password);
      if (passwordOk) {
        jwt.sign(
          { username: userDoc.username, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("password is not ok");
      }
    } else res.json("not found");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

module.exports = { router, jwtSecret };
