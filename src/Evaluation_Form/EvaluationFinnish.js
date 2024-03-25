import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/Evaluation.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EvaluationFinish = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [pointZero, setpointZero] = useState();
  const Handblegomenu = () => {
    navigate("/Menu");
    localStorage.clear();
  };
  useEffect(() => {
    const senttofinnish = JSON.parse(localStorage.getItem("senttofinnish"));
    const pointZero = JSON.parse(localStorage.getItem("pointZero"));
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
