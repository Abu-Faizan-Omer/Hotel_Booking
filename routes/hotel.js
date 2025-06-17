const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel");
const { authenticate } = require("../middleware/authenticate");

// Public routes
router.get("/search", hotelController.searchHotel); 
router.get("/all", hotelController.getAllHotels);

module.exports = router;
