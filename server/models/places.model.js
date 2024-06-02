const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  title: String,
  adress: String,
  photos: [String],
  descriptions: String,
  perks: [String],
  checkin: String,
  checkout: String,
  maxGuests: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
});

const Place = mongoose.model("place", placeSchema);
module.exports = Place;
