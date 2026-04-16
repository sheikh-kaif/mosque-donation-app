import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import masjid from "../assets/masjid.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  const [totalDonation, setTotalDonation] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [displayedLetters, setDisplayedLetters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalRes = await axios.get(backendUrl + "/api/donation/total");
        setTotalDonation(totalRes.data.total);

        const userRes = await axios.get(
          backendUrl + "/api/donation/user-total",
          {
            withCredentials: true,
          },
        );
        setUserTotal(userRes.data.total);

        const historyRes = await axios.get(
          backendUrl + "/api/donation/history",
          {
            withCredentials: true,
          },
        );
        setHistory(historyRes.data.donations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const word = userData
      ? `As-salamu alaykum, ${userData.name}!`
      : "As-salamu alaykum";

    let i = 0;
    let timeoutId;
    let intervalId;

    const startTyping = () => {
      i = 0;
      setDisplayedLetters([]);

      intervalId = setInterval(() => {
        if (i < word.length) {
          const currentLetter = word[i];
          setDisplayedLetters((prev) => [...prev, currentLetter]);
          i++;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(startErasing, 2000);
        }
      }, 150);
    };

    const startErasing = () => {
      intervalId = setInterval(() => {
        setDisplayedLetters((prev) => {
          if (prev.length === 0) {
            clearInterval(intervalId);
            timeoutId = setTimeout(startTyping, 500);
            return prev;
          }
          return prev.slice(0, -1);
        });
      }, 80);
    };

    startTyping();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [userData]);
  const [enabled, setEnabled] = useState(false);

 
  useEffect(() => {
    const fetchReminderStatus = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/user/reminder-status", {
          withCredentials: true,
        });
        setEnabled(res.data.reminderEnabled);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReminderStatus();
  }, []);

  const toggleReminder = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    try {
      await axios.put(
        backendUrl + "/api/user/reminder",
        { reminderEnabled: newValue },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      setEnabled(!newValue); 
    }
  };

  return (
    <div
      className="flex h-screen w-full"
      style={{
        background: "linear-gradient(to bottom right, #F7FFF7, #CBFFB0)",
      }}
    >
      <Navbar />

      
      <div className="flex flex-col items-center w-3/5 justify-center px-4 text-center text-gray-800">
        <h1
          className="text-4xl font-extrabold font-san mb-6 tracking-widest text-green-700"
          style={{ minHeight: "2.5rem" }}
        >
          {displayedLetters.map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-bounce-in"
              style={{
                opacity: 1,
                animation: "fadeSlideIn 0.4s ease forwards",
                color: index < 18 ? "text-green-700" : "black",
                fontWeight: index < 18 ? "800" : "400",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <p className="max-w-md text-xl text-center font-medium mb-6">
          WHATEVER YOU GIVE IN CHARITY IS CERTAINLY WELL KNOWN TO ALLAH{" "}
          <span className="text-green-700 ml-2">[2:273]</span>
        </p>

        <div className="mb-6">
          <p className="font-medium text-xl">
            Total Donation <span className="ml-2">{totalDonation}</span>
          </p>
          <p className="font-medium text-xl">
            Your Total Contribution <span className="ml-2">{userTotal}</span>
          </p>
        </div>

        <p className="text-xl font-bold mb-8">
          Be a part of
          <span className="text-red-500 text-3xl font-extrabold"> الخير </span>
          Your small contribution can make a big difference.
        </p>
        {/* <button
          className="border px-4 py-1 rounded-full cursor-pointer"
          onClick={toggleReminder}
        >
          friday reminder
        </button> */}
        <div className="flex gap-4 text-xl font-medium justify-center item-centre">
        <p>Remind me on Fridays</p>
        <button
  className={`relative inline-flex mt-0.5 h-6 w-11 items-center rounded-full transition-colors duration-300 ${
    enabled ? "bg-green-500" : "bg-gray-300"
  }`}
  onClick={toggleReminder}
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
      enabled ? "translate-x-6" : "translate-x-1"
    }`}
  />
</button>
</div>
      </div>

      
      <div className="w-2/5 relative h-[80vh] mt-25 mr-10">
        
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${masjid})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "multiply",
            opacity: 0.7,
            filter: "blur(4px)",
          }}
        />

        
        <div className="relative z-10 flex flex-col items-center mt-10 h-full">
          <div className="mt-6 w-full max-w-md mr-40">
            {/* {history.length === 0 ? (
              <p className="text-gray-600 text-center text-xl font-medium">
                No donations yet. Make your first contribution today and track
                your impact.
              </p>
            ) : (
              history.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b py-2"
                >
                  <span>₹{item.amount}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              ))
            )} */}
            {history.length === 0 ? (
              <p className="text-gray-600 text-center text-xl font-medium">
                No donations yet. Make your first contribution today and track
                your impact.
              </p>
            ) : (
              <>
               
                <div className="flex justify-between border-b pb-2 mb-2 font-semibold text-gray-700">
                  <span>Amount</span>
                  <span>Date</span>
                </div>

                
                {history.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>₹{item.amount}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            className="border-2 border-green mr-40 bg-green-200 text-green-900 font-bold text-xl rounded-full px-8 py-2 mt-8 transition-all duration-200 hover:bg-gray-100 cursor-pointer hover:scale-105"
            onClick={() => navigate("/donate")}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
