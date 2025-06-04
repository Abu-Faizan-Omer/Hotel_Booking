const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");

// Assume admin check is done inside controller or you can add isAdmin middleware
router.post("/addhotel", authenticate, adminController.addHotel);
router.put("/edithotel/:hotelId", authenticate, adminController.editHotel);
router.delete("/deletehotel/:hotelId", authenticate, adminController.deleteHotel);

module.exports = router;
