import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import './style/NoticeDetail.css';

interface Notice {
  noticeId: string;
  title: string;
  author: string;
  date: string;
  content: string;
  views: number;
  comments: number;
}

interface Reply {
  replyId: number;
  noticeId: string;
  contents: string;
  date: string;
  userId: string;
}

const NoticeDetail: React.FC = () => {
  const { noticeId } = useParams<{ noticeId: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [newReply, setNewReply] = useState<string>('');
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    if (!noticeId) {
      message.error('공지사항을 찾을 수 없습니다.');
      return;
    }

    const fetchNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/notices/${noticeId}`);
        setNotice(response.data);
      } catch (error) {
        console.error('Error fetching notice:', error);
        message.error('공지사항을 불러오는 데 실패했습니다.');
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/notice/reply/${noticeId}`);
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
        message.error('댓글을 불러오는 데 실패했습니다.');
      }
    };

    fetchNotice();
    fetchReplies();
  }, [noticeId]);

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/notices/${noticeId}`);
      message.success('공지사항이 삭제되었습니다.');
      navigate('/noticelist');
    } catch (error) {
      console.error('Error deleting notice:', error);
      message.error('공지사항 삭제에 실패했습니다.');
    }
  };

  const handleReplySubmit = async () => {
    if (!newReply) {
      message.warning('댓글 내용을 입력해주세요.');
      return;
    }

    const newReplyData: Reply = {
      replyId: replies.length + 1,
      noticeId: noticeId as string, // 여기서 noticeId가 string임을 보장
      contents: newReply,
      date: new Date().toISOString().split('T')[0],
      userId: '익명',
    };

    try {
      await axios.post('http://localhost:4000/add/notice/reply', newReplyData);
      setReplies([...replies, newReplyData]);
      setNewReply('');
      message.success('댓글이 추가되었습니다.');
    } catch (error) {
      console.error('Error adding reply:', error);
      message.error('댓글 추가에 실패했습니다.');
    }
  };

  const handleReplyDelete = async (replyId: number) => {
    try {
      await axios.delete(`http://localhost:4000/delete/notice/reply/${noticeId}/${replyId}`);
      setReplies(replies.filter(reply => reply.replyId !== replyId));
      message.success('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting reply:', error);
      message.error('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="notice-detail">
      <div className="notice-title">
        <h1>{notice.title}</h1>
      </div>
      <div className="notice-info">
        <p className="notice-author">작성자: {notice.author}</p>
        <p className="notice-date">작성일: {notice.date}</p>
      </div>
      <div className="notice-content" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
      <Button type="primary" onClick={() => navigate('/noticelist')}>목록</Button>
      <Button type="primary" onClick={() => navigate(`/noticesForm/${notice.noticeId}`)}>수정</Button>
      <Button type="default" onClick={handleDelete}>삭제</Button>

      <div className="replies-section">
        <h2>댓글</h2>
        <Form layout="vertical" onFinish={handleReplySubmit}>
          <Form.Item>
            <Input.TextArea
              value={newReply}
              onChange={e => setNewReply(e.target.value)}
              placeholder="댓글을 입력하세요"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">댓글 작성</Button>
          </Form.Item>
        </Form>

        <div className="replies-list">
          {replies.map(reply => (
            <div key={reply.replyId} className="reply">
              <div dangerouslySetInnerHTML={{ __html: reply.contents }}></div>
              <p>작성자: {reply.userId}</p>
              <p>작성일: {reply.date}</p>
              <Button type="link" onClick={() => handleReplyDelete(reply.replyId)}>삭제</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
