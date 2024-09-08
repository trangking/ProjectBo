import React, { useState, useEffect } from "react";
import Header from "../Hearder/Hearder";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, fetchData } from "../firebase/firebase";
import { Image } from "antd";

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
                Name: foundStudent.Name || "",
                major: foundStudent.major || "",
                student_Year: foundStudent.student_year || "",
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

  // Corrected ImageLevel array
  const ImageLevel = [
    { level: 1, path: "/Level/LV1.png" }, // 0-4 points
    { level: 2, path: "/Level/LV2.png" }, // 5-8 points
    { level: 3, path: "/Level/LV3.png" }, // 9-14 points
    { level: 4, path: "/Level/LV4.png" }, // 15-19 points
    { level: 5, path: "/Level/LV5.png" }, // 20-27 points
  ];

  // Logic to select image based on score
  const getImageForLevel = (points) => {
    if (points >= 0 && points <= 4) return ImageLevel[0].path;
    if (points >= 5 && points <= 8) return ImageLevel[1].path;
    if (points >= 9 && points <= 14) return ImageLevel[2].path;
    if (points >= 15 && points <= 19) return ImageLevel[3].path;
    if (points >= 20 && points <= 27) return ImageLevel[4].path;
    return null;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center bg-gray-100 w-full">
        <div
          className="bg-white p-8 rounded-lg shadow-md  max-w-screen-2xl text-center "
          style={{ border: "1px solid" }}
        >
          <h1 className="text-3xl font-semibold mb-4">
            คะแนนของคุณคือ {point}
          </h1>
          <h2 className={`text-2xl font-semibold ${getColorClass(point)}`}>
            {message}
          </h2>
          {/* Display image based on score */}
          <Image src={getImageForLevel(point)} alt="Level image" />
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
