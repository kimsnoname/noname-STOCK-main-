import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import './style/Noticedetail.css';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

interface NoticeDetailProps {
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}

const NoticeDetail: React.FC<NoticeDetailProps> = ({ notices, setNotices }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notice = notices.find(n => n.id === Number(id));

  if (!notice) {
    return <div>글을 찾을 수 없습니다.</div>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/notice/${id}`);
      setNotices(notices.filter(n => n.id !== Number(id)));
      message.success('글이 삭제되었습니다.');
      navigate('/noticelist');
    } catch (error) {
      console.error('Error deleting notice:', error);
      message.error('글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="notice-detail">
      <h1>{notice.title}</h1>
      <p>작성자: {notice.author}</p>
      <p>작성일: {notice.date}</p>
      <p>{notice.content}</p>
      <Button type="primary" onClick={() => navigate(`/noticeedit/${notice.id}`)}>수정</Button>
      <Button type="default" onClick={handleDelete}>삭제</Button>
    </div>
  );
};

export default NoticeDetail;
