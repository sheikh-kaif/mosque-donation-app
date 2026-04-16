const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String, // from Razorpay
  },
  orderId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);