const mongoose = require("mongoose");
require("mongoose-type-url");

const schema = mongoose.Schema;
const newLocal = mongoose.SchemaTypes.Url;
const PracticeSchema = new schema({
  mainCategory: String,
  category: String,
  topic: String,
  content: String,
  example: String,
  answer: String,
  url: newLocal,
});

//models
const Practice = mongoose.model("practice", PracticeSchema);

module.exports = Practice;
