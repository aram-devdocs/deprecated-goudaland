const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required: true },
  last_name: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["admin", "student"], default: "student" },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
