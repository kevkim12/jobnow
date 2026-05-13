import {
  MailOutlined,
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { useAuth } from "./AuthContext";
import BrandLogo from "./layout/BrandLogo";
import Footer from "./layout/Footer";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

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
    <div className="page-shell">
      <main className="content-wrap grid min-h-[calc(100vh-5rem)] items-center gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden min-h-[560px] overflow-hidden rounded-md bg-slate-950 lg:block">
          <img
            src="/home-background.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/15" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="eyebrow text-teal-300">Welcome back</p>
            <h1 className="mt-4 text-4xl font-black leading-tight">
              Pick up where your search left off.
            </h1>
            <p className="mt-4 max-w-md leading-7 text-slate-200">
              Sign in to save gigs, revisit matches, and keep your work search
              organized.
            </p>
          </div>
        </section>

        <section className="surface-card mx-auto w-full max-w-md p-6 sm:p-8">
          <BrandLogo showTagline />
          <div className="mt-8">
            <p className="eyebrow">Login</p>
            <h1 className="mt-3 text-3xl font-black text-slate-950">
              Good to see you again.
            </h1>
          </div>

          <Form
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            className="mt-7"
          >
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: "An email address is required." },
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
              rules={[{ required: true, message: "A password is required." }]}
            >
              <Input.Password
                prefix={<SafetyCertificateOutlined />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!min-h-11 !rounded-md"
              />
            </Form.Item>
            <p
              id="credential-error"
              className={`mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-700 ${
                invalidPassword ? "block" : "hidden"
              }`}
            >
              {error || "Invalid login credentials."}
            </p>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="!h-12 !w-full !rounded-md !bg-slate-950 !font-black hover:!bg-slate-800"
                icon={<UsergroupAddOutlined />}
              >
                Login
              </Button>
            </Form.Item>
            <div className="rounded-md bg-slate-50 p-3 text-center text-sm font-semibold text-slate-600">
              <span>Don&apos;t have an account? </span>
              <NavLink to="/signup" className="font-black text-teal-700">
                Sign up
              </NavLink>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
