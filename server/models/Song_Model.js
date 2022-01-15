const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: String, required: true },
  album: [{ type: Schema.Types.ObjectId, ref: "album" }],
});

const Song = new mongoose.model("song", SongSchema);
module.exports = Song;
