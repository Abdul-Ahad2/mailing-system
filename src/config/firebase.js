import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzgbenwX3x71ckd26RR5v-hpZLmnLNDgY",
  authDomain: "mailing-system-59701.firebaseapp.com",
  projectId: "mailing-system-59701",
  storageBucket: "mailing-system-59701.firebasestorage.app",
  messagingSenderId: "722655338681",
  appId: "1:722655338681:web:4ef37bc40ebef826513b68",
  measurementId: "G-WF7MXZN26H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
