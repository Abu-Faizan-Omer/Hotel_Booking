const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization"); // from localStorage
        console.log("Token:", token);

        if (!token) {
            throw new Error("Token missing");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // decode token to get userId

        const user = await User.findByPk(decoded.userId); // find user in DB
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; // attach user to request for next function
        console.log("Authenticated User:", req.user.name);
        next();
    } catch (err) {
        console.log("Auth Error:", err.message);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

module.exports = {
    authenticate,
};
