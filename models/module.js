const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 300 },
    //   activites: { type: mongoose.Schema.Types.ObjectId, ref:  },
    // author: () // TODO : Add Author
  },
  { toJSON: { virtuals: true } }
);

moduleSchema.virtual("activites", {
  ref: "Class",
  localField: "_id",
  foreignField: "module",
});

module.exports = mongoose.model("modules", moduleSchema);
