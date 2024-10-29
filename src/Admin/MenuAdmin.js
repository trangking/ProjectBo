import React from "react";
import Header from "../Hearder/Hearder";
import { Button, Image } from "antd";
import { Link } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[600px] grid grid-cols-2 overflow-hidden">
          <div className="flex justify-center items-center bg-gradient-to-r from-teal-400 to-teal-600">
            <Image
              src="/Level/logomju.png"
              width={180}
              height={80}
              preview={false}
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center items-center space-y-8 p-10 bg-white">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              เมนูผู้ดูแลระบบ
            </h2>

            <Link to="/Student" className="w-full">
              <Button
                className="w-full "
                type="primary"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "12px",
                }}
              >
                ประวัติการประเมินนักศึกษา
              </Button>
            </Link>

            <Link to="/Symptom" className="w-full">
              <Button
                className="w-full"
                type="primary"
                style={{
                  backgroundColor: "#81C784",
                  borderColor: "#81C784",
                  fontWeight: "bold",
                  fontSize: "16x",
                  borderRadius: "12px",
                }}
              >
                ค้นการตามอาการ
              </Button>
            </Link>
            <Link to="/Graph" className="w-full">
              <Button
                className="w-full"
                type="primary"
                style={{
                  backgroundColor: "#89C754",
                  borderColor: "#81C784",
                  fontWeight: "bold",
                  fontSize: "16x",
                  borderRadius: "12px",
                }}
              >
                สรุปรายเดือน
              </Button>
            </Link>

            <Link to="/" className="w-full">
              <Button
                className="w-full "
                type="primary"
                style={{
                  backgroundColor: "#E57373",
                  borderColor: "#E57373",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                ออกจากระบบ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
