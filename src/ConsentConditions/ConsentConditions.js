import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../Hearder/Hearder";
import "../App.css";
import "../styles/login.css";
import "../styles/ConsentConditions.css";
const Consent_Conditions = () => {
  const navigate = useNavigate();
  const HandleReturnLogin = () => {
    navigate("/");
  };
  const HadleGoMenu = () => {
    navigate("/Menu");
  };
  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="ConsentConditions">
            <div className="body">
              <div className="HeaderConsentConditions">
                <h2>เงื่อนไขการยินยอม</h2>
                <p>โปรดอ่านและรับทราบเงื่อนไขก่อนทำการประเมิน</p>
                <div className="line"></div>
              </div>
              <div className="bodyConsentConditions">
                <p>
                  1.วัตถุประสงค์ของแบบประเมินโรคซึมเศร้านั้น
                  เพื่อเป็นอีกหนึ่งช่องทางกในการประเมินว่า
                  ผู้ประเมินนั้นเสี่ยงต่อโรคซึมเศร้าหรือไม่
                </p>
                <p>
                  2.การประเมินนั้นผู้เข้ารับการประเมินจะต้องประเมิน
                  ด้วยความสมัครใจและตอบตามจริงให้มากที่สุด
                </p>
                <p>
                  3.ข้อมูลที่รวบรวมจะถูกใช้เพื่อให้ความช่วยเหลือ
                  ในครั้งต่อไปหรือสามารถติดต่อได้โดยตรง ผ่านช่องทาง
                  xxx-xxx-xxxx-xxxx-xxx
                </p>
                <p>
                  4.ความยินยอม: ในการดำเนินการประเมินนี้
                  แสดงว่าคุณเข้าใจเงื่อนไขการเข้าร่วมและ
                  ความยินยอมในการเข้าร่วมการประเมิน
                </p>
              </div>
            </div>
            <div className="ControlButton">
              <Button onClick={HandleReturnLogin} type="primary" danger>
                ย้อนกลับ
              </Button>
              <Button onClick={HadleGoMenu}>ยอมรับ</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Consent_Conditions;
