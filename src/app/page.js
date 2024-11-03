"use client";
import { DM_Sans } from "next/font/google";
import { FaGoogle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { db } from "@/config/firebase"; // Ensure this includes Firestore initialization
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import setDoc, doc, and getDoc

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function SignUp() {
  async function addUser(name, email) {
    try {
      const docRef = doc(db, "user", email); // Using email as the unique ID for the user
      const docSnap = await getDoc(docRef); // Check if the document exists
      if (docSnap.exists()) {
        console.log("User already exists:", email);
      } else {
        // Add the user if they don't exist
        await setDoc(docRef, {
          name: name,
          email: email,
        });

        const welcomeEmailData = {
          displayName: "Mail Team",
          fromEmail: "no-reply@mail.co.pk",
          message:
            "We are thrilled to welcome you to the Mail family! Thank you for choosing us as your go-to solution for mailing. Our team is dedicated to providing you with the best experience possible, and we’re here to assist you every step of the way. Don’t hesitate to reach out if you have any questions or need support. Welcome aboard, and we look forward to serving you! Best regards, The Mail Team",
          subject: "SOS",
          toEmail: email, // the email of the new user
        };

        // Add the welcome email to the user's email collection
        await addDoc(collection(db, "email"), welcomeEmailData);
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userInfo", JSON.stringify(user));
      await addUser(user.displayName, user.email); // Wait for the user to be added
      window.location.href = "/homepage";
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

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
        <button
          className="flex items-center w-full justify-center gap-2 bg-white px-8 py-3 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="text-xl" />
          <span>Sign In with Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
