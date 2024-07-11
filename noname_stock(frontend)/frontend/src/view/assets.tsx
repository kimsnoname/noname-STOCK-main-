import React, { useState } from 'react';
import SidebarLayout from './SidebarLayout';
import './style/assets.css';
import PieChart from './js/PieChart'; // 차트 컴포넌트를 임포트합니다

const Assets = () => {
  const [selectedKey, setSelectedKey] = useState('2');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  // 빈 차트 데이터를 정의
  const emptyChartData = [];

  return (
    <SidebarLayout selectedKey={selectedKey} onMenuClick={handleMenuClick}>
      <div className='assets_parent-wrapper'>
        <div className="assets_wrapper_1">
          <div>자산 (평가금액)</div>
          <div>투자금액</div>
          <div>평가손익</div>
          <div>수익률</div>
          {/* Sample data for the first grid */}
          <div>1,000,000원</div>
          <div>800,000원</div>
          <div className='assets_positive'>200,000원</div>
          <div className='assets_positive'>25%</div>
        </div>
        <div className="assets_wrapper_2">
          <div className="assets_wrapper_2-left">
            {/* Left section content */}
            <PieChart data={emptyChartData} />
          </div>
          <div className="assets_wrapper_2-right">
            {/* Right section content */}
            <div>구분</div>
            <div>평가손익(원)</div>
            <div>평가금액(원)</div>
            {/* Sample data for the first grid */}
            <div>국내주식</div>
            <div className='assets_negative'>200,000원</div>
            <div className='assets_negative'>974,000원</div>
            {/* Sample data for the second grid */}
            <div>해외주식</div>
            <div className='assets_positive'>212,140원</div>
            <div className='assets_neutral'>1,144,517원</div>
            {/* Sample data for the third grid */}
            <div>현금잔고(예수금)</div>
            <div className='assets_neutral'>0원</div>
            <div className='assets_neutral'>40,115원</div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Assets;
