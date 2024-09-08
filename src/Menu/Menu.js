import React from "react";
import Header from "../Hearder/Hearder";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const HadleGoHome = () => {
    navigate("/");
    localStorage.clear();
  };

  const HadleGoEvaluation = () => {
    navigate("/Evaluation_Form");
  };

  const StudentPage = () => {
    navigate("/StudentPage");
  };

  const Record = () => {
    navigate("/Record");
  };

  return (
    <>
      <div className="min-h-screen bg-green-100 flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-lg">
          <div className="text-center mb-4">
            <h3 className="text-3xl font-semibold text-gray-800">MENU</h3>
            <div className="border-t-2 border-green-500 w-full mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            <button
              onClick={HadleGoEvaluation}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transition duration-300"
            >
              ทำแบบทดสอบ
            </button>

            <button
              onClick={Record}
              className="w-full py-3 bg-yellow-500 text-white rounded-lg font-medium text-lg hover:bg-yellow-600 transition duration-300"
            >
              ประวัติการทำแบบทดสอบ
            </button>

            <button
              onClick={StudentPage}
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-medium text-lg hover:bg-gray-300 transition duration-300"
            >
              ข้อมูลนักศึกษา
            </button>

            <div className="border-t-2 border-green-500 w-full mx-auto mt-4"></div>
            <button
              onClick={HadleGoHome}
              className="w-full py-3 bg-red-500 text-white rounded-lg font-medium text-lg hover:bg-red-600 transition duration-300"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
