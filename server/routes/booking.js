const express = require("express");
const router = express.Router();

const {
  getBooking,
  getBookings,
  addBooking,
  deleteBooking,
  editBooking,
} = require("../controllers/booking.control");

// get all bookings
router.get("/", getBookings);

// get booking by id
router.get("/:id", getBooking);

// add new booking
router.post("/", addBooking);

// edit booking by id
router.put("/:id", editBooking);

// delete booking by id
router.delete("/:id", deleteBooking);

module.exports = router;
