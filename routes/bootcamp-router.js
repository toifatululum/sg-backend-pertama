const {
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp
} = require("../controllers/bootcamp-controller");
const express = require("express");
const router = express.Router();

router.route("/all").get(getBootcamps);
router.route("/create").post(createBootcamp);
router.route("/delete/:id").delete(deleteBootcamp);
router.route("/update/:id").put(updateBootcamp);

module.exports = router;
