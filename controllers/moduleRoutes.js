const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Module = require("../models/module");
const User = require("../models/user");

router.post("/create", auth, (req, res) => {
  const { title, description } = req.body;

  if (!title || !description)
    res.status(400).send("Both title and description are required");

  Module.create({ title, description })
    .then((r) => {
      res.status(200).send({ message: "Module created", data: r });
    })
    .catch((e) => {
      res.status(400).send({ error: e });
    });
});

router.get("/:moduleId", auth, (req, res) => {
  const { moduleId } = req.query;

  if (!moduleId) res.status(400).send("Module id required");

  Module.findById(moduleId)
    .populate("activites")
    .then((r) => {
      res.status(200).send({ module: r });
    })
    .catch((e) => res.status(400).send({ error: e }));
});

router.get("/", auth, (req, res) => {
  Module.find()
    .then((r) => res.status(200).send(r))
    .catch((e) => res.statusres.status(400).send({ error: e }));
});

module.exports = router;
