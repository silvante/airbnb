const Booking = require("../models/booking.model");

// get all bookings

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("place");
    if (!bookings) {
      res.status(404).send("bookings is not defined");
    }
    res.status(200).send(bookings);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// get a booking by ID

const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.find({ _id: id }).populate("place");
    if (!booking) {
      res.status(404).send("booking is not defined");
    }
    res.status(200).send(booking);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// creating a new booking

const addBooking = async (req, res) => {
  try {
    const { price, name, mobile, checkin, checkout, place, user } = req.body;
    const newBooking = await Booking.create({
      price,
      name,
      mobile,
      checkin,
      checkout,
      place,
      user,
    });
    res.status(201).send(newBooking);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// edit booking by id

const editBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const { price, name, modile, checkin, checkout, place, user } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, {
      price,
      name,
      modile,
      checkin,
      checkout,
      place,
      user,
    });
    if (!booking) {
      res.status(404).send("booking is not defined");
    }
    res.status(202).send(booking);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// deletebooking by id

const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      console.log("nothing to delete");
      res.status(404).send("nothing to delete");
    }
    res.status(202).send(deleted);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getBooking,
  getBookings,
  addBooking,
  editBooking,
  deleteBooking,
};
