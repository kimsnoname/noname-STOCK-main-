import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Table, Layout, Menu, Breadcrumb, Button, Dropdown, Row, Col, Card, Form, Input, Select, Divider } from 'antd';
import SidebarLayout from './SidebarLayout';
import './style/transfer.css';

const Transactions = () => {
  const [selectedKey, setSelectedKey] = useState('3'); // 기본으로 내 정보 메뉴 선택
  const [contentText, setContentText] = useState('거래내역 페이지 입니다!'); // 선택된 메뉴에 따른 내용 표시

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const navigate = useNavigate();


interface TradeData {
  key: string;
  date: string;
  stockName: string;
  quantity: number;
  price: number;
  amount: number;
  profitRate: number;
  profitAmount: number;
}

const tradeData: TradeData[] = [
  {
    key: '1',
    date: '2024-07-01',
    stockName: 'AAPL',
    quantity: 10,
    price: 150,
    amount: 1500,
    profitRate: 5,
    profitAmount: 75,
  },
  {
    key: '2',
    date: '2024-07-02',
    stockName: 'GOOGL',
    quantity: 5,
    price: 2000,
    amount: 10000,
    profitRate: -2,
    profitAmount: -200,
  },
  // 추가 데이터
];

const columns = [
  {
    title: '매매일',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '종목명',
    dataIndex: 'stockName',
    key: 'stockName',
  },
  {
    title: '체결수량',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '체결단가',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '체결금액',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '손익률',
    dataIndex: 'profitRate',
    key: 'profitRate',
    render: (text: number) => `${text}%`,
  },
  {
    title: '손익금액',
    dataIndex: 'profitAmount',
    key: 'profitAmount',
  },
];





  return (
    <SidebarLayout selectedKey={selectedKey} onMenuClick={handleMenuClick}>
      <div className='parent-wrapper-transfer'>
        <div className="wrapper-transfer">
        <Card title="거래 내역" style={{ width: '120%' }}>
        <Table dataSource={tradeData} columns={columns} />

        </Card>
        </div>
      </div>
      </SidebarLayout>    
  );
};

export default Transactions;
