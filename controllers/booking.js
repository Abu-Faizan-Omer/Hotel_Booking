const Razorpay = require("razorpay");
const Booking = require("../models/booking");
const Hotel = require("../models/hotel");
const razorpay = require("../utils/razorpay");



// Create a booking with Razorpay
exports.bookHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const userId = req.user.id;
        const hotel = await Hotel.findByPk(hotelId);

        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        const amount = hotel.price * 100; // Razorpay works in paisa

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        });

        await Booking.create({
            userId,
            hotelId,
            amount: hotel.price,
            paymentId: order.id,
        });

        res.status(201).json({ success: true, order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

// Get booking history of user
exports.getBookingHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.findAll({
            where: { userId },
            include: [{ model: Hotel }],
        });
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id } = req.body;

        const booking = await Booking.findOne({
            where: { razorpayOrderId: razorpay_order_id }
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.paymentId = razorpay_payment_id;
        booking.status = "paid";
        await booking.save();

        res.status(200).json({ message: "Payment verified and booking updated" });
    } catch (err) {
        console.error("verifyPayment error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.createBooking = async (req, res) => {
    try {
        const { amount } = req.body;
        const hotelId = req.params.hotelId;

        const order = await razorpay.orders.create({
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        });

        await Booking.create({
            userId: req.user.id,
            hotelId: hotelId,
            status: "pending",
            amount: amount,
            razorpayOrderId: order.id,
            paymentId: order.id,
        });
        console.log("Key:", process.env.RAZORPAY_KEY_ID)
        console.log("Sending key and orderId:", process.env.RAZORPAY_KEY_ID, order.id);


        return res.status(201).json({
            key: process.env.RAZORPAY_KEY_ID,
            orderId: order.id,
        });
    } catch (err) {
        console.log("createBooking error:", err);
        res.status(500).json({ message: "Booking failed" });
    }
};