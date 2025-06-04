const Hotel = require("../models/hotel");

// Add a hotel
exports.addHotel = async (req, res) => {
    try {
         if (!req.user.isAdmin) return res.status(403).json({ message: "Not authorized" });
        const { name, city, description, price } = req.body;
        const hotel = await Hotel.create({ name, city, description, price });
        res.status(201).json({ success: true, hotel });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Edit hotel
exports.editHotel = async (req, res) => {
    try {
         if (!req.user.isAdmin) return res.status(403).json({ message: "Not authorized" });
        const { hotelId } = req.params;
        const { name, city, description, price } = req.body;

        const hotel = await Hotel.findByPk(hotelId);
        if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

        hotel.name = name || hotel.name;
        hotel.city = city || hotel.city;
        hotel.description = description || hotel.description;
        hotel.price = price || hotel.price;

        await hotel.save();
        res.status(200).json({ success: true, hotel });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Delete hotel
exports.deleteHotel = async (req, res) => {
    try {
         if (!req.user.isAdmin) return res.status(403).json({ message: "Not authorized" });
        const { hotelId } = req.params;
        const deleted = await Hotel.destroy({ where: { id: hotelId } });
        if (!deleted) return res.status(404).json({ success: false, message: "Hotel not found" });
        res.status(200).json({ success: true, message: "Hotel deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};
