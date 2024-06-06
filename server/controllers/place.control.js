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
    console.log(err);
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
    console.log(err);
  }
};

// create a place
// method: POST
const createPlace = async (req, res) => {
  try {
    const {
      title,
      adress,
      photos,
      descriptions,
      perks,
      checkin,
      checkout,
      maxGuests,
      owner,
      price,
    } = req.body;
    const newPlace = await Places.create({
      title,
      adress,
      photos,
      descriptions,
      perks,
      checkin,
      checkout,
      maxGuests,
      owner,
      price,
    });
    return res.status(201).send(newPlace);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

// update a place by id
// method: PUT
const updatePlace = async (req, res) => {
  docId = req.params.id;
  try {
    const {
      title,
      price,
      descriptions,
      photos,
      checkin,
      checkout,
      maxGuests,
      adress,
      perks,
    } = req.body;
    const updatingPlace = await Places.findByIdAndUpdate(docId, {
      title,
      adress,
      price,
      perks,
      descriptions,
      photos,
      checkin,
      checkout,
      maxGuests,
    });
    if (!updatingPlace) {
      res.status(404).send("place is not defined");
    }
    res.status(200).send(updatingPlace);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

// delete a place by id
// method: DELETE
const deletePlace = async (req, res) => {
  const removingPlaceId = req.params.id;
  try {
    const deletedPlace = await Places.findByIdAndDelete(removingPlaceId);
    if (!deletePlace) {
      res.status(404).send("place is not defined");
    }
    res.status(200).send(deletePlace);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

module.exports = {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
};
