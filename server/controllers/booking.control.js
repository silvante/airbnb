const Booking = require("../models/booking.model");

const getBookings = (req, res) => {
  try {
    const bookings = Booking.find();
    if (!bookings) {
      res.status(404).send("booking is not defined");
    }
    res.status(200).send(bookings);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// creating a new booking

const addBooking = (req, res) => {
  try {
    const { price, name, modile, checkin, checkout, place } = req.body;
    
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {};
