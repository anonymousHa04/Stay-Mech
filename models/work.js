const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProfileWorkSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProfileWorkSchema.virtual("userDetails", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Work = model("work", ProfileWorkSchema);

module.exports = Work;
