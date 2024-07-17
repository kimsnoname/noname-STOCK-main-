package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // 기존의 게시물 조회 메서드는 게시판 ID로 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<List<Post>> getPostsByBoardId(@PathVariable String boardId) {
        List<Post> posts = postService.getPostsByBoardId(boardId);
        return ResponseEntity.ok(posts);
    }

    // 새로운 엔드포인트: 전체 게시물 조회
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{boardId}/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String boardId, @PathVariable Long id) {
        Post post = postService.getPostById(boardId, id);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = postService.savePost(post);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{boardId}/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String boardId, @PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(boardId, id, postDetails);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{boardId}/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String boardId, @PathVariable Long id) {
        try {
            postService.deletePost(boardId, id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
