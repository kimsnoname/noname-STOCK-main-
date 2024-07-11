import React from 'react';
import { Button, Form, Input } from 'antd';
import SidebarLayout from './SidebarLayout';
import './style/getMyInfo.css';

const GetMyInfo = () => {
  const [selectedKey, setSelectedKey] = React.useState('1');
  const [userForm] = Form.useForm();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const onEdit = (values) => {
    console.log('Form values:', values);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {isMobile ? (
        <div className="mobile-container">
          <Form onFinish={onEdit} form={userForm}>
            <Form.Item style={{ width: "100%", marginBottom: "0" }}>
              <Form.Item
                name="username"
                label={<b>유저ID</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
              <Form.Item
                name="email"
                label={<b>이메일</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
              <Form.Item
                name="age"
                label={<b>나이</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
              <Form.Item
                name="birthDate"
                label={<b>생년월일</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
              <Form.Item
                name="gender"
                label={<b>성별</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
              <Form.Item
                name="company"
                label={<b>회사</b>}
                style={{ width: "100%", display: "block" }}
              >
                <Input size="large" disabled />
              </Form.Item>
            </Form.Item>
          </Form>
          <Button type="primary" className="change-info-button">고객정보 변경</Button>
          <Button type="primary" className="delete-account">회원탈퇴</Button>
        </div>
      ) : (
        <SidebarLayout selectedKey={selectedKey} onMenuClick={handleMenuClick}>
          <div className='parent-wrapper'>
            <div className="wrapper">
              <Form onFinish={onEdit} form={userForm}>
                <Form.Item style={{ width: "100%", marginBottom: "0" }}>
                  <Form.Item
                    name="username"
                    label={<b>유저ID</b>}
                    style={{ width: "calc(50% - 8px)", display: "inline-block" }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<b>이메일</b>}
                    style={{
                      width: "calc(50% - 8px)",
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                </Form.Item>
                <Form.Item style={{ width: "100%", marginBottom: "0" }}>
                  <Form.Item
                    name="age"
                    label={<b>나이</b>}
                    style={{ width: "calc(50% - 8px)", display: "inline-block" }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                  <Form.Item
                    name="birthDate"
                    label={<b>생년월일</b>}
                    style={{
                      width: "calc(50% - 8px)",
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                </Form.Item>
                <Form.Item style={{ width: "100%", marginBottom: "0" }}>
                  <Form.Item
                    name="gender"
                    label={<b>성별</b>}
                    style={{ width: "calc(50% - 8px)", display: "inline-block" }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                  <Form.Item
                    name="company"
                    label={<b>회사</b>}
                    style={{
                      width: "calc(50% - 8px)",
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Form.Item>
              </Form>
              <Button type="primary" className="change-info-button">고객정보 변경</Button>
              <Button type="primary" className="delete-account">회원탈퇴</Button>
            </div>
          </div>
        </SidebarLayout>
      )}
    </>
  );
};

export default GetMyInfo;
