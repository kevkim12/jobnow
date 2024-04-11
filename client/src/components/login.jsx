import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';

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
        <h1 className='text-center text-3xl mb-5 text-[#455a64]'>Login</h1>
        <Form
          name="basic"
          // form={form}
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
              },]}
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
              },]}
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
          {/* <div className='text-center'>
            <a href="/">Back to Home</a>
          </div> */}
          <div className='text-center bg-gray-200 p-2 rounded-lg'>
            <span>Don&apos;t have an account? </span>
            <a href="" className='text-[#0756da]'>Sign Up</a>
          </div>
        </Form>
      </Card>
    </div >
  )
}