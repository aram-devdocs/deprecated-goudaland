const mongoose = require("mongoose");
const Activity = require("./activity");

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 300 },
  },
  { toJSON: { virtuals: true } }
);

// hooks
moduleSchema.post("findOneAndDelete", function () {
  Activity.deleteMany({ moduleId: this._conditions._id }).then(
    (deleteStatus) => {
      console.log(deleteStatus);
    }
  );
});

moduleSchema.virtual("activity", {
  ref: "Activity",
  localField: "_id",
  foreignField: "moduleId",
});

module.exports = mongoose.model("Module", moduleSchema);
