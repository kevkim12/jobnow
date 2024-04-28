// Worked on by Kevin Kim and Lawrence Li

/*
This page handles the signup process for the user. It uses the Ant Design library
to create the form and input fields for the user to input their name, email, and password.
The user can then submit the form to signup through axios which communicates with the
Flask backend which handles the database. If the signup is successful, the user is
redirected to the registration successful page. If the signup fails, an error message
is displayed to the user.
*/

import { MailOutlined, SafetyCertificateOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateName, validatePassword } from '../utility/Validation';
import { useAuth } from './AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Sends a POST request to the server (Flask backend) to sign up the user. If successful, the user is redirected to the registration successful page
  const handleSignup = async (values) => {
    const { name, email, password } = values;

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", { name, email, password });
      navigate("/registration-successful");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Signup failed";
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  // Returns the signup form which uses the content above to handle the signup process
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <Card className="w-1/3 border-black rounded-xl shadow-2xl">
        <h1 className="text-center text-3xl mb-5 text-black">Sign Up</h1>
        <h1 className="text-center mb-4 text-lg">Just a few quick things to get started!</h1>
        <Form
          name="basic"
          onFinish={handleSignup}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "A name is required." },
              { validator: (_, value) => (validateName(value) ? Promise.resolve() : Promise.reject(new Error("Name must be alphanumeric and between 2 to 20 characters long"))) }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "An email address is required." },
              { validator: (_, value) => (validateEmail(value) ? Promise.resolve() : Promise.reject(new Error("Invalid email format"))) }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "A password is required." },
              { validator: (_, value) => (validatePassword(value) ? Promise.resolve() : Promise.reject(new Error("Password must be at least 8 characters long and contain at least 1 digit, 1 uppercase, 1 lowercase character, and 1 special character"))) }
            ]}
          >
            <Input.Password prefix={<SafetyCertificateOutlined />} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-[#0756da] rounded-lg" icon={<UserAddOutlined />}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
