import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

function DisplayComposeBlock({ userEmail, senderPhotoURL }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!toEmail || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const emailData = {
        subject,
        fromEmail: userEmail,
        message,
        toEmail,
        senderPhotoURL,
        displayName: user.displayName,
      };

      await addDoc(collection(db, "email"), emailData);
      await addDoc(collection(db, "sent"), emailData);

      setToEmail("");
      setSubject("");
      setMessage("");
      console.log("Email sent successfully:", emailData);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full px-3">
      <div className="w-full h-[7vh] border-b-2 border-gray-700 flex items-center">
        <div className="text-gray-400">To: </div>
        <input
          type="text"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="text-white w-full h-[7vh] bg-transparent px-3 focus:outline-none"
        />
        <IoMdSend
          className={`text-white text-3xl cursor-pointer ${
            isLoading ? "opacity-50" : ""
          }`}
          onClick={isLoading ? null : handleSend}
        />
      </div>
      <div className="w-full h-[7vh] border-b-2 border-gray-700 flex items-center">
        <div className="text-gray-400">Subject: </div>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="text-white w-full h-[7vh] bg-transparent px-3 focus:outline-none"
        />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent w-full h-full p-4 text-white focus:outline-none"
        ></textarea>
      </div>
    </div>
  );
}

export default DisplayComposeBlock;
