import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Login failed';
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center w-full'>
      <Card className='w-1/3 border-black rounded-xl shadow-2xl'>
        <h1 className='text-center text-3xl mb-5 text-black'>Login</h1>
        <Form
          name="basic"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'An email address is required.' }]}
          >
            <Input placeholder="Email" value={email} onChange={handleEmailChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'A password is required.' }]}
          >
            <Input.Password placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-full bg-[#0756da] rounded-lg' icon={<UsergroupAddOutlined />}>
              Login
            </Button>
          </Form.Item>
          <div className='text-center bg-gray-200 p-2 rounded-lg'>
            <span>Don&apos;t have an account? </span>
            <NavLink to="/signup" className='text-[#0756da]'>Sign Up</NavLink>
          </div>
        </Form>
      </Card>
    </div>
  );
}