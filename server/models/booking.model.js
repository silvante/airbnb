const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "place",
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  price: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
