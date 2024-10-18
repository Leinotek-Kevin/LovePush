const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bibleRoute = require("./routes").bible;
const cors = require("cors");
const port = process.env.PORT || 8080;

const crawer = require("./crawer/bible-crawer");

require("./service");

//連結 mongoDB
mongoose
  .connect(process.env.RELEASE_MONGODB_CONNECTION)
  .then(() => {
    console.log("連結到 mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Handle Route
app.use("/api/bible", bibleRoute);

//監聽 http request
app.listen(port, () => {
  console.log("後端伺服器聆聽中,,,");
});

crawer();
