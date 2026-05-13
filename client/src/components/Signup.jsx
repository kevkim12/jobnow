import {
  CheckCircleOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utility/Validation";
import BrandLogo from "./layout/BrandLogo";
import Footer from "./layout/Footer";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        setError("Email already exists.");
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
    <div className="page-shell">
      <main className="content-wrap grid min-h-[calc(100vh-5rem)] items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="surface-card mx-auto w-full max-w-md p-6 sm:p-8">
          <BrandLogo showTagline />
          <div className="mt-8">
            <p className="eyebrow">Create account</p>
            <h1 className="mt-3 text-3xl font-black text-slate-950">
              Start saving better matches.
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              A few details get your JobNow account ready.
            </p>
          </div>

          {error && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <Form
            name="signup"
            onFinish={handleSignup}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            className="mt-7"
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
                className="!min-h-11 !rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Email address"
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
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!min-h-11 !rounded-md"
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
                className="!min-h-11 !rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="!h-12 !w-full !rounded-md !bg-teal-500 !font-black !text-slate-950 hover:!bg-teal-400"
                icon={<UserAddOutlined />}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </section>

        <section className="relative hidden min-h-[640px] overflow-hidden rounded-md bg-slate-950 lg:block">
          <img
            src="/moving-out-image.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="eyebrow text-orange-300">Why join</p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              Keep flexible work within reach.
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                "Save gigs you want to revisit",
                "Move between gigs and job search",
                "Use a cleaner account workspace",
              ].map((item) => (
                <p
                  className="flex items-center gap-3 font-semibold text-slate-100"
                  key={item}
                >
                  <CheckCircleOutlined className="text-teal-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
