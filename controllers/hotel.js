const Hotel = require("../models/hotel");
const Review = require("../models/review");
const { Op } = require("sequelize");

// Search hotel by city
exports.searchHotel = async (req, res) => {
    try {
        const { city } = req.query;
        const hotels = await Hotel.findAll({ where: { city: { [Op.like]: `%${city}%` } } });
        res.status(200).json({ success: true, hotels });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Get all hotels (e.g., for home page)
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.status(200).json({ success: true, hotels });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Leave review for a hotel
exports.giveReview = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        const review = await Review.create({ userId, hotelId, rating, comment });
        res.status(201).json({ success: true, review });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Get all reviews of a hotel
exports.getReviews = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const reviews = await Review.findAll({ where: { hotelId } });
        res.status(200).json({ success: true, reviews });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};
