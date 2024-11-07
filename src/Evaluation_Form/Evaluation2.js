import React, { useState, useEffect, useContext } from "react";
import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Evaluation.css";
import { Button, Checkbox, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Evaluation2 = () => {
  const navigate = useNavigate();
  const [checkedValues, setCheckedValues] = useState({});
  const [point, setpoint] = useState(0);
  const [checkbox, setcheckbox] = useState(false);
  const [senttofinnish, setsenttofinnish] = useState([]);
  const calculatePoint = (key, value) => {
    const newCheckedValues = { ...checkedValues, [key]: value };
    let totalPoint = 0;
    Object.values(newCheckedValues).forEach((value) => {
      switch (value) {
        case "ไม่มีเลย":
          totalPoint += 0;
          break;
        case "เป็นบางวัน 1-7 วัน":
          totalPoint += 1;
          break;
        case "เป็นบ่อย > 7 วัน":
          totalPoint += 2;
          break;
        case "เป็นทุกวัน":
          totalPoint += 3;
          break;
        default:
          totalPoint += 0;
      }
    });
    setCheckedValues(newCheckedValues);
    setpoint(totalPoint);
    setcheckbox(true);
  };
  const columns = [
    {
      title: "ข้อ",
      dataIndex: "name",
    },
    {
      title: "ไม่มีเลย ( 0 คะแนน)",
      dataIndex: "ไม่มีเลย ( 0 คะแนน)",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "ไม่มีเลย"}
          onChange={(e) =>
            calculatePoint(record.key, e.target.checked ? "ไม่มีเลย" : "")
          }
        />
      ),
    },
    {
      title: "เป็นบางวัน 1-7 วัน (1 คะแนน)",
      dataIndex: "เป็นบางวัน 1-7 วัน (1 คะแนน)",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "เป็นบางวัน 1-7 วัน"}
          onChange={(e) =>
            calculatePoint(
              record.key,
              e.target.checked ? "เป็นบางวัน 1-7 วัน" : ""
            )
          }
        />
      ),
    },
    {
      title: "เป็นบ่อย > 7 วัน (2 คะแนน)",
      dataIndex: "เป็นบ่อย > 7 วัน (2 คะแนน)",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "เป็นบ่อย > 7 วัน"}
          onChange={(e) =>
            calculatePoint(
              record.key,
              e.target.checked ? "เป็นบ่อย > 7 วัน" : ""
            )
          }
        />
      ),
    },
    {
      title: "เป็นทุกวัน (3 คะแนน)",
      dataIndex: "เป็นทุกวัน (3 คะแนน)",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "เป็นทุกวัน"}
          onChange={(e) =>
            calculatePoint(record.key, e.target.checked ? "เป็นทุกวัน" : "")
          }
        />
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "1. เบื่อ ไม่สนใจอยากทำอะไร",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "2",
      name: "2. ไม่สบายใจ ซึมเศร้า ท้อแท้",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "3",
      name: "3. หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "4",
      name: "4. เหนื่อยง่าย หรือไม่ค่อยมีแรง",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "5",
      name: "5. เบื่ออาหาร หรือกินมากเกินไป",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "6",
      name: "6. รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเองหรือครอบครัวผิดหวัง",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "7",
      name: "7. สมาธิไม่ดี เวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "8",
      name: "8. พูดช้า ทำอะไรช้าลงจนคนอื่นสังเกตได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "9",
      name: "9. คิดทำร้ายตนเองหรือคิดว่าถ้าตายๆ ไปเสียคงจะดี",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
  ];
  const SentMessage = async () => {
    let sentfi = [];

    let messageEvaluation = "";
    switch (true) {
      case point >= 0 && point <= 7:
        messageEvaluation = "ไม่มีอาการซึมเศร้าหรือมีก็เพียงเล็กน้อย";
        break;
      case point >= 7 && point <= 12:
        messageEvaluation = " มีอาการของโรคซึมเศร้า ระดับน้อย";
        break;
      case point >= 13 && point <= 18:
        messageEvaluation = " มีอาการของโรคซึมเศร้า ระดับปานกลาง";
        break;
      case point >= 19:
        messageEvaluation = " มีอาการของโรคซึมเศร้า ระดับรุนแรง";
        break;
      default:
        break;
    }

    sentfi.push({ point: point, message: messageEvaluation });
    localStorage.setItem("senttofinnish", JSON.stringify(sentfi));
    localStorage.setItem("message", messageEvaluation);
    localStorage.setItem("point", point);
    localStorage.setItem("type", "9Q");
    await setsenttofinnish(sentfi);
    navigate("/EvaluationFinish");
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-green-700 via-yellow-500 to-green-500 flex flex-col items-center justify-center py-8">
        <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            แบบประเมินภาวะซึมเศร้า 9 คำถาม (9Q)
          </h1>
          <div className="overflow-x-auto">
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="text-center mt-6">
            <button
              onClick={SentMessage}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              ส่งคำตอบ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluation2;
