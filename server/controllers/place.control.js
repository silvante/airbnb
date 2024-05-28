const mongoose = require("mongoose");
const Places = require("../models/places.model");

// get all the places
// method: GET
const getPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).send(places);
  } catch (err) {
    res.json(err);
  }
};

// get the place by id
// method: GET
const getPlace = async (req, res) => {
  const id = req.params.id;
  try {
    const place = await Places.find({ _id: id });
    if (!place) {
      res.status(404).send("place is not defined");
    }
    res.status(200).send(place);
  } catch (err) {
    res.json(err);
  }
};

// create a place
// method: POST
const createPlace = async (req, res) => {
  const id = req.params.id;
  try {
    const place = await Places.find({ _id: id });
    if (!place) {
      res.status(404).send("place is not defined");
    }
    res.status(200).send(place);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getPlaces,
  getPlace,
  createPlace,
};
