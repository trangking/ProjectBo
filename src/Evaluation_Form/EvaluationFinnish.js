import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Evaluation.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const EvaluationFinish = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [pointZero, setpointZero] = useState();
  const Handblegomenu = () => {
    navigate("/Menu");
    localStorage.removeItem("point");
    localStorage.removeItem("message");
    localStorage.removeItem("pointZero");
    localStorage.removeItem("senttofinnish");
    localStorage.removeItem("setpoint");
  };
  useEffect(() => {
    const senttofinnish = JSON.parse(localStorage.getItem("senttofinnish"));

    const message = localStorage.getItem("message"); // แก้ senttofinnish เป็น message
    const point = localStorage.getItem("point"); // เพิ่มการดึงข้อมูล point จาก localStorage
    const pointZero = localStorage.getItem("pointZero");
    const studentId = localStorage.getItem("studentId");
    if (senttofinnish) {
      setdata(senttofinnish);
    }
    if (pointZero) {
      setpointZero(pointZero);
    }
    const sendDataToFirebase = async () => {
      try {
        const colRef = collection(db, "SavePoint");
        await addDoc(colRef, {
          studentId: studentId,
          message: message,
          pointZero: pointZero,
          point: point,
        });
        console.log("Evaluation results added to Firebase successfully!");
      } catch (error) {
        console.error("Error adding evaluation results to Firebase: ", error);
      }
    };
    if (message && pointZero) {
      // แก้ senttofinnish เป็น message
      sendDataToFirebase();
    }
  }, []);

  if (!data || data.length === 0 || pointZero === 0) {
    return (
      <>
        <Header />
        <div className="App">
          <div className="App-background">
            <div className="EvaluationFinnish">
              <div className="body">
                <h1>คุณไม่มีภาวะซึมเศร้า</h1>

                <Button onClick={Handblegomenu}>กลับไปหน้าเมนู</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="EvaluationFinnish">
            <div className="body">
              <h1>คะแนนของคุณคือ {data[0].point}</h1>
              <h2>{data[0].message}</h2>

              <Button onClick={Handblegomenu}>กลับไปหน้าเมนู</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluationFinish;
