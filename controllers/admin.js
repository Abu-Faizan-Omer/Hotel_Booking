const Hotel = require("../models/hotel");

// Add a hotel
exports.addHotel = async (req, res) => {
    try {
         if (!req.user.isAdmin) return res.status(403).json({ message: "Not authorized" });
        const { name, city, description, price,imageUrl } = req.body;
        const hotel = await Hotel.create({ name, city, description, price ,imageUrl});
        res.status(201).json({ success: true, hotel });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

