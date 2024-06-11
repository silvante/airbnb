const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "avatar.jpg",
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verificated: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
