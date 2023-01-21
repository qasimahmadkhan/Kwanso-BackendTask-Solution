const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("task", taskSchema);
