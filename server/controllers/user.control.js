const mongoose = require("mongoose");
const User = require("../models/user.model");

// mothod: get
// get all users
const getUsers = async (req, res) => {};
// mothod: get
// get a user
const getUser = async (req, res) => {};
// mothod: post
// add new user
const addUser = async (req, res) => {};
// mothod: put
// edit user by id
const editUser = async (req, res) => {};
// mothod: delete
// delete user by id
const deleteUser = async (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
