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
const db = getFirestore(app); // เพิ่มนี้เข้าไป

const fetchData = async () => {
  const colRef = collection(db, "data");
  const snapshot = await getDocs(colRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};
const fetchDataByStudentId = async (studentId) => {
  const colRef = collection(db, "data");
  const snapshot = await getDocs(colRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter data by studentId
  const filteredData = data.filter((item) => item.studentId === studentId);

  return filteredData;
};

const fetchDataByPoint = async (studentId) => {
  const colRef = collection(db, "SavePoint");
  const snapshot = await getDocs(colRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter data by studentId
  const filteredData = data.filter((item) => item.studentId === studentId);

  return filteredData;
};

export { fetchDataByPoint, fetchData, fetchDataByStudentId, addDoc, doc, db };
