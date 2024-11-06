import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: procees.env.API_KEY,
  authDomain: procees.env.AUTH_DOMAIN,
  projectId: procees.env.PROJECT_ID,
  storageBucket: procees.env.STORAGE_BUCKET,
  messagingSenderId: procees.env.MESSAGING_SENDER_ID,
  appId: procees.env.APP_ID,
  measurementId: procees.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
