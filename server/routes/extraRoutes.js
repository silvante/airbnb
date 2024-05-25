const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "D:/airbnb/uploads/" + newName,
  });
  res.json("D:/airbnb/uploads/" + newName);
});

module.exports = router;
