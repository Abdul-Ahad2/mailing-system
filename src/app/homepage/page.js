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
import { BsArrowBarRight } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function Home() {
  const [emails, setEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [binEmails, setBinEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null); // State for the selected email
  const [showMailInfo, setShowMailInfo] = useState(false); // State for displaying mail info
  const [showComposeBlock, setShowComposeBlock] = useState(false); // State for showing compose block
  const [isSentView, setIsSentView] = useState(false); // State to track if sent view is active
  const [isBinView, setIsBinView] = useState(false);
  const [user, setUser] = useState({}); // State to track if bin view is active

  const auth = getAuth(app);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUser(user);
    fetchEmails(); // Fetch emails on component mount
  }, []);

  const fetchEmails = async () => {
    const userEmail = user.email; // Get the current user's email
    const emailsCollection = collection(db, "email");
    const emailSnapshot = await getDocs(emailsCollection);
    const emailList = emailSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((email) => email.toEmail === userEmail); // Filter by user email
    setEmails(emailList); // Update state with emails
    setIsSentView(false); // Reset sent view state
    setIsBinView(false); // Reset bin view state
  };

  const fetchSentEmails = async () => {
    const userEmail = user.email; // Get the current user's email
    const sentCollection = collection(db, "sent");
    const sentSnapshot = await getDocs(sentCollection);
    const sentEmailList = sentSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((email) => email.fromEmail === userEmail); // Filter by user email
    setSentEmails(sentEmailList); // Update state with sent emails
  };

  const fetchBinEmails = async () => {
    const userEmail = user.email; // Get the current user's email
    const binCollection = collection(db, "bin");
    const binSnapshot = await getDocs(binCollection);
    const binEmailList = binSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((email) => email.fromEmail === userEmail); // Filter by user email
    setBinEmails(binEmailList); // Update state with bin emails
  };

  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userInfo");
        window.location.href = "/";
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Function to handle displaying mail info
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowMailInfo(true); // Show mail info when an email is clicked
    setShowComposeBlock(false); // Hide compose block when viewing email
  };

  // Function to handle showing the compose block
  const handleComposeClick = () => {
    setShowComposeBlock(true); // Show compose block
    setShowMailInfo(false); // Hide mail info when composing
  };

  return (
    <div className="bg-gray-900 w-full h-screen">
      <div
        className={`bg-black w-full h-[7vh] text-white flex items-center p-4 justify-center ${dmsans.className} text-2xl`}
      >
        <IoMdMail className="mr-2 " />
        Mail
      </div>
      <div className="flex">
        <div
          className={`h-[93vh] w-48 bg-black text-white flex justify-center ${dmsans.className}`}
        >
          <div>
            <div
              className="flex items-center my-9 cursor-pointer"
              onClick={() => {
                setIsSentView(false);
                setIsBinView(false);
                fetchEmails();
              }}
            >
              <FaInbox className="text-2xl mr-4 " />
              <div className="text-base">Inbox</div>
            </div>
            <div
              className="flex items-center mb-9 cursor-pointer"
              onClick={() => {
                setIsSentView(true);
                fetchSentEmails(); // Fetch sent emails
              }}
            >
              <IoIosSend className="text-2xl mr-4 " />
              <div>Sent</div>
            </div>
            <div
              className="flex items-center mb-9 cursor-pointer"
              onClick={() => {
                setIsBinView(true);
                fetchBinEmails(); // Fetch bin emails
              }}
            >
              <IoTrashBin className="text-2xl mr-4 " />
              <div>Bin</div>
            </div>
            <div className="flex items-center mb-9 cursor-pointer">
              <HiMiniQueueList className="text-2xl mr-4" />
              <div>Queue</div>
            </div>
            <div
              className="flex items-center text-base cursor-pointer"
              onClick={googleSignOut}
            >
              <div className="underline mr-3">Logout</div>
              <BsArrowBarRight />
            </div>
          </div>
        </div>
        <div className="h-[93vh] w-72 bg-gray-800 flex-shrink-0">
          <div
            className={`bg-black w-full h-[8vh] text-white flex items-center justify-center ${dmsans.className} text-[19px]`}
            onClick={handleComposeClick} // Handle compose click
          >
            <div className="flex justify-center items-center cursor-pointer">
              <div>Compose</div>
              <FaPlusCircle className="m-2 text-2xl" />
            </div>
          </div>
          <div className="p-2 overflow-y-auto h-[85vh]">
            {isBinView &&
              binEmails.map((val) => (
                <div
                  key={val.id}
                  onClick={() => handleEmailClick(val)}
                  className="cursor-pointer"
                >
                  <SideBarCard
                    subject={val.subject}
                    fromEmail={val.fromEmail}
                    message={val.message}
                  />
                </div>
              ))}
            {isSentView &&
              sentEmails.map((val) => (
                <div key={val.id} onClick={() => handleEmailClick(val)}>
                  <SideBarCard
                    subject={val.subject}
                    fromEmail={val.fromEmail}
                    message={val.message}
                  />
                </div>
              ))}
            {!isSentView &&
              !isBinView &&
              emails.map((val) => (
                <div key={val.id} onClick={() => handleEmailClick(val)}>
                  <SideBarCard
                    subject={val.subject}
                    fromEmail={val.fromEmail}
                    message={val.message}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex-1 h-[93vh] bg-gray-900 overflow-y-auto">
          {showMailInfo &&
            selectedEmail && ( // Conditional rendering for DisplayMailInfo
              <DisplayMailInfo
                id={selectedEmail.id}
                name={selectedEmail.displayName} // Use sender's email as the name
                subject={selectedEmail.subject}
                fromEmail={selectedEmail.fromEmail}
                message={selectedEmail.message}
                photoURL={selectedEmail.senderPhotoURL}
              />
            )}
          {showComposeBlock && ( // Conditional rendering for DisplayComposeBlock
            <DisplayComposeBlock
              userEmail={user.email}
              senderPhotoURL={user.photoURL}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
