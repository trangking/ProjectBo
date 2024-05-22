import { useEffect, useState } from "react";
import Header from "../Hearder/Hearder";
import "../styles/login.css";
import "../styles/Menu.css";
import { fetchDataByStudentId, fetchDataByPoint } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // เพิ่ม state เพื่อตรวจสอบว่ากำลังโหลดหรือไม่
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [recordStudent, setrecordStudent] = useState(null);

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      setStudentId(storedStudentId);
      fetchDataByStudentId(storedStudentId).then((data) => {
        setStudentData(data);
        setIsLoading(false); // เมื่อโหลดข้อมูลเสร็จสิ้น กำหนดให้ isLoading เป็น false
      });
      fetchDataByPoint(storedStudentId).then((data) => {
        setrecordStudent(data);
        setIsLoading(false); // เมื่อโหลดข้อมูลเสร็จสิ้น กำหนดให้ isLoading เป็น false
      });
    }
    console.log(recordStudent);
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="Menu">
            <div className="body">
              <h2>ข้อมูลนักศึกษา</h2>
              {isLoading ? (
                // หาก isLoading เป็น true แสดงข้อความ loading
                <p>Loading...</p>
              ) : (
                // หาก isLoading เป็น false แสดงข้อมูลนักศึกษา
                studentData &&
                studentData.map((student) => (
                  <div key={student.id}>
                    <p>รหัสประจำตัวนักศึกษา: {student.studentId}</p>
                    <p>
                      ชื่อ-นามสกุล: {student.firstName} {student.lastName}
                    </p>
                    <p>คณะ: {student.faculty}</p>
                    <p>สาขา: {student.major}</p>
                  </div>
                ))
              )}
              <button
                onClick={() => {
                  navigate("/menu");
                }}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
