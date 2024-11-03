"use client";
import { DM_Sans } from "next/font/google";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import axios from "axios";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function SignUp() {
  return (
    <div
      className={`w-full h-screen relative flex items-center justify-center ${dmsans.className}`}
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-[95%]"></div>

      <div className="relative z-10 bg-gray-900 bg-opacity-40 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
        <div className="text-4xl text-white font-medium mb-3">
          <span className="border-b-2 border-white">Welcome.</span>
        </div>
        <div className="text-sm text-gray-300 mb-6 flex items-center">
          Sign in with Google to start using &nbsp; <IoMdMail />
          &nbsp; Mail
        </div>
        <button className="flex items-center w-full justify-center gap-2 bg-white px-8 py-3 rounded-md text-gray-900 hover:bg-gray-100 transition-colors">
          <FaGoogle className="text-xl" />
          <span>Sign In with Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
