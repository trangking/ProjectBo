// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc, query, orderBy
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

const fetchStudent = async () => {
  const colRef = collection(db, "data");
  const snapshot = await getDocs(colRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
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
const fetchData_record = async () => {
  const db = getFirestore();
  const colRef = collection(db, "SavePoint");

  // Query the collection, ordering by 'createdAt' in descending order
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  // Map through the documents and structure the data
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

const fetchDataByPointRange = async () => {
  const colRef = collection(db, "SavePoint");
  const snapshot = await getDocs(colRef);

  // Define the levels and their point ranges
  const levels = [
    { level: 1, text: "ไม่มีอาการซึมเศร้า", color: "#8BC34A", pointRange: [0, 6] },
    {
      level: 2,
      text: "อาการซึมเศร้าเล็กน้อย",
      color: "#FFEB3B",
      pointRange: [7, 12],
    },
    {
      level: 3,
      text: "อาการซึมเศร้าปานกลาง",
      color: "#FF9800",
      pointRange: [13, 18],
    },
    {
      level: 4,
      text: "อาการซึมเศร้าค่อนข้างมาก",
      color: "#FF0000",
      pointRange: [19, 28],
    },
  ];

  // Get all data from the collection
  const allData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Create an object to store students separated by level
  const studentsByLevel = {};

  levels.forEach((level) => {
    // Filter students within the current level's point range
    const studentsInLevel = allData.filter(
      (item) =>
        item.point >= level.pointRange[0] && item.point <= level.pointRange[1]
    );

    // Store the filtered students under the level key
    studentsByLevel[level.level] = {
      levelInfo: level,
      students: studentsInLevel,
      count: studentsInLevel.length, // Store the count of students in this level
    };
  });

  return studentsByLevel;
};

export {
  fetchStudent,
  fetchDataByPoint,
  fetchData,
  fetchDataByStudentId,
  fetchData_record,
  fetchDataByPointRange,
  addDoc,
  doc,
  db,
};
