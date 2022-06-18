const mongoose = require("mongoose");
const Module = require("./module");

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 300 },
  content: { type: String, required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
});

module.exports = mongoose.model("Activity", activitySchema);
