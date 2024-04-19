import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
// import { validateEmail, validatePassword } from '../utility/validation';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {
  return (
    <div className='h-screen flex flex-col justify-center items-center w-full'>
      <Card className='w-1/3 border-black rounded-xl shadow-2xl'>
        <h1 className='text-center text-3xl mb-5 text-black'>Login</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: 'An email address is required.'
              },
              // () => ({
              //   validator(_, value) {
              //     if (!value || validateEmail(value)) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(new Error('Invalid email format'));
              //   },
              // }),
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'A password is required.'
              },
              // () => ({
              //   validator(_, value) {
              //     if (!value || validatePassword(value)) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(new Error('Password must be at least 8 characters long and contain at least 1 digit, 1 uppercase, and 1 lowercase character'));
              //   },
              // }),
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className='w-full bg-[#0756da] rounded-lg'
              icon={<UsergroupAddOutlined />}
            >
              Login
            </Button>
          </Form.Item>
          <div className='text-center bg-gray-200 p-2 rounded-lg'>
            <span>Don&apos;t have an account? </span>
            <NavLink to={`/signup`} className='text-[#0756da]'>Sign Up</NavLink>
          </div>
        </Form>
      </Card>
    </div >
  )
}