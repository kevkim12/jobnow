import { UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { validateEmail, validatePassword, validateUsername } from '../utility/validation';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Signup() {
    return (
        <div className='h-screen flex flex-col justify-center items-center w-full'>
            <Card className='w-1/3 border-black rounded-xl shadow-2xl'>
                <h1 className='text-center text-3xl mb-5 text-black'>Sign Up</h1>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'A name is required.'
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || validateUsername(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Username must be alphanumeric and between 2 to 20 characters long'));
                                },
                            })]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'An email address is required.'
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || validateEmail(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Invalid email format'));
                                },
                            }),]}
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
                            () => ({
                                validator(_, value) {
                                    if (!value || validatePassword(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password must be at least 8 characters long and contain at least 1 digit, 1 uppercase, and 1 lowercase character'));
                                },
                            }),]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className='w-full bg-[#0756da] rounded-lg'
                            icon={<UserAddOutlined />}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}