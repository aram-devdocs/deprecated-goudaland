const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  // Create token, keep user logged in while accessing site
  const token = jwt.sign(
    { user_id: req.body._id, email: req.body.email, role: req.user.role },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  const localModules = await User.find({}, "modules");
  res.status(200).send({ token: token, modules: localModules[0].modules });
});

router.get("/modules", auth, (req, res) => {
  User.findById(req.user.user_id, "modules")
    .populate("modules")
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(400).send({ error: e }));
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

router.get("/admin_users", auth, (req, res) => {
  if (req.user.role !== "admin")
    res.status(400).send("Only admins have access to this route");

  User.find({}, "fname lname fullname email id modules role")
    // .populate("fullname")
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ error: e });
    });
});

router.get("/admin_usersPopulateModules", auth, (req, res) => {
  if (req.user.role !== "admin")
    res.status(400).send("Only admins have access to this route");

  User.find({}, "fname lname fullname email id modules role")
    .populate("modules")
    // .populate("fullname")
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ error: e });
    });
});

router.put("/admin_addModuleToUser", auth, (req, res) => {
  if (req.user.role !== "admin")
    res.status(400).send("Only admins have access to this route");

  const { userId, moduleId } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { $push: { modules: moduleId } })
    .then((r) => res.status(200).send("Added module to user"))
    .catch((e) => res.status(400).send({ error: e }));
});

router.put("/admin_removeModuleFromUser", auth, (req, res) => {
  if (req.user.role !== "admin")
    res.status(400).send("Only admins have access to this route");

  const { userId, moduleId } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { $pull: { modules: moduleId } })
    .then((r) => res.status(200).send("removed module to user"))
    .catch((e) => res.status(400).send({ error: e }));
});

module.exports = router;
