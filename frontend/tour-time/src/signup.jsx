import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './Login.css';
import gotour from './gotour.png';

const SignUp = () => {
  return (
    <div className="login-container" style={{ background: 'linear-gradient(45deg, #1a237e, #283593, #3f51b5)', padding: '0 20px' }}>
      <div className="image-container">
        <img src={gotour} alt="Login" className="login-image" />
      </div>
      <div className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '-50px' }}>
        <Form
          name="signup"
          layout="vertical"
          style={{
            maxWidth: 400,
            margin: '0 auto',
          }}
          initialValues={{
            remember: false,
          }}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: '#3f51b5' }}>Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input size="large" style={{ borderColor: '#5c6bc0' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#3949ab' }}>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" style={{ borderColor: '#7986cb' }} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: '#283593' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#3f51b5', borderColor: '#3f51b5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="signup-link">
          Already have an account? <Button type="primary" onClick={() => {}} htmlType="submit" style={{ backgroundColor: '#1a237e', borderColor: '#1a237e' }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;