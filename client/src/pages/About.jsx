import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div
      className="flex items-start justify-start min-h-screen px-6 sm:px-0 "
      style={{
        background: "linear-gradient(to bottom right, #F7FFF7, #CBFFB0)",
      }}
    >
      <Navbar />
      <div className="mt-40 ml-20">
        <h1 className="text-2xl font-bold mb-5">About FaithFund</h1>
        <p className="text-xl leading-relaxed tracking-wide mt-10">
          FaithFund is a platform designed to make charity simple, consistent,
          and meaningful. It helps users donate easily and stay connected with
          the spirit of giving, especially on Fridays.
        </p>
        <p className="text-xl leading-relaxed tracking-wide">This project was inspired by the tradition of Friday (Jumu'ah) donations, where many students wish to contribute but often forget or lack a convenient way to do so.</p>
        <p className="text-xl font-bold mt-4 leading-relaxed tracking-wide">“Even a small contribution can create a meaningful impact.”</p>
      </div>
    </div>
  );
};

export default About;
