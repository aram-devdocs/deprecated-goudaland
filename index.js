const express = require("express");
const auth = require("./middleware/auth");
// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const mongoose = require("mongoose");

// Setup mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

// Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `*`);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
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

app.use("/users", require("./controllers/userRoutes"));
app.use("/posts", require("./controllers/postRoutes"));
app.use("/modules", require("./controllers/moduleRoutes"));
app.use("/activites", require("./controllers/activityRoutes"));

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(PORT, () => {
  console.log("nomming at posrts", PORT);
});
