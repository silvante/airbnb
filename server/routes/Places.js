const express = require("express");
const router = express.Router();
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/place.control");

// get all the places
router.get("/", getPlaces);

// get a place
router.get("/:id", getPlace);

// creat a place
router.post("/", createPlace);

// update place ny id
router.put("/:id", updatePlace);

// delete place by id
router.delete("/:id", deletePlace);
module.exports = router;
