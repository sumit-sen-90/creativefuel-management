const { default: mongoose } = require("mongoose");

const testerSchema = mongoose.Schema({
  test_name: {
    type: String,
    required: true,
    trim: true,
  },
  tester_mobile_no: {
    type: String,
    required: true,
    trim: true,
  },
  tester_alternative_no: {
    type: String,
    required: true,
    trim: true,
  },
  tester_email: {
    type: String,
    lowercase: true,
    trim: true,
   
  },
  test_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test_type",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("Php_test_mast", testerSchema);
