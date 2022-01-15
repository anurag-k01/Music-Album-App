const express = require("express");
const router = express.Router();
const Song = require("../models/Song_Model");

router.post("/add", async (req, res) => {
  try {
    const addSong = await Song.create(req.body);
    res.send(addSong);
  } catch (err) {
    console.log("Something Went While Adding Song");
    console.log(err);
  }
});
router.get("/getSongs", async (req, res) => {
  try {
    const songs = await Song.find().lean().exec();
    res.send(songs);
  } catch (err) {}
});
module.exports = router;
