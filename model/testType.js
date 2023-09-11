const { default: mongoose } = require("mongoose");

const testTypeSchema = mongoose.Schema({
  
  test_type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Test_type", testTypeSchema);
