const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Activity = require("../models/activity");

router.get("/:moduleId", auth, async (req, res) => {
  const { moduleId } = req.params;
  const activities = await Activity.find({ moduleId });

  // const sorted = posts.sort(function (a, b) {
  //   // Turn your strings into dates, and then subtract them
  //   // to get a value that is either negative, positive, or zero.
  //   return new Date(b.date) - new Date(a.date);
  // });
  res.status(200).send(activities);
});

router.post("/create", auth, (req, res) => {
  const { title, description, content, moduleId } = req.body;

  if (!title || !description || !content || !moduleId)
    res
      .status(400)
      .send("Both title, module, content, and description are required");

  Activity.create({ title, description, content, moduleId })
    .then((r) => {
      res.status(200).send("Activity  created");
    })
    .catch((e) => {
      res.status(400).send({ error: e });
    });
});

router.delete("/:activityId", auth, (req, res) => {
  const { activityId } = req.params;
  if (!activityId) res.status(400).send("activity id required");
  Activity.findByIdAndDelete(activityId)
    .then((r) => {
      res.status(200).send("activity deleted");
    })
    .catch((e) => res.status(400).send({ error: e }));
});

module.exports = router;
