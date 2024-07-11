import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button, Dropdown, Row, Col, Card, Form, Input, Select, Divider } from 'antd';
import SidebarLayout from './SidebarLayout';
import './style/transfer.css';

const { Option } = Select;


const banks = [
  { key: 'bank1', name: '국민은행' },
  { key: 'bank2', name: '기업은행' },
  { key: 'bank3', name: '농협은행' },
  { key: 'bank4', name: '신한은행' },
  { key: 'bank5', name: '산업은행' },
  { key: 'bank6', name: '우리은행' },
  { key: 'bank7', name: '한국씨티은행' },
  { key: 'bank8', name: '하나은행' },
  { key: 'bank9', name: 'SC제일은행' },
  { key: 'bank10', name: '경남은행' },
  { key: 'bank11', name: '새마을금고' },
  { key: 'bank12', name: '수협은행' },
  { key: 'bank13', name: '우체국' },
  { key: 'bank14', name: '카카오뱅크' },
  { key: 'bank15', name: '토스뱅크' },
  { key: 'bank16', name: '케이뱅크' },
];

const Transfer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('4'); // 기본으로 내 정보 메뉴 선택
  // const [contentText, setContentText] = useState('계좌 이체 페이지 입니다!'); // 선택된 메뉴에 따른 내용 표시
  // const [accountNumber, setAccountNumber] = useState('');
  // const [balance, setBalance] = useState<number | undefined>(0);
  const accountNumber = '123456-12'
  const balance = '300,000'
  var selectedBankKey = ''
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedBankName, setSelectedBankName] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showBankMenu, setShowBankMenu] = useState<boolean>(false);

  const handleBankMenuClick = (bank: any) => {
    setSelectedBank(bank.key);
    setSelectedBankName(bank.name);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const handleTransferNext = () => {
    // Perform validation or additional steps if needed
    console.log('Transfer amount:', transferAmount);
  };

  const handleTransfer = () => {
    // Perform transfer logic
    console.log(`Transfering ${transferAmount} to account ${selectedAccount} at bank ${selectedBank}`);
  };

  const handleNextButtonClick = () => {
    setShowBankMenu(!showBankMenu);
  };

  // const selectedBankName = selectedBank ? banks.find(bank => bank.key === selectedBank)?.name : banks.find(bank => bank.name);
  
  const bankMenu = (
    <Menu onClick={handleBankMenuClick} >
      <div style={{ width: '400px' }}>
      <Row gutter={[8, 8]} className='bankmenu-button-row'>
        {banks.map((bank) => (
          <Col span={6} key={bank.key}>
            {/* <Button block onClick={() => handleBankMenuClick(bank.key)}> */}
            <Button block className='bankmenu-button' onClick={() => handleBankMenuClick(bank)}>
              {bank.name}
            </Button>
          </Col>
        ))}
      </Row>
      </div>
    </Menu>
  );
  const navigate = useNavigate();
  const handleTransferSuccessRedirect = () => {
    navigate('/transferSuccess', { state: { selectedBankName, selectedAccount, transferAmount }});
  };

  return (
    <SidebarLayout selectedKey={selectedKey} onMenuClick={handleMenuClick}>
      <div className='parent-wrapper-transfer'>
        <div className="wrapper-transfer">
        
          {/* Account Information Card */}
          <Card title="내 계좌 정보" style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="계좌번호">
                  <Input value={accountNumber} readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item label="계좌 잔액">
                <Input.Group compact>
                  <Input style={{ width: 'calc(100% - 40px)', textAlign: 'right' }} value={balance.toLocaleString()} readOnly />
                  <Input style={{ width: '40px', textAlign: 'center' }} value="원" readOnly />
                </Input.Group>
              </Form.Item>
              </Col>
            </Row>
          </Card>

          <Divider />

          {/* Transfer Section */}
          <Card title="이체하기" style={{ width: '100%' }}>
            <Form layout="vertical" onFinish={handleTransferNext}>
            <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="이체 금액" >
              <Input.Group compact>
                <Input
                style={{ width: 'calc(100% - 40px)', textAlign: 'right' }}
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)} 
                  />
                <Input style={{ width: '40px', textAlign: 'center' }} value="원" readOnly />
              </Input.Group>
              </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" className='transfer-next-button' onClick={handleNextButtonClick} disabled={!transferAmount}>
                    다음
                  </Button>
                </Form.Item>
              </Col>
              </Row>
              {showBankMenu && (
              <Row gutter={16} className='select-transfer'>
              <Col span={5}>
              <Form.Item label="금융 기관 선택">
                {/* <Select value={selectedBank} onChange={(value) => setSelectedBank(value)}>
                  <Option value="bank1">은행 1</Option>
                  <Option value="bank2">은행 2</Option>
                  <Option value="bank3">은행 3</Option>
                </Select> */}
                <Input.Group compact>
                  <Input
                    style={{ width: 'calc(100% - 40px)', textAlign: 'right' }}
                    value={[selectedBankName]} readOnly />
                  <Dropdown overlay={bankMenu} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Button style={{ width: '40px', textAlign: 'center' }}>
                       ▼ 
                      {/* {selectedBankName ? selectedBankName : '▼'} */}
                    </Button>
                  </Dropdown>
                </Input.Group>
              </Form.Item>
              </Col>
              <Col span={13}>
              <Form.Item label="계좌번호">
                <Input
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)} />
              </Form.Item>
              </Col>
              <Col>
              <Form.Item>
                <Button type="primary" className='transfer-button' htmlType="submit" disabled={!selectedAccount} onClick={handleTransferSuccessRedirect}>
                  이체
                </Button>
              </Form.Item>
              </Col>
              </Row>
              )}
            </Form>
            <Divider />
          </Card>
          </div>
      </div>
    </SidebarLayout>

  );
};

export default Transfer;
