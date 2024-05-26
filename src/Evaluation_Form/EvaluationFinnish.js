import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Evaluation.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, fetchData } from "../firebase/firebase";

const EvaluationFinish = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [pointZero, setpointZero] = useState();
  const [fetchedDatas, setFetchedData] = useState(null);
  const [student, setStudent] = useState([]);
  const senttofinnish = JSON.parse(localStorage.getItem("senttofinnish"));

  const message = localStorage.getItem("message");
  const point = localStorage.getItem("point");

  const studentId = localStorage.getItem("studentId");
  const Handblegomenu = () => {
    navigate("/Menu");
    localStorage.removeItem("point");
    localStorage.removeItem("message");
    localStorage.removeItem("pointZero");
    localStorage.removeItem("senttofinnish");
    localStorage.removeItem("setpoint");
  };
  useEffect(() => {
    const initializeData = async () => {
      const data = await fetchData();
      setFetchedData(data);

      const studentId = localStorage.getItem("studentId");
      if (data && studentId && studentId.trim() !== "") {
        const foundStudent = data.find((data) => data.studentId === studentId);
        setStudent(foundStudent);
        if (foundStudent) {
          const sendDataToFirebase = async () => {
            try {
              const colRef = collection(db, "SavePoint");
              const currentDate = new Date();
              const day = currentDate.getDate().toString().padStart(2, "0");
              const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = currentDate.getFullYear().toString();
              const formattedDate = `${day}/${month}/${year}`;

              await addDoc(colRef, {
                studentId: studentId,
                firstName: foundStudent.firstName || "",
                lastName: foundStudent.lastName || "",
                major: foundStudent.major || "",
                faculty: foundStudent.faculty || "",
                message: message,
                pointZero: pointZero,
                point: point,
                date: formattedDate,
              });
              console.log("Evaluation results added to Firebase successfully!");
            } catch (error) {
              console.error(
                "Error adding evaluation results to Firebase: ",
                error
              );
            }
          };
          if (message && pointZero) {
            sendDataToFirebase();
          }
        }
      }
    };
    initializeData();
    const pointZero = localStorage.getItem("pointZero");
    if (senttofinnish) {
      setdata(senttofinnish);
    }
    if (pointZero) {
      setpointZero(pointZero);
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
  const getColorClass = (point) => {
    const points = parseInt(point);
    if (points <= 7) {
      return "green";
    } else if (points >= 8 && points <= 12) {
      return "yellow";
    } else if (points >= 13 && points <= 18) {
      return "orange";
    } else if (points >= 19) {
      return "red";
    } else {
      return "";
    }
  };
  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="EvaluationFinnish">
            <div className="body">
              <h1>คะแนนของคุณคือ {data[0].point}</h1>

              <h2 className={getColorClass(data[0].point)}>
                {data[0].message}
              </h2>

              <Button onClick={Handblegomenu}>กลับไปหน้าเมนู</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluationFinish;
