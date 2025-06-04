const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Review = sequelize.define("review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Review;
