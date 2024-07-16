package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByBoardId(String boardId) {
        return postRepository.findByBoardId(boardId);
    }

    public Post getPostById(String boardId, Long id) {
        return postRepository.findByBoardIdAndId(boardId, id).orElse(null);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(String boardId, Long id, Post postDetails) {
        Post post = postRepository.findByBoardIdAndId(boardId, id).orElse(null);
        if (post == null) {
            return null;
        }
        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setAuthor(postDetails.getAuthor());
        // 다른 필드 업데이트
        return postRepository.save(post);
    }

    public void deletePost(String boardId, Long id) {
        Post post = postRepository.findByBoardIdAndId(boardId, id).orElse(null);
        if (post != null) {
            postRepository.delete(post);
        } else {
            throw new IllegalArgumentException("Post not found");
        }
    }
}
