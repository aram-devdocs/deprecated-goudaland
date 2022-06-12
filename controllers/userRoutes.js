const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;

  // Check for existing email
  const existingUser = await User.findOne({ username: body.usernamel });
  if (!existingUser)
    return res
      .status(401)
      .json({ status: false, error: "User already exists" });

  if (!(body.username && body.password)) {
    return res
      .status(400)
      .send({ status: false, error: "Data not formatted properly" });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const crpytPassword = await bcrypt.hash(body.password, salt);

  User.create({ username: body.username, password: crpytPassword });
  res.status(200).send({ status: true, message: "User created successfully" });
  // .catch((e) =>
  //   console.log(e)
  // );
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: body.username });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ status: true, message: "Valid password" });
    } else {
      res.status(400).json({ status: false, error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ status: false, error: "User does not exist" });
  }
});

module.exports = router;
