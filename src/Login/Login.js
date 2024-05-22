import "../styles/login.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../firebase/firebase";
import React, { useState, useEffect } from "react";
import Header from "../Hearder/Hearder";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (fetchedData && studentId.trim() !== "") {
      const foundStudent = fetchedData.find(
        (data) => data.studentId === studentId
      );

      if (foundStudent) {
        localStorage.setItem("studentId", studentId);

        navigate("/Consent_Conditions");
      } else {
        alert("ไม่พบรหัสนักศึกษา");
      }
    } else {
      console.log("Data not fetched or studentId is empty.");
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setFetchedData(data);
    });
  }, []);

  return (
    <>
      <Form>
        <div className="login">
          <div className="body">
            <h4>กรุณาป้อนรหัสประจำตัวและรหัสผ่าน</h4>
            <div className="username">
              <Form.Item
                label="รหัสประจำตัวนักศึกษา"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input onChange={(e) => setStudentId(e.target.value)} />
              </Form.Item>
            </div>
            <div className="password">
              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
            <div className="loginsummit">
              <Button onClick={handleLogin}>Login</Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
