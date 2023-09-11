const express = require("express");
const {
  createTest,
  updateTest,
  getAllTest,
  deleteTest,
  getTest,
} = require("../controller/testController");

const router = express.Router();

router.post("/create", createTest);
router.put("/update/:id", updateTest);
router.get("/list", getAllTest);
router.get("/list/:id", getTest);
router.delete("/delete/:id", deleteTest);
module.exports = router;
