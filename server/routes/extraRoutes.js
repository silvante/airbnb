const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  await download.image({
    url: link,
    dest: "D:/airbnb/uploads"
  })
});

console.log(__dirname);
console.log("D:/airbnb/uploads");

module.exports = router;
