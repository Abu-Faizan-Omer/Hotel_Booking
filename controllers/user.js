const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// JWT token generator (helper function)
function generateAccessToken(id, name, isAdmin) {
    return jwt.sign({ userId: id, name, isAdmin }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
}

exports.generateAccessToken = generateAccessToken;

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { name, email, password, adminEmail } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if this user is admin
        const isAdmin = adminEmail === "admin@gmail.com";

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin,
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Signup failed" });
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password, adminEmail } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Check admin status
        const isAdmin = adminEmail === "admin@gmail.com" && user.isAdmin;

        const token = generateAccessToken(user.id, user.name, isAdmin);

        return res.status(200).json({
            message: isAdmin ? "Admin login successful" : "User login successful",
            token,
            isAdmin,
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
