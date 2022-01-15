const mongoose = require("mongoose");
const Song = require("./Song_Model");

const Schema = mongoose.Schema;
const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: [{ type: String, required: true }],
  year: { type: Number, required: true },
  cover_photo: { type: String, required: true },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "song",
    },
  ],
});
const Album = new mongoose.model("album", AlbumSchema);
module.exports = Album;
