const express = require("express");
const router = express.Router();
const Song = require("../models/Song_Model");
const Album = require("../models/Album_Model");
router.post("/createAlbum", async (req, res) => {
  try {
    const createAlbum = await Album.create(req.body);
    res.send(createAlbum);
  } catch (err) {
    console.log("Something went wrong while creating Album");
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page);
    const size = Number(req.query.limit);
    console.log(req.query);
    console.log(page, size);
    const offset = (page - 1) * size;
    const getAlbums = await Album.find().skip(offset).limit(size).lean().exec();
    res.send(getAlbums);
  } catch (err) {
    console.log("Something went wrong while fetching all Albums");
    console.log(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const getAlbum = await Album.findById({ _id: req.params.id })
      .populate("songs")
      .lean()
      .exec();
    res.send(getAlbum);
  } catch (err) {
    console.log("Something went wrong while getting Specific Album Song");
    console.log(err);
  }
});

module.exports = router;
