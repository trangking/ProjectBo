import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (studentId.trim() !== "") {
      if (studentId === "comsci") {
        localStorage.setItem("studentId", studentId);
        navigate("/MenuAdmin");
      } else {
        localStorage.setItem("studentId", studentId);
        navigate("/Consent_Conditions");
      }
    } else {
      alert("กรุณาป้อนรหัสประจำตัวนักศึกษา");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://lms2.mju.ac.th/pluginfile.php/1/theme_academi/logo/1578150367/Logo_25590629105301_513998.png"
            alt="Maejo University Logo"
            className="w-36 h-28"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          เข้าสู่ระบบ
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            รหัสประจำตัวนักศึกษา
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="กรุณากรอกรหัสนักศึกษา"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            รหัสผ่าน
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="กรุณากรอกรหัสผ่าน"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 text-lg font-semibold"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};

export default Login;
