import React, { useEffect, useState } from "react";
import Header from "../Hearder/Hearder";
import "../styles/login.css";
import "../styles/Menu.css";
import { fetchDataByStudentId, fetchDataByPoint } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "antd";
const Record = () => {
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
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="record">
            <div className="body">
              <h2>ข้อมูลนักศึกษา</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                studentData && (
                  <>
                    {studentData.map((student) => (
                      <div key={student.id}>
                        <p>รหัสประจำตัวนักศึกษา: {student.studentId}</p>
                        <p>
                          ชื่อ-นามสกุล: {student.firstName} {student.lastName}
                        </p>
                        <p>คณะ: {student.faculty}</p>
                        <p>สาขา: {student.major}</p>
                      </div>
                    ))}
                  </>
                )
              )}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">รอบ</TableCell>
                      <TableCell align="center">คะแนนของคุณคือ</TableCell>
                      <TableCell align="center">อาการ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      recordStudent &&
                      recordStudent.map((record, index) => (
                        <TableRow key={record.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{record.point}</TableCell>
                          <TableCell align="center">{record.message}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onClick={() => navigate("/menu")}
              >
                ย้อนกลับ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Record;
