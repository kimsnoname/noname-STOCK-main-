import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card } from 'antd';
import './style/transferSuccessPage.css';

const TransferSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToTransfer = () => {
    navigate('/transfer');
  };
  const location = useLocation();
  const { selectedBankName } = location.state as { selectedBankName: string };
  const { selectedAccount } = location.state as { selectedAccount: string };
  const { transferAmount } = location.state as { transferAmount: string };

  return (


    <div className="transfer-success-container">
      <h1>이체 완료</h1>
      <div>{selectedBankName} {selectedAccount}</div>
      <h2>{transferAmount} 원</h2>
      <Button type="primary" className="back-to-transfer-button" onClick={handleBackToTransfer}>
        돌아가기
      </Button>
    </div>

  );
};

export default TransferSuccess;