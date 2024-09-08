import { useEffect, useState } from "react";
import Header from "../Hearder/Hearder";
import { fetchDataByStudentId, fetchDataByPoint } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [recordStudent, setRecordStudent] = useState(null);

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      setStudentId(storedStudentId);
      fetchDataByStudentId(storedStudentId).then((data) => {
        setStudentData(data);
        setIsLoading(false);
      });
      fetchDataByPoint(storedStudentId).then((data) => {
        setRecordStudent(data);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            ข้อมูลนักศึกษา
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
            </div>
          ) : studentData ? (
            studentData.map((student) => (
              <div key={student.id} className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <span className="font-medium">รหัสประจำตัวนักศึกษา:</span>{" "}
                  {student.studentId}
                </p>
                <p className="text-lg">
                  <span className="font-medium">ชื่อ-นามสกุล:</span>{" "}
                  {student.firstName} {student.lastName}
                </p>
                <p className="text-lg">
                  <span className="font-medium">คณะ:</span> {student.faculty}
                </p>
                <p className="text-lg">
                  <span className="font-medium">สาขา:</span> {student.major}
                </p>
              </div>
            ))
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลนักศึกษา</p>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
