import { UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { validateEmail, validatePassword, validateUsername } from '../utility/validation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (values) => {
    const { name, email, password } = values;

    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', { name, email, password });
      console.log('Signup Success:', response.data.message);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Signup failed';
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center w-full'>
      <Card className='w-1/3 border-black rounded-xl shadow-2xl'>
        <h1 className='text-center text-3xl mb-5 text-black'>Sign Up</h1>
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
              { required: true, message: 'A name is required.' },
              { validator: (_, value) => (validateUsername(value) ? Promise.resolve() : Promise.reject(new Error('Name must be alphanumeric and between 2 to 20 characters long'))) }
            ]}
          >
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'An email address is required.' },
              { validator: (_, value) => (validateEmail(value) ? Promise.resolve() : Promise.reject(new Error('Invalid email format'))) }
            ]}
          >
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'A password is required.' },
              { validator: (_, value) => (validatePassword(value) ? Promise.resolve() : Promise.reject(new Error('Password must be at least 8 characters long and contain at least 1 digit, 1 uppercase, and 1 lowercase character'))) }
            ]}
          >
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-full bg-[#0756da] rounded-lg' icon={<UserAddOutlined />}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}