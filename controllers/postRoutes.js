const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const { route } = require("./userRoutes");

router.get("/", auth, async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});


router.post("/create", auth, async (req, res) => {
    const post = await Post.create(req.body);

    res.status(200).send(post)
} )

module.exports = router;
