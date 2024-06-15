const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Place = require("../models/places.model");
const Comment = require("../models/comment.model");

const uploadDir = path.join("D:/airbnb/server", "/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "thefool_" + Date.now() + ".jpg"; // Use only the timestamp for the new name
    const dest = path.join(uploadDir, newName); // Destination file path

    await imageDownloader.image({
      url: link,
      dest: dest,
    });

    res.json(newName);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while downloading the image." });
  }
});

const photosMiddleware = multer({ dest: "uploads" });

router.post("/upload", photosMiddleware.array("photos", 20), (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(`uploads`, ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    res.json(error);
  }
});

router.get("/comments-of/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const placeComments = await Comment.find({ to: id });
    if (!placeComments) {
      res.status(404).send("this user has nopo places");
    }
    res.status(200).send(placeComments);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/places-of/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userPLace = await Place.find({ owner: id });
    if (!userPLace) {
      res.status(404).send("this user has nopo places");
    }
    res.status(200).send(userPLace);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
