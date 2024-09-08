import React, { useEffect, useState } from "react";
import Header from "../Hearder/Hearder";
import { fetchDataByPoint } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar"; // ใช้เพื่อแสดงรูปภาพ

const Record = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recordStudent, setRecordStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // กำหนดให้แสดงผล 5 แถวต่อหน้า

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      fetchDataByPoint(storedStudentId).then((data) => {
        // เรียงลำดับจากการทำครั้งล่าสุด
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRecordStudent(sortedData);
        setIsLoading(false);
      });
    }
  }, []);

  const getColorClass = (point) => {
    const points = parseInt(point);
    if (points <= 7) {
      return "text-green-500"; // เปลี่ยนเป็นสีเขียวเมื่อคะแนนน้อย
    } else if (points >= 8 && points <= 12) {
      return "text-yellow-500"; // เปลี่ยนเป็นสีเหลืองเมื่อคะแนนปานกลาง
    } else if (points >= 13 && points <= 18) {
      return "text-orange-500"; // เปลี่ยนเป็นสีส้มเมื่อคะแนนมากขึ้น
    } else if (points >= 19) {
      return "text-red-500"; // เปลี่ยนเป็นสีแดงเมื่อคะแนนสูง
    } else {
      return "";
    }
  };

  // กำหนด pagination
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // หารายการที่จะแสดงในแต่ละหน้า
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = recordStudent.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            ข้อมูลนักศึกษา
          </h2>

          {recordStudent && recordStudent.length > 0 && (
            <div className="flex items-center mb-6">
              <Avatar
                alt="Student Photo"
                src="https://via.placeholder.com/150" // ใส่ URL รูปภาพที่นี่
                sx={{ width: 100, height: 100 }}
                className="mr-6"
              />
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">รหัสประจำตัวนักศึกษา:</span>{" "}
                  {recordStudent[0].studentId}
                </p>
                <p>
                  <span className="font-medium">ชื่อ-นามสกุล:</span>{" "}
                  {recordStudent[0].firstName} {recordStudent[0].lastName}
                </p>
                <p>
                  <span className="font-medium">คณะ:</span>{" "}
                  {recordStudent[0].faculty}
                </p>
                <p>
                  <span className="font-medium">สาขา:</span>{" "}
                  {recordStudent[0].major}
                </p>
              </div>
            </div>
          )}

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">รอบ</TableCell>
                  <TableCell align="center">คะแนนของคุณคือ</TableCell>
                  <TableCell align="center">อาการ</TableCell>
                  <TableCell align="center">วันที่ทำแบบทดสอบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  currentRows.map((record, index) => (
                    <TableRow key={record.id}>
                      <TableCell align="center">
                        {indexOfFirstRow + index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={getColorClass(record.point)}
                      >
                        {record.point}
                      </TableCell>
                      <TableCell align="center">{record.message}</TableCell>
                      <TableCell align="center">{record.date}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil(recordStudent.length / rowsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </div>

          {/* ปุ่มย้อนกลับ */}
          <div className="mt-6 text-right">
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

export default Record;
