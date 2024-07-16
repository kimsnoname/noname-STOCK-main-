package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Post;
import com.example.demo.service.PostService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/posts")
public class PostController {
    
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<List<Post>> getPostsByBoardId(@PathVariable String boardId) {
        List<Post> posts = postService.getPostsByBoardId(boardId);
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
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
