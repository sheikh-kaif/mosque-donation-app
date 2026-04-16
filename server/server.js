const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./environ.env" });
const cookieparser = require("cookie-parser");
const connectDB = require("./config/mogodb");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const donationRoutes=require("./routes/donationRoutes")
require("./reminderJob");

const app = express();

const port = process.env.PORT || 4000;
connectDB();
const allowedOrigins = ["http://localhost:5173","https://mosque-donation-app-six.vercel.app"];

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//API test routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API working",
  });
});


//API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donation",donationRoutes)

app.listen(port, () => {
  console.log(`server started on PORT:${port}`);
});
