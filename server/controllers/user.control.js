const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const cyfer = bcryptjs.genSaltSync(8);

// mothod: get
// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    res.json(err);
  }
};

// mothod: get
// get a user
const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.find({ _id: userId });
    if (!user) {
      res.status(404).send("user is not defined...");
    }
    return res.status(200).send(user);
  } catch (err) {
    res.json(err);
  }
};

// mothod: post
// add new user
const addUser = async (req, res) => {
  try {
    const { name, email, password, verificated, username, avatar, bio } =
      req.body;
    const newUser = await User.create({
      name,
      username,
      email,
      password: bcryptjs.hashSync(password, cyfer),
      verificated,
      avatar,
      bio,
    });
    return res.status(201).send(newUser);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

// mothod: put
// edit user by id
const editUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const { name, password, verificated, username, avatar, bio } = req.body;
    const edited = await User.findByIdAndUpdate(userID, {
      name,
      password,
      username,
      verificated,
      avatar,
      bio,
    });
    res.status(201).send(edited);
  } catch (err) {
    res.json(err);
  }
};

// mothod: delete
// delete user by id
const deleteUser = async (req, res) => {
  const removingUserId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(removingUserId);
    if (!deletedUser) {
      res.status(404).send("user is not defined...");
    }
    res.status(201).send(deletedUser);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
