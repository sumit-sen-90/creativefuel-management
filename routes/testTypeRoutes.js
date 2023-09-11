const express = require("express");

const {
  createTestType,
  listTestType,
} = require("../controller/testTypeController");
const router = express.Router();

router.post("/create", createTestType);
router.get("/list", listTestType);

module.exports = router;
