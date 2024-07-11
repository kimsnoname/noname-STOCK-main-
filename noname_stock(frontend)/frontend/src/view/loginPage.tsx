// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style/login.css';
import { Button, Form, Input, Row, Col } from 'antd';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직을 여기에 추가하세요.
    console.log('로그인 정보:', { email, password });
    navigate('/dashboard'); // 로그인 후 이동할 페이지
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <Link to="/" className="logo-login">무명증권</Link> {/* Made the logo a clickable link */}
      <h2>로그인</h2>
      <Form layout="vertical" onFinish={handleSubmit} className="login-form">
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password className='input-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-main-button">
            로그인
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={handleRegisterRedirect} className="register-button-login">
        회원가입
      </Button>
    </div>
  );
};

export default Login;
