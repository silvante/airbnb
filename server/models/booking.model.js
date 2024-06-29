const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkin: {
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
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
