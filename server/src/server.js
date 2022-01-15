const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
app.use(express.json());
const connect = function () {
  mongoose
    .connect("mongodb://localhost:27017/musicalbum", {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database Connection Success");
    })
    .catch((err) => {
      console.log(err);
      console.log("Something went wrong while connecting to Database");
    });
};
let songController = require("../controllers/Song_Controller");
app.use("/", songController);
app.listen(PORT, async function () {
  await connect();
  console.log(`Listening on port ${PORT}`);
});