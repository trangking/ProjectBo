import React, { useState, useEffect } from "react";
import Header from "../Hearder/Hearder";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, fetchData } from "../firebase/firebase";

const EvaluationFinish = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pointZero, setPointZero] = useState(0);
  const [student, setStudent] = useState({});
  const [isDataSent, setIsDataSent] = useState(false);

  const message = localStorage.getItem("message");
  const point = parseInt(localStorage.getItem("point"), 10); // แปลงคะแนนเป็นตัวเลข
  const studentId = localStorage.getItem("studentId");

  const handleGoMenu = () => {
    navigate("/Menu");
    localStorage.removeItem("point");
    localStorage.removeItem("message");
    localStorage.removeItem("pointZero");
    localStorage.removeItem("senttofinnish");
    localStorage.removeItem("setpoint");
  };

  useEffect(() => {
    const initializeData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);

      const storedPointZero = localStorage.getItem("pointZero");
      setPointZero(storedPointZero ? parseInt(storedPointZero, 10) : 0);

      if (fetchedData && studentId) {
        const foundStudent = fetchedData.find(
          (student) => student.studentId === studentId
        );
        setStudent(foundStudent);

        if (foundStudent && !isDataSent) {
          const sendDataToFirebase = async () => {
            try {
              const colRef = collection(db, "SavePoint");
              const currentDate = new Date().toLocaleDateString("th-TH");

              await addDoc(colRef, {
                studentId: studentId,
                firstName: foundStudent.firstName || "",
                lastName: foundStudent.lastName || "",
                major: foundStudent.major || "",
                faculty: foundStudent.faculty || "",
                message: message || "ไม่มีข้อมูล",
                pointZero: pointZero,
                point: point || 0,
                date: currentDate,
              });

              setIsDataSent(true);
            } catch (error) {
              console.error(
                "Error adding evaluation results to Firebase: ",
                error
              );
            }
          };
          sendDataToFirebase();
        }
      }
    };

    initializeData();
  }, [isDataSent, studentId, pointZero, message, point]);

  const getColorClass = (points) => {
    if (points <= 7) return "text-green-500";
    if (points >= 8 && points <= 12) return "text-yellow-500";
    if (points >= 13 && points <= 18) return "text-orange-500";
    if (points >= 19) return "text-red-500";
    return "";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
          <h1 className="text-3xl font-semibold mb-4">
            คะแนนของคุณคือ {point}
          </h1>
          <h2 className={`text-2xl font-semibold ${getColorClass(point)}`}>
            {message}
          </h2>
          <div className="mt-6">
            <button
              onClick={handleGoMenu}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              กลับไปหน้าเมนู
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluationFinish;
