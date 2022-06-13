const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, default: null, required: true },
  lname: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["admin", "student"], default: "student" },
  password: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
