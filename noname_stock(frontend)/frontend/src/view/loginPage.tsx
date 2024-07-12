// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style/login.css';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

interface LoginEntity {
  email: string;
  password: string; // 'pw'를 'password'로 변경
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // 'pw'를 'password'로 변경
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginEntity) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/login`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token } = response.data; // 서버가 반환하는 토큰을 가져옴
        localStorage.setItem('accessToken', token); // 토큰을 로컬 스토리지에 저장
        message.success('로그인 성공');
        navigate('/GetMyInfo');
      } else {
        message.error('로그인에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('로그인 중 오류가 발생하였습니다.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <Link to="/" className="logo-login">무명증권</Link> {/* Made the logo a clickable link */}
      <h2>로그인</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="login-form"
        initialValues={{ email, password }} // 'pw'를 'password'로 변경
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: '이메일을 입력해주세요.' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
          ]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password" // 'pw'를 'password'로 변경
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password
            className='input-password'
            value={password} // 'pw'를 'password'로 변경
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
