import {
  MailOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utility/Validation";
import { useAuth } from "./AuthContext";
import Footer from "./layout/Footer";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const { name, email, password } = values;

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      navigate("/registration-successful");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email already exists!");
      } else {
        const errorMessage = error.response
          ? error.response.data.error
          : "Signup failed";
        console.error(errorMessage);
        setError(errorMessage);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Card className="w-3/4 border-black shadow-2xl lg:w-1/3 md:w-1/2 rounded-xl">
          <h1 className="mb-2 text-3xl text-center text-black">Sign Up</h1>
          <h1 className="mb-4 text-lg text-center">
            Just a few quick things to get started!
          </h1>
          {error && (
            <div className="mb-2 text-center text-red-600">{error}</div>
          )}
          <Form
            name="basic"
            onFinish={handleSignup}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "A name is required." },
                {
                  validator: (_, value) =>
                    validateName(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Name must be alphanumeric and between 2 to 20 characters long"
                          )
                        ),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "An email address is required." },
                {
                  validator: (_, value) =>
                    validateEmail(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error("Invalid email format.")),
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "A password is required." },
                {
                  validator: (_, value) =>
                    validatePassword(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Password must be at least 8 characters long and contain at least 1 digit, 1 uppercase, 1 lowercase character, and 1 special character."
                          )
                        ),
                },
              ]}
            >
              <Input.Password
                prefix={<SafetyCertificateOutlined />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#0756da] rounded-lg"
                icon={<UserAddOutlined />}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
