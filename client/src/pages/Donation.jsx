import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Donation = () => {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [money, setMoney] = useState();
  const { backendUrl, isLoggedIn } = useContext(AppContext);

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      // if (!isLoggedIn) {
      //   navigate("/");
      //   return;
      // }
       if (loading) return;

      setLoading(true);
      const { data } = await axios.post(backendUrl + "/api/auth/donate", {
        amount: Number(money),
      });

      const options = {
        key: "rzp_test_ScelKIBSLT6zYd",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0"
    style={{
        background: "linear-gradient(to bottom right, #F7FFF7, #CBFFB0)",
      }}>
     
      <div
        onClick={() => navigate("/")}
        className={`absolute left-5 -ml-10 sm:left-20 top-5 flex flex-col items-center cursor-pointer ${
          loading ? "opacity-50 pointer-events-none" : "cursor-pointer"
        }`}
      >
        <img className="w-10 sm:w-12" src="/favicon.png" alt="favicon" />

        <h1 className="text-2xl sm:text-base mt-1 ml-6">
          <span className="text-gray-800 font-bold">Faith</span>
          <span className="text-green-600 font-extrabold">Fund</span>
        </h1>
      </div>
      <div className="bg-gray-300 p-10 rounded-lg shadow-lg w-full sm:w-96 text-black text-center text-sm">
        <p className="text-xl font-medium mb-4">Enter Donation Amount</p>
        <form onSubmit={handlePayment} className="flex flex-col ">
          <input
            type="number"
            disabled={loading}
            required
            autoFocus
            className="bg-gray-200 rounded-2xl p-2 text-black mb-8"
            onChange={(e) => setMoney(e.target.value)}
          />
          <button className={`w-full py-2.5 rounded-full bg-linear-to-r from-green-300 to-green-700 text-white font-medium cursor-pointer  ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`} disabled={loading}>
           {loading ? "Please wait..." : "Donate Now"}
          </button>
          <p className="mt-4 text-lg text-center text-green-800 font-medium">
  "And whatever you give in charity,<span className="font-bold ml-1 mr-1 text-red-600">Allah</span> knows it well"
</p>
        </form>
      </div>

      {/* <button className="border border-black rounded-2xl cursor-pointer"
  onClick={async () => {
    await axios.post(backendUrl+"/api/donation/verify", {
      amount: 500,
      paymentId: "test123",
      orderId: "test456",
    }, { withCredentials: true });

    alert("Test donation added");
  }}
>
  Add Test Donation
</button> */}
    </div>
  );
};

export default Donation;
