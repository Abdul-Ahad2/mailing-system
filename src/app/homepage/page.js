"use client";
import SideBarCard from "@/components/SideBarCard";
import DisplayComposeBlock from "@/components/DisplayComposeBlock";
import DisplayMailInfo from "@/components/DisplayMailInfo";
import { DM_Sans } from "next/font/google";
import { FaPlusCircle } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { HiMiniQueueList } from "react-icons/hi2";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function Home() {
  return (
    <div className="bg-gray-900 w-full h-screen">
      <div
        className={`bg-black w-full h-[7vh] text-white flex items-center p-4 justify-center ${dmsans.className} text-2xl`}
      >
        <IoMdMail className="mr-2 " />
        Mail
      </div>
      <div className="flex">
        {/* Navigation sidebar */}
        <div
          className={`h-[93vh] w-48 bg-black text-white flex justify-center ${dmsans.className}`}
        >
          <div>
            <div className="flex items-center my-9">
              <FaInbox className="text-2xl mr-4" />
              <div className="text-base">Inbox</div>
            </div>
            <div className="flex items-center mb-9">
              <IoIosSend className="text-2xl  mr-4" />
              <div>Sent</div>
            </div>
            <div className="flex items-center mb-9">
              <IoTrashBin className="text-2xl  mr-4" />
              <div>Bin</div>
            </div>
            <div className="flex items-center mb-9">
              <HiMiniQueueList className="text-2xl mr-4" />
              <div>Queue</div>
            </div>
          </div>
        </div>
        <div className="h-[93vh] w-72 bg-gray-800 flex-shrink-0">
          <div
            className={`bg-black w-full h-[8vh] text-white flex items-center justify-center ${dmsans.className} text-[19px]`}
          >
            <div className="flex justify-center items-center">
              <div>Compose</div>
              <FaPlusCircle className="m-2 text-2xl" />
            </div>
          </div>
          <div className="p-2 overflow-y-auto h-[85vh]">
            <SideBarCard
              subject="SOS"
              fromEmail={"abdulahadhaq@outlook.com"}
              message={
                "The sun dipped below the horizon, painting the sky in hues of orange and pink. As the evening breeze whispered through the trees, the world felt alive with possibility. Laughter echoed from nearby, mingling with the scent of blooming flowers, creating a perfect moment where time seemed to stand still."
              }
            />
          </div>
        </div>
        <div className="flex-1 h-[93vh] bg-gray-900 overflow-y-auto">
          <DisplayMailInfo
            id="displayMailInfo"
            name={"Amina Zakir"}
            subject={"SOS"}
            fromEmail={"aminazakir@gmail.com"}
            message={
              "Stay connected and organized with your personal mailbox at your fingertips. This system lets you compose, send, and manage emails seamlessly, keeping your conversations efficient and accessible. With an intuitive interface, finding messages and staying up-to-date becomes effortless. Whether you're managing projects, following up with clients, or simply catching up with friends, MailSystem offers a reliable and user-friendly experience. Dive in and streamline your communication like never before!"
            }
          />
          <DisplayComposeBlock id="displayComposeBlock" />
        </div>
      </div>
    </div>
  );
}

export default Home;
