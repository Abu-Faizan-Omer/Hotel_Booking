const Review = require("../models/review");
const Hotel = require("../models/hotel");

const Booking = require("../models/booking");

exports.addReview = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { rating, comment } = req.body;

        const hotel = await Hotel.findByPk(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        //  Check if user booked this hotel
        const existingBooking = await Booking.findOne({
            where: { userId: req.user.id, hotelId }
        });

        if (!existingBooking) {
            return res.status(403).json({ message: "You must book this hotel before leaving a review." });
        }

        const review = await Review.create({
            userId: req.user.id,
            hotelId,
            rating,
            comment,
        });

        res.status(201).json({ message: "Review added", review });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add review" });
    }
};

//get Review
exports.getHotelReviews = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const reviews = await Review.findAll({ where: { hotelId } });

        res.status(200).json({ reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
