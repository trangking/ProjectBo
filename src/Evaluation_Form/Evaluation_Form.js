import React, { useState } from "react";
import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Evaluation.css";
import { Button, Checkbox, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Evaluation_Form = () => {
  const navigate = useNavigate();
  const [checkedValues, setCheckedValues] = useState({});
  const [point, setpoint] = useState(0);
  const [pointZero, setpointZero] = useState(0);
  const [checkbox, setcheckbox] = useState(false);
  const calculatePoint = async (key, value) => {
    const newCheckedValues = { ...checkedValues, [key]: value };
    let totalPoint = 0;
    Object.values(newCheckedValues).forEach((value) => {
      totalPoint += value === "มี" ? 1 : 0;
    });
    setCheckedValues(newCheckedValues);
    await setpoint(totalPoint);
    await setpointZero(totalPoint);
    localStorage.setItem("pointZero", JSON.stringify(pointZero));
    setcheckbox(true);
  };
  const columns = [
    {
      title: "",
      dataIndex: "name",
    },
    {
      title: "มี",
      dataIndex: "มี",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "มี"}
          onChange={(e) =>
            calculatePoint(record.key, e.target.checked ? "มี" : "")
          }
        />
      ),
    },
    {
      title: "ไม่มี",
      dataIndex: "ไม่มี",
      render: (text, record) => (
        <Checkbox
          checked={checkedValues[record.key] === "ไม่มี"}
          onChange={(e) =>
            calculatePoint(record.key, e.target.checked ? "ไม่มี" : "")
          }
        />
      ),
    },
  ];
  const HandbleSummit = () => {
    if (checkbox === true) {
      if (point >= 1) {
        navigate("/Evaluation2");
      } else {
        navigate("/EvaluationFinish");
        localStorage.setItem("setpoint", JSON.stringify(point));
      }
    }
  };

  const data = [
    {
      key: "1",
      name: "ใน 2 สัปดาห์ที่ผ่านมา รวมถึงวันนี้ ท่านรู้สึกไม่สบายใจ เซ็ง ทุกข์ใจ เศร้า หรือท้อแท้สิ้นหวัง หรือไม่",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
    {
      key: "2",
      name: "ใน 2 สัปดาห์ที่ผ่านมา รวมถึงวันนี้ ท่านรู้สึกเบื่อ ไม่อยากพูดไม่อยากทำอะไร หรือทำอะไรไม่เพลิดเพลินเหมือนเดิมหรือไม่",
      มี: <Checkbox></Checkbox>,
      ไม่มี: <Checkbox></Checkbox>,
    },
  ];

  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="Evaluation">
            <div className="HeaderEvaluation">
              <p>แบบประเมินภาวะซึมเศร้า 2 คำถาม (2Q)</p>
            </div>
            <div className="body">
              <Table columns={columns} dataSource={data}></Table>
            </div>
            <div className="ControlButton">
              <Button onClick={HandbleSummit}>ส่งคำตอบ</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluation_Form;
