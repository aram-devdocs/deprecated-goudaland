const mongoose = require("mongoose");
const Module = require("./module");

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, default: null, required: true },
    lname: { type: String, default: null, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ["admin", "student"], default: "student" },
    password: { type: String, required: true },
    token: { type: String },
    modules: [{ type: mongoose.Schema.ObjectId, ref: "Module" }],
  },
  { toJSON: { virtuals: true } }
);

userSchema.virtual("fullname").get(function () {
  return `${this.fname} ${this.lname}`;
});
module.exports = mongoose.model("User", userSchema);
