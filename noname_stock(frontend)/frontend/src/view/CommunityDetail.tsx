import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import './style/Communitydetail.css';

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

const CommunityDetail: React.FC = () => {
  const { id, boardId } = useParams<{ id: string; boardId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${boardId}/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        message.error('글을 불러오는데 실패했습니다.');
      }
    };

    fetchPost();
  }, [id, boardId]);

  if (!post) {
    return <div>글을 찾을 수 없습니다.</div>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/posts/${boardId}/${id}`);
      message.success('글이 삭제되었습니다.');
      navigate(`/community/${boardId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      message.error('글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="community-detail">
      <h1>{post.title}</h1>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Button type="primary" onClick={() => navigate(`/community/${boardId}/edit/${post.id}`)}>수정</Button>
      <Button type="default" onClick={handleDelete}>삭제</Button>
    </div>
  );
};

export default CommunityDetail;
