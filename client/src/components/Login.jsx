import {
  MailOutlined,
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { useAuth } from "./AuthContext";
import Footer from "./layout/Footer";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      login(response.data.user_id);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Login failed";
      console.error(errorMessage);
      setError(errorMessage);

      setInvalidPassword(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Card className="w-3/4 border-black shadow-2xl lg:w-1/3 md:w-1/2 rounded-xl">
          <h1 className="mb-2 text-3xl text-center text-black">Login</h1>
          <h1 className="mb-4 text-lg text-center">Hello, welcome back!</h1>
          <Form
            name="basic"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "An email address is required." },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "A password is required." }]}
            >
              <Input.Password
                prefix={<SafetyCertificateOutlined />}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Item>
            <p
              id="credential-error"
              className={`mb-2 text-center text-red-600 ${
                invalidPassword ? "visible" : "hidden"
              }`}
            >
              Invalid login credentials!
            </p>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#0756da] rounded-lg"
                icon={<UsergroupAddOutlined />}
              >
                Login
              </Button>
            </Form.Item>
            <div className="p-2 text-center bg-gray-200 rounded-lg">
              <span>Don&apos;t have an account? </span>
              <NavLink to="/signup" className="text-[#0756da]">
                Sign Up
              </NavLink>
            </div>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
