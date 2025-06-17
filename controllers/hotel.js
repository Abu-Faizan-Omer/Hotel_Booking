const Hotel = require("../models/hotel");
const Review = require("../models/review");
const { Op } = require("sequelize");

// Search hotel by city
exports.searchHotel = async (req, res) => {
    try {
        const { city } = req.query;
        const hotels = await Hotel.findAll({where: { city: city }});

        //console.log("Hotel-",hotels)
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
;

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
