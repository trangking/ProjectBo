import "../App.css";
import "../styles/login.css";
import "../styles/Menu.css";
import Header from "../Hearder/Hearder";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const Menu = () => {
  const navigate = useNavigate();
  const HadleGoHome = () => {
    navigate("/");
  };
  const HadleGoEvaluation = () => {
    navigate("/Evaluation_Form");
  };
  return (
    <>
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="Menu">
            <div className="body">
              <div className="HeadMenu">
                <h3>MENU</h3>
              </div>
              <Button onClick={HadleGoEvaluation}>ทำแบบทดสอบ</Button>
              <Button>ประวัติการทำแบบทดสอบ</Button>
              <Button>ข้อมูลนักศึกษา</Button>
              <Button type="primary" danger onClick={HadleGoHome}>
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
