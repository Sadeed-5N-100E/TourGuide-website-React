import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import './Login.css';
import gotour from './gotour.png';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('tourist');
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/signup-guide') {
      setUserType('tourguide');
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("username",values.email)
    bodyFormData.append("password",values.email)
    bodyFormData.append("user_type",userType)

    try {
      // console.log(JSON.stringify({ username: values.email,
      //   password:values.password,user_type:userType}))
      const response = await fetch('http://gotour.today/api/auth/token',
        {
     method:"POST", 
      body: JSON.stringify({ username: values.email,
        password:values.password,user_type:userType}),
        credentials:"include",
        accept:"application/json",
        headers:{"Content-type":"application/json"},
    });
      // console.log(response)
      const data = await response.json();
      if (data.access_token) {
        message.success('Login successful');
        
        localStorage.setItem('token', data.access_token);
        navigate('/tourist');       
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
       
        message.error(`Server responded with: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
   
        message.error('No response received from the server');
      } else {
      
        message.error('Error setting up the request');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container" style={{ background: 'linear-gradient(45deg, #1a237e, #283593, #3f51b5)', padding: '0 20px' }}>
      <div className="image-container">
        <img src={gotour} alt="Login" className="login-image" />
      </div>
      <div className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '-50px' }}>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
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
            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#3f51b5', borderColor: '#3f51b5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="signup-link">
          Don't have an account? <Button type="primary" onClick={() => window.location.href = userType === 'tourguide' ? "./signup-guide" : "./signup"} style={{ backgroundColor: '#1a237e', borderColor: '#1a237e' }}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;