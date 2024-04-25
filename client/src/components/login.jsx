import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      login(response.data.user_id);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Login failed';
      console.error(errorMessage);
      setError(errorMessage);
      setInvalidPassword(true);
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
          <p id="credential-error" className={`text-center text-red-600 ${invalidPassword ? 'visible' : 'hidden'}`}>Invalid login credentials!</p>
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