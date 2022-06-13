const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const { route } = require("./userRoutes");

router.get("/", auth, async (req, res) => {
  const posts = await Post.find();

  const sorted = posts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
  res.status(200).send(sorted);
});

router.post("/create", auth, async (req, res) => {
  const post = await Post.create(req.body);

  res.status(200).send(post);
});

router.post("/delete", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(400)
      .send({ user: req.user, message: "Only admins can delete post" });

  const post = await Post.deleteOne({ _id: req.body.id });

  res.status(200).send(post);
});

module.exports = router;
