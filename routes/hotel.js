const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel");
const { authenticate } = require("../middleware/authenticate");

// Public routes
router.get("/search", hotelController.searchHotel); // /hotel/search?city=Delhi
router.get("/all", hotelController.getAllHotels);

// Authenticated users can give reviews or book
router.post("/review/:hotelId", authenticate, hotelController.giveReview);
router.get("/reviews/:hotelId", hotelController.getReviews);

module.exports = router;
