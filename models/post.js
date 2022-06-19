const mongoose = require("mongoose");
const Module = require("./module");
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 300 },
  content: { type: String, required: true },
  date: { type: Number, default: new Date().getTime() },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  // author: () // TODO : Add Author
});

module.exports = mongoose.model("Post", postSchema);
