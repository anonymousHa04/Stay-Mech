const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//create Schema of education

const ProfileEdSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    college: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProfileEdSchema.virtual("userDetails", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Education = model("education", ProfileEdSchema);

module.exports = Education;
