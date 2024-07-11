import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import './style/welcome.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerEmail } = location.state as { registerEmail: string };

  console.log("이메일 ",registerEmail);
  const handleAccountRegister = () => {
    navigate('/accountRegistration', { state: { registerEmail }});
  };

  return (
    <div className="welcome-container">
      <h2>환영합니다!</h2>
      <h3>아래 버튼을 눌러 계좌를 개설해주세요</h3>
      <Button type="primary" className="account-register-button" onClick={handleAccountRegister}>
        계좌 개설하기
      </Button>
    </div>
  );
};

export default Welcome;