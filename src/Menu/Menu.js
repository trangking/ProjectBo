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
      <Header />
      <div className="App">
        <div className="App-background">
          <div className="Menu">
            <div className="body">
              <div className="HeadMenu">
                <h3>MENU</h3>
              </div>
              <Button onClick={HadleGoEvaluation}>ทำแบบทดสอบ</Button>
              <Button onClick={Record}>ประวัติการทำแบบทดสอบ</Button>
              <Button onClick={StudentPage}>ข้อมูลนักศึกษา</Button>
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
