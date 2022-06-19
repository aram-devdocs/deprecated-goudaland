const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Activity = require("../models/activity");
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
