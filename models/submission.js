const mongoose = require("mongoose");
const Module = require("./module");
const User = require("./user");
const Activity = require("./activity");

const submisionSchema = new mongoose.Schema({
  answers: { type: Array },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  grade: { type: Number },
});

module.exports = mongoose.model("submissions", submissionSchema);
