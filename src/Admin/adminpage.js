import React, { useState, useEffect } from "react";
import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { fetchData_record } from "../firebase/firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchData_record();
      setIsLoading(false);
      setData(result);
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="record">
            <div className="body">
              <div className="HeadMenu">
                <h3>Admin</h3>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">รหัสนักศึกษา</TableCell>
                      <TableCell align="center">ชื่อ</TableCell>
                      <TableCell align="center">นามสกุล</TableCell>
                      <TableCell align="center">คณะ</TableCell>
                      <TableCell align="center">สาขา</TableCell>
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
                      data &&
                      data.map((record, index) => (
                        <TableRow key={record.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {record.studentId}
                          </TableCell>
                          <TableCell align="center">
                            {record.firstName}
                          </TableCell>
                          <TableCell align="center">
                            {record.lastName}
                          </TableCell>
                          <TableCell align="center">{record.faculty}</TableCell>
                          <TableCell align="center">{record.major}</TableCell>
                          <TableCell align="center">{record.point}</TableCell>
                          <TableCell align="center">{record.message}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button type="primary" danger onClick={handleGoHome}>
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
