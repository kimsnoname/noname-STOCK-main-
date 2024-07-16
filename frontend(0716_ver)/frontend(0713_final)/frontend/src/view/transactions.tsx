import { useState } from 'react';
import { Table, Card } from 'antd';
import SidebarLayout from './SidebarLayout';
import './style/transactions.css';

const Transactions = () => {
  const [selectedKey, setSelectedKey] = useState('3'); // 기본으로 내 정보 메뉴 선택
  const isMobile = window.innerWidth <= 768;

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const tradeData = [
    {
      key: '1',
      date: '2024-07-03',
      stockName: '한전',
      quantity: 10,
      price: 99400,
      profitRate: -2.06,
    },
    {
      key: '2',
      date: '2024-07-02',
      stockName: '테슬라',
      quantity: 10,
      price: 93237,
      profitRate: 37.90,
    },
    {
      key: '3',
      date: '2024-07-01',
      stockName: '종목1',
      quantity: 10,
      price: 15728,
      profitRate: -0.97,
    },
  ];

  // 체결금액 및 손익금액 계산 및 매매일 기준 역순 정렬
  const processedTradeData = tradeData
    .map((trade) => {
      const amount = trade.price * trade.quantity;
      const profitAmount = Math.floor((amount * (trade.profitRate / 100)) / 10) * 10;
      return {
        ...trade,
        amount,
        profitAmount,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      render: (text) => text.toLocaleString() + '원',
    },
    {
      title: '손익률',
      dataIndex: 'profitRate',
      key: 'profitRate',
      render: (text) => (
        <span className={text > 0 ? 'profit-positive' : 'profit-negative'}>
          {text}%
        </span>
      ),
    },
    {
      title: '손익금액',
      dataIndex: 'profitAmount',
      key: 'profitAmount',
      render: (text) => (
        <span className={text > 0 ? 'profit-positive' : 'profit-negative'}>
          {text.toLocaleString()}원
        </span>
      ),
    },
  ];

  return (
    <>
    {!isMobile ? (
      <div className="desktop-container">
    <SidebarLayout selectedKey={selectedKey} onMenuClick={handleMenuClick}>
      <div className='parent-wrapper-transfer'>
        <div className="wrapper-transfer">
          <Card title="거래 내역" style={{ width: "110%" }}>
            <Table className="ant-table-wrapper" dataSource={processedTradeData} columns={columns} />
            <div className="mobile-transaction-list">
              {processedTradeData.map((trade) => (
                <div key={trade.key} className="mobile-transaction-card">
                  <div className="card-row">
                    <span className="label">매매일:</span>
                    <span className="value">{trade.date}</span>
                  </div>
                  <div className="card-row">
                    <span className="label">종목명:</span>
                    <span className="value">{trade.stockName}</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결수량:</span>
                    <span className="value">{trade.quantity}</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결단가:</span>
                    <span className="value">{trade.price.toLocaleString()}원</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결금액:</span>
                    <span className="value">{trade.amount.toLocaleString()}원</span>
                  </div>
                  <div className="card-row">
                  <span className="label">손익률:</span>
                    <span className={trade.profitRate > 0 ? 'profit-positive' : 'profit-negative'}>
                      {trade.profitRate}%
                    </span>
                  </div>
                  <div className="card-row">
                  <span className="label">손익금액:</span>
                    <span className={trade.profitAmount > 0 ? 'profit-positive' : 'profit-negative'}>
                      {trade.profitAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </SidebarLayout>    
    </div>
    ) : (
      <div className="mobile-container">
        <Card title="거래 내역">
            <Table className="ant-table-wrapper" dataSource={processedTradeData} columns={columns} />
            <div className="mobile-transaction-list">
              {processedTradeData.map((trade) => (
                <div key={trade.key} className="mobile-transaction-card">
                  <div className="card-row">
                    <span className="label">매매일:</span>
                    <span className="value">{trade.date}</span>
                  </div>
                  <div className="card-row">
                    <span className="label">종목명:</span>
                    <span className="value">{trade.stockName}</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결수량:</span>
                    <span className="value">{trade.quantity}주</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결단가:</span>
                    <span className="value">{trade.price.toLocaleString()}원</span>
                  </div>
                  <div className="card-row">
                    <span className="label">체결금액:</span>
                    <span className="value">{trade.amount.toLocaleString()}원</span>
                  </div>
                  <div className="card-row">
                  <span className="label">손익률:</span>
                    <span className={trade.profitRate > 0 ? 'profit-positive' : 'profit-negative'}>
                      {trade.profitRate}%
                    </span>
                  </div>
                  <div className="card-row">
                  <span className="label">손익금액:</span>
                    <span className={trade.profitAmount > 0 ? 'profit-positive' : 'profit-negative'}>
                      {trade.profitAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
      </div>
    )
  }
  </>
  )
}


export default Transactions;
