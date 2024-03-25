import "../styles/login.css";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const Hearderlogin = () => {
    navigate("/Consent_Conditions");
  };
  return (
    <>
      <Form>
        <div className="login">
          <div className="body">
            <h4>กรุณาป้อนรหัสประจำตัวและรหัสผ่าน</h4>
            <div className="username">
              <Form.Item
                label="รหัสประจำตัวนักศึกษา"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="password">
              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
            <div className="loginsummit">
              <Button onClick={Hearderlogin}>Login</Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default Login;
