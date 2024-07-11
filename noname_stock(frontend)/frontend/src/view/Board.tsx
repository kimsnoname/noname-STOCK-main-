import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Space } from 'antd';
import axios from 'axios';
import './style/Board.css';

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

const Board: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${boardId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [boardId]);

  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="board-list">
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <h1>게시판 {boardId}</h1>
        <div className="desktop-view">
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: '50%' }}>제목</th>
                <th style={{ textAlign: 'center', width: '10%' }}>작성자</th>
                <th style={{ textAlign: 'center', width: '15%' }}>날짜</th>
                <th style={{ textAlign: 'center', width: '10%' }}>댓글 수</th>
                <th style={{ textAlign: 'center', width: '10%' }}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map(post => (
                <tr key={post.id}>
                  <td style={{ textAlign: 'center' }}><Link to={`/community/${post.boardId}/${post.id}`}>{post.title}</Link></td>
                  <td style={{ textAlign: 'center' }}>{post.author}</td>
                  <td style={{ textAlign: 'center' }}>{post.date}</td>
                  <td style={{ textAlign: 'center' }}>{post.comments}</td>
                  <td style={{ textAlign: 'center' }}>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/community/${boardId}/new`}>
            <Button type="primary" className="write-button">글 작성</Button>
          </Link>
        </div>
        <div className="mobile-view">
          <ul className="mobile-list">
            {sortedPosts.map(post => (
              <li key={post.id}>
                <Link to={`/community/${post.boardId}/${post.id}`}>
                  <h3>{post.title}</h3>
                  <p>작성자: {post.author}</p>
                  <p>날짜: {post.date}</p>
                  <p>댓글 수: {post.comments}</p>
                  <p>조회수: {post.views}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={`/community/${boardId}/new`}>
            <Button type="primary" className="write-button">글 작성</Button>
          </Link>
        </div>
      </Space>
    </div>
  );
};

export default Board;
