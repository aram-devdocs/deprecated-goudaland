const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Number, default: new Date().getTime() },
});

module.exports = mongoose.model("posts", postSchema);
