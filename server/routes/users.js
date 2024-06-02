const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/user.control");

// get all users
router.get("/", getUsers);

// get a user by id
router.get("/:id", getUser);

// create user
router.post("/", addUser);

// edit user by id
router.put("/:id", editUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;
