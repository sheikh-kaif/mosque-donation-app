const Donation = require("../modals/donationModel");
const mongoose = require("mongoose");

//creating donation document
exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, paymentId, orderId } = req.body;

    const donation = await Donation.create({
      userId,
      amount,
      paymentId,
      orderId,
    });

    res.json({
      status: true,
      message: "Donation saved",
      donation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


//sending total donation received till now
exports.getTotalDonations = async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      status: true,
      total: result[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

//sending user total donation till now
exports.getUserTotal = async (req, res) => {
  console.log("user-total API hit");
  console.log("REQ USER ID:", req.userId);

  try {
    const result = await Donation.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      status: true,
      total: result[0]?.total || 0,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ status: false });
  }
};

//sending user donations one by one
exports.getUserDonations = async (req, res) => {
  try {
    const userId = req.userId;

    const donations = await Donation.find({ userId }).sort({ date: -1 });

    res.json({
      status: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
