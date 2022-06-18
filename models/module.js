const mongoose = require("mongoose");
const Activity = require("./activity");


const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 300 },
    //   activites: { type: mongoose.Schema.Types.ObjectId, ref:  },
    // author: () // TODO : Add Author
  },
  { toJSON: { virtuals: true } }
);

moduleSchema.virtual("activity", {
  ref: "Activity",
  localField: "_id",
  foreignField: "moduleId",
});

module.exports = mongoose.model("Module", moduleSchema);
