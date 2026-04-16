const express = require("express");
const Router = express.Router();

const donationController = require("../controllers/donationController");
const userAuth = require("../middleware/userAuth");

//  Save donation after payment
Router.post("/verify", userAuth, donationController.verifyPayment);

//  Get total donation (all users)
Router.get("/total", donationController.getTotalDonations);

// Get logged-in user total
Router.get("/user-total", userAuth, donationController.getUserTotal);

//  Get user donation history
Router.get("/history", userAuth, donationController.getUserDonations);

module.exports = Router;