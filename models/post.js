const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 300 },
  content: { type: String, required: true },
  date: { type: Number, default: new Date().getTime() },
  // author: () // TODO : Add Author
});

module.exports = mongoose.model("posts", postSchema);
