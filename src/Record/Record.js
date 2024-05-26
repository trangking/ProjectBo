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
  const [recordStudent, setRecordStudent] = useState(null);

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      fetchDataByPoint(storedStudentId).then((data) => {
        setRecordStudent(data);
        setIsLoading(false);
      });
    }
  }, []);
  const getColorClass = (point) => {
    const points = parseInt(point);
    if (points <= 7) {
      return "green";
    } else if (points >= 8 && points <= 12) {
      return "yellow";
    } else if (points >= 13 && points <= 18) {
      return "orange";
    } else if (points >= 19) {
      return "red";
    } else {
      return "";
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="record">
            <div className="body">
              <h2>ข้อมูลนักศึกษา</h2>
              {recordStudent &&
                recordStudent.length > 0 &&
                recordStudent.find(
                  (record, index, self) =>
                    self.findIndex((r) => r.id === record.id) === index
                ) && (
                  <div>
                    <p>รหัสประจำตัวนักศึกษา: {recordStudent[0].studentId}</p>
                    <p>
                      ชื่อ-นามสกุล: {recordStudent[0].firstName}{" "}
                      {recordStudent[0].lastName}
                    </p>
                    <p>คณะ: {recordStudent[0].faculty}</p>
                    <p>สาขา: {recordStudent[0].major}</p>
                  </div>
                )}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      recordStudent &&
                      recordStudent
                        .filter(
                          (record, index, self) =>
                            self.findIndex((r) => r.id === record.id) === index
                        )
                        .map((record, index) => (
                          <TableRow key={record.id}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{record.point}</TableCell>
                            <TableCell align="center">
                              {record.message}
                            </TableCell>
                            <TableCell align="center">{record.date}</TableCell>
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
