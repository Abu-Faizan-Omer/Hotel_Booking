const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { authenticate } = require("../middleware/authenticate");

// Book hotel with Razorpay payment

router.get("/history", authenticate, bookingController.getBookingHistory);
router.post('/create/:hotelId', authenticate, bookingController.createBooking);
router.post("/verify", authenticate, bookingController.verifyPayment);


module.exports = router;
