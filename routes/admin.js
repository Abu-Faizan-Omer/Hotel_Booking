const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");


router.post("/addhotel", authenticate, adminController.addHotel);


module.exports = router;
