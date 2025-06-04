const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Booking = sequelize.define('booking', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  paymentId: {
    type: Sequelize.STRING
  },
  razorpayOrderId: {
    type: Sequelize.STRING // <- Add this field
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending' // <- Optional but helpful
  }
});


module.exports = Booking;
