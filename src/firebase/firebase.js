// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf4Z0ah45fX7YPvdnORwAcsjID1_sCpgg",
  authDomain: "maejoformdepression.firebaseapp.com",
  projectId: "maejoformdepression",
  storageBucket: "maejoformdepression.appspot.com",
  messagingSenderId: "700686568261",
  appId: "1:700686568261:web:4f40130d1b2dcb8efc0c2c",
  measurementId: "G-SH57PN24L5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const fetchData = async () => {
  const colRef = collection(db, "data");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export { fetchData };
