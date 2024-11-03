import { DM_Sans } from "next/font/google";
import { MdDelete } from "react-icons/md";
import { db } from "@/config/firebase"; // Ensure you're importing your Firestore setup
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function DisplayMailInfo({ id, name, subject, fromEmail, message, photoURL }) {
  const handleDelete = async () => {
    try {
      // Move the email to the bin collection
      const binEmailData = {
        fromEmail,
        subject,
        message,
        senderPhotoURL: photoURL,
      };

      // Add to the bin collection
      await addDoc(collection(db, "bin"), binEmailData);

      // Delete the email from both the inbox and sent collections
      await deleteDoc(doc(db, "email", id)); // Deletes from inbox
      await deleteDoc(doc(db, "sent", id)); // Deletes from sent

      console.log("Email moved to bin and deleted successfully");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className={`h-full ${dmsans.className}`}>
      <div className="text-white">
        <div className="bg-gray-800 h-[13vh] flex items-center justify-between p-4">
          <div>
            <div className="flex items-center">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="User Avatar"
                  className="rounded-full w-7 h-7 mr-3"
                />
              ) : (
                <div className="bg-gray-300 rounded-full w-7 h-7 mr-3"></div> // Fallback for when there's no image
              )}
              <div className="text-2xl font-bold">{name}</div>
            </div>
            <div className="">Subject: {subject}</div>
            <div className="text-gray-400">From: {fromEmail}</div>
          </div>
          <div onClick={handleDelete}>
            <MdDelete className="text-3xl" />
          </div>
        </div>
        <div className="p-4 pr-32">
          <div className="text-gray-300 leading-relaxed">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayMailInfo;
