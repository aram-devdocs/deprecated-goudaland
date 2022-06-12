const express = require("express");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Connected to ${process.env.MONGO_URI}`);
  }
);
// .catch((e) => {
// c

// Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `*`);
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

// MIDDLEWARE
app.use(express.static("public")); // Exposing the public folder to the client
app.use(express.urlencoded({ extended: true })); // Encoding your requests so they are Javascript formatted

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Goudaland Server</h1>");
});

app.get("/test", (req, res) => {
  res.send({ message: "You tested right!", status: "true" });
});

app.use("/users", require("./controllers/userRoutes"));
// 404 Page
// app.get("*", (req, res) => {
//   res.render("404");
// });

app.listen(PORT, () => {
  console.log("nomming at posrts", PORT);
});
