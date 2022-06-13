const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
  // Create token
  const token = jwt.sign(
    { user_id: req.body._id, email: req.body.email, role: req.user.role},
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.status(200).send(token);
});

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { fname, lname, email, password, role } = req.body;

    // Validate user input
    if (!(email && password && fname && lname && role)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Check if admin and if they are on whitelist
    if (role == "admin") {
      const whitelist = process.env.ADMIN_WHITELIST;

      if (!whitelist.includes(email))
        return res
          .status(400)
          .send(`${email} is note whitelisted to become an admin.`);
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      fname,
      lname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      role,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email, role: role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user.password = undefined;


    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {

  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    let user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      user.password = undefined;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/welcome", auth, (req, res) => {
  return res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
