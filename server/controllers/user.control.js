const mongoose = require("mongoose");
const User = require("../models/user.model");

// mothod: get
// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};
// mothod: post
// add new user
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
  }
};
// mothod: put
// edit user by id
const editUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const { name, password } = req.body;
    const edited = await User.findByIdAndUpdate(userID, {
      name,
      password,
    });
    res.status(201).send(edited);
  } catch (err) {
    console.log(err);
  }
};
// mothod: delete
// delete user by id
const deleteUser = async (req, res) => {
  const removingUserId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(removingUserId);
    if (!deleteUser) {
      res.status(404).send("user is not defined...");
    }
    res.status(201).send(deleteUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
