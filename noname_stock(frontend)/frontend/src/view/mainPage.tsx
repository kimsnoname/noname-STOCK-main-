import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import NewPage from "./newPage";
import GetMyInfo from './getMyInfo';
import Assets from './assets';
import Transactions from './transactions';
import Transfer from './transfer';
import './style/MainPage.css'; // Add this line to import your CSS
import LandingPage from "./landing";
import Login from './loginPage';
import Register from './registerPage';
import Welcome from './welcomePage';
import AccountRegistration from './accountRegistrationPage';
import TransferSuccess from "./transferSuccessPage";
import TestLogin from '../components/loginPage';
import TestRegister from '../components/registerPage';
import MobileFooterMenu from './MobileFooterMenu'; // Import the mobile footer menu
import ApiIndexPage from './api/apiIndexPage';
import StockPrice from './api/stockPrice';
import Indices from './api/indices';
import Noticelist from './Noticelist';
import NoticeDetail from './Noticedetail';
import NoticeForm from './NoticeForm';
import Community from './Community';
import CommunityForm from './CommunityForm';
import CommunityDetail from './CommunityDetail';
import Board from './Board';

interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    views: number;
    comments: number;
    boardId: string;
  }
  
  interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
  }

const MainPage: React.FC =() =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    
    const handleLoginRedirect = () => {
        navigate('/login');
      };
    
    const handleRegisterRedirect = () => {
        navigate('/register');
      };

      const showDrawer = () => {
        setVisible(true);
      };

      const [posts, setPosts] = useState<Post[]>(() => {
        const storedPosts = localStorage.getItem('posts');
        return storedPosts ? JSON.parse(storedPosts) : [];
      });

      useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
      }, [posts]);
    
      const [notices, setNotices] = useState<Notice[]>(() => {
        const storedNotices = localStorage.getItem('notices');
        return storedNotices ? JSON.parse(storedNotices) : [];
      });
    
      useEffect(() => {
        localStorage.setItem('notices', JSON.stringify(notices));
      }, [notices]);

      const onClose = () => {
        setVisible(false);
      };
    
      

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/welcome' || location.pathname === '/accountRegistration';
    return(
        <div>
        {!isAuthPage && (
          <div className="navbar">
            <Link to="/" className="logo">무명증권</Link>
            <div className="mobile-menu">
              <Button className="menu-button" type="text" icon={<MenuOutlined />} onClick={showDrawer} />
              <Drawer
                title="Menu"
                placement="left"
                onClose={onClose}
                visible={visible}
              >
                <Menu mode="vertical" className="nav-menu-mobile">
                  <Menu.Item key="trading" onClick={onClose}>
                    <Link to="/trading">트레이딩</Link>
                  </Menu.Item>
                  <Menu.Item key="GetMyInfo" onClick={onClose}>
                    <Link to="/GetMyInfo">내정보</Link>
                  </Menu.Item>
                  <Menu.Item key="community" onClick={onClose}>
                    <Link to="/community">종목토론실</Link>
                  </Menu.Item>
                  <Menu.Item key="notice" onClick={onClose}>
                    <Link to="/notice">공지사항</Link>
                  </Menu.Item>
                </Menu>
              </Drawer>
            </div>
            <Menu mode="horizontal" className="nav-menu">
              <Menu.Item key="trading">
                <Link to="/trading">트레이딩</Link>
              </Menu.Item>
              <Menu.Item key="GetMyInfo">
                <Link to="/GetMyInfo">내정보</Link>
              </Menu.Item>
              <Menu.Item key="community">
                <Link to="/community">종목토론실</Link>
              </Menu.Item>
              <Menu.Item key="notice">
                <Link to="/notice">공지사항</Link>
              </Menu.Item>
            </Menu>
            <div className="auth-buttons">
              <Button type="primary" onClick={handleRegisterRedirect} className="signup-button">회원가입</Button>
              <Button type="default" onClick={handleLoginRedirect} className="login-button">로그인</Button>
            </div>
          </div>
            )}
            <Routes>
                <Route path="/newPage" element={<NewPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/getMyInfo" element={<GetMyInfo />} /> 
                <Route path="/assets" element={<Assets />} /> 
                <Route path="/transactions" element={<Transactions />} /> {/* 추가 */}
                <Route path="/transfer" element={<Transfer />} /> {/* 추가 */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/accountRegistration" element={<AccountRegistration />} />
                <Route path="/transferSuccess" element={<TransferSuccess />} />
                <Route path="/testlogin" element={<TestLogin />} />
                <Route path="/testregister" element={<TestRegister />} />
                <Route path="/Noticelist" element={<Noticelist />} />
                <Route path="/Notice/:id" element={<NoticeDetail notices={notices} setNotices={setNotices} />} /> 
                <Route path="/NoticeForm" element={<NoticeForm />} />
                <Route path="/NoticeForm/:id" element={<NoticeForm />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/Community/:boardId" element={<Board />} />
                <Route path="/Community/:boardId/new" element={<CommunityForm />} />
                <Route path="/Community/:boardId/edit/:id" element={<CommunityForm />} />
                <Route path="/Community/:boardId/:id" element={<CommunityDetail />} />
                    <Route path="/apiindexpage" element={<ApiIndexPage />} />
                <Route path="/indices" element={<Indices />} />
                <Route path="/equities/:id" element={<StockPrice />} />
            </Routes>
            <div className="footer">
            푸터임
        </div>
        {!isAuthPage && <MobileFooterMenu />} {/* Render the mobile footer menu */}
        </div>
    );
};


export default MainPage;