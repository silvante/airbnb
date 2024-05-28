const express = require("express");
const router = express.Router();
const {
  getPlaces,
  getPlace,
  createPlace,
} = require("../controllers/place.control");

// get all the places
router.get("/", getPlaces);

// get a place
router.get("/:id", getPlace);

// creat a place
router.post("/", createPlace);

module.exports = router;
