const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Place = require("../models/places.model");

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

router.get("/places-of/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const usersPlaces = await Place.find({ owner: id });
    if (!usersPlaces) {
      res.status(404).send("this user has nopo places");
    }
    res.status(200).send(usersPlaces);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const profileMidleware = multer({ dest: "uploads" });

router.post("/upload-pfp", profileMidleware("profile"), (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).send({ err: "no file was uploaded" });
    }

    const { path, originalname } = uploadedFile;
    const nameParts = originalname.split(".");
    const extantion = nameParts[nameParts.length - 1];
    const newPath = path + "." + extantion;
    const uploadedFilePath = newPath.replace("uploads", "");
    res.status(201).json({ file: uploadedFilePath });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
