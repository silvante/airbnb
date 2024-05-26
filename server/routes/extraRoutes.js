const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");

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

module.exports = router;
