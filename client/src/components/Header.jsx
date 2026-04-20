import React, { useContext, useEffect, useState } from "react";
// import handwave from "../assets/handwave.png";

import { AppContext } from "../context/AppContext";
import masjid from "../assets/masjid.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  const [displayedLetters, setDisplayedLetters] = useState([]);

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
          timeoutId = setTimeout(startErasing, 2000); // wait 2 sec
        }
      }, 150);
    };

    const startErasing = () => {
      intervalId = setInterval(() => {
        setDisplayedLetters((prev) => {
          if (prev.length === 0) {
            clearInterval(intervalId);
            timeoutId = setTimeout(startTyping, 500); // restart
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
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center mt-20 w-3/5 justify-center px-4 text-center text-gray-800">
        <h1
          className="text-3xl font-extrabold font-san mb-6 tracking-widest text-green-700"
          style={{ minHeight: "2.5rem" }}
        >
          {displayedLetters.map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-bounce-in  "
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

        <p className="max-w-md  text-xl text-center font-bold mb-8 ">
          A dedicated platform to help you donate to our mosque effortlessly and receive reminders so you never miss a chance to contribute.
          
        </p>
        <div className="flex flex-row gap-4 mb-4 ml-5">

          <div className="border border-gray-600  p-2 rounded-2xl  transition-transform duration-300 hover:scale-105 hover:bg-green-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ">
            <div className="flex flex-row justify-center items-center">
              <img src="/mosque.png" className="w-4 sm:w-8" />
              <h1 className="text-md  font-bold">Mosque Maintenance</h1>
            </div>
            <p className="text-left text-sm pt-3 pl-1">
              Ensuring cleanliness, electricity, water, and regular upkeep of
              the mosque.
            </p>
          </div>

          <div className="border border-gray-600  p-2 rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-green-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <div className="flex flex-row justify-center items-center">
              <img src="/book.png" className="w-4 sm:w-8" />
              <h1 className="text-md  font-bold">Religious Education</h1>
            </div>
            <p className="text-left text-sm pt-3 pl-1">
              Supporting Quran classes and learning opportunities for students.
            </p>
          </div>

          <div className="border border-gray-600  p-2 rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-green-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <div className="flex flex-row justify-center items-center">
              <img src="/public-health.png" className="w-4 sm:w-8" />
              <h1 className="text-md  font-bold">Community Support</h1>
            </div>
            <p className="text-left text-sm pt-3 pl-1">
              Helping those in need and organizing community initiatives.
            </p>
          </div>

          <div className="border border-gray-600  p-2 rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-green-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <div className="flex flex-row justify-center items-center">
              <img src="/future (1).png" className="w-4 sm:w-8" />
              <h1 className="text-md  font-bold">Future Development</h1>
            </div>
            <p className="text-left text-sm pt-3 pl-1">
              Improving and expanding mosque facilities for future generations.
            </p>
          </div>
        </div>
        <p className="text-xl font-bold mb-4">
          Be a part of
          <span className="text-red-500 text-3xl font-extrabold"> الخير </span>
          Your small contribution can make a big difference.
        </p>
        {/* {isLoggedin ? (
          <button className="border border-gray-600 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all" onClick={()=>navigate('/donate')}>
            Donate
          </button>
        ) : ( */}
          <button
            className="border border-gray-600 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login/Sign up to donate
          </button>
        {/* )} */}
      </div>

      <div
        className="w-2/5 relative h-[80vh] mt-25 mr-10 "
        style={{ backgroundColor: "bg-pink-50" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${masjid})`,

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "multiply",
            opacity: 0.9,
          }}
        />
        
        
      </div>
    </div>
  );
};

export default Header;
