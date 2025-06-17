const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { authenticate } = require("../middleware/authenticate");


router.post("/add/:hotelId", authenticate, reviewController.addReview);
router.get("/hotel/:hotelId", reviewController.getHotelReviews);

module.exports = router;
