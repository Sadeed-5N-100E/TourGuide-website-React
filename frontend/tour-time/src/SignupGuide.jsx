import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './SignUp.css'; 
import gotour from './gotour.png';

const SignUpGuide = () => {
  return (
    <div className="signup-container" style={{ background: 'linear-gradient(45deg, #e3f2fd, #bbdefb, #90caf9)', padding: '0 20px' }}>
      <div className="image-container">
        <img src={gotour} alt="Sign Up" className="signup-image" />
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
            label={<span style={{ color: '#64b5f6' }}>Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input size="large" style={{ borderColor: '#90caf9' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#81c784' }}>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" style={{ borderColor: '#a5d6a7' }} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: '#7986cb' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#64b5f6', borderColor: '#64b5f6', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpGuide;