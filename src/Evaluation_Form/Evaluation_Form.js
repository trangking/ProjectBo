import React, { useState } from "react";
import Header from "../Hearder/Hearder";
import { useNavigate } from "react-router-dom";

const Evaluation_Form = () => {
  const navigate = useNavigate();
  const [checkedValues, setCheckedValues] = useState({});
  const [point, setPoint] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  const calculatePoint = (key, value) => {
    const newCheckedValues = { ...checkedValues, [key]: value };
    let totalPoint = 0;
    Object.values(newCheckedValues).forEach((value) => {
      totalPoint += value === "มี" ? 1 : 0;
    });

    setCheckedValues(newCheckedValues);
    setPoint(totalPoint);
    setCheckbox(true);

    // Set 'ปกติ' message in localStorage when point is 0
    if (totalPoint === 0) {
      localStorage.setItem("message", "ปกติ");
    } else {
      localStorage.removeItem("message");
    }

    localStorage.setItem("point", JSON.stringify(totalPoint));
  };

  const handleSubmit = () => {
    if (checkbox) {
      point >= 1 ? navigate("/Evaluation2") : navigate("/EvaluationFinish");
    }
  };

  const data = [
    {
      key: "1",
      name: "ใน 2 สัปดาห์ที่ผ่านมา ท่านรู้สึกไม่สบายใจ เซ็ง ทุกข์ใจ เศร้า หรือท้อแท้สิ้นหวัง หรือไม่?",
    },
    {
      key: "2",
      name: "ใน 2 สัปดาห์ที่ผ่านมา ท่านรู้สึกเบื่อ ไม่อยากทำอะไรเหมือนเดิมหรือไม่?",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            แบบประเมินภาวะซึมเศร้า 2 คำถาม (2Q)
          </h2>

          <div className="space-y-6">
            {data.map((question) => (
              <div key={question.key} className="text-gray-700">
                <p>{question.name}</p>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.key}`}
                      onClick={() => calculatePoint(question.key, "มี")}
                    />
                    <span>มี</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.key}`}
                      onClick={() => calculatePoint(question.key, "ไม่มี")}
                    />
                    <span>ไม่มี</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              ส่งคำตอบ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluation_Form;
