import React from "react";
import Header from "../Hearder/Hearder";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl w-[600px] grid grid-cols-2">
          <div className="flex justify-center items-center bg-gradient-to-r from-green-400 to-teal-500 rounded-l-2xl text-white">
            <h1 className="text-2xl font-bold tracking-wide">AdminPage</h1>
          </div>

          <div className="flex flex-col justify-center items-center space-y-6 p-8 bg-white rounded-r-2xl">
            <Link to="/Student" className="w-full">
              <Button
                className="w-full"
                type="primary"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                ประวัติการประเมินนักศึกษา
              </Button>
            </Link>
            <Button
              className="w-full"
              type="primary"
              style={{
                backgroundColor: "#81C784",
                borderColor: "#81C784",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              การประเมินวันนี้
            </Button>
            <Link to="/" className="w-full">
              <Button
                className="w-full"
                type="primary"
                style={{
                  backgroundColor: "#E57373",
                  borderColor: "#E57373",
                  fontWeight: "bold",
                  fontSize: "16px",
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
