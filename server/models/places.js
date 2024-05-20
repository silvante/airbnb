const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  title: String,
  adress: String,
  photos: [String],
  descriptions: String,
  perks: String,
  checkin: Number,
  checkout: Number,
  maxGuests: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Place = mongoose.model("place", placeSchema);
module.exports = Place;
