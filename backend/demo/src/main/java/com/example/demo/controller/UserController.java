package com.example.demo.controller;

// import org.hibernate.mapping.Map;
import java.util.List;
import java.util.Map;

import com.example.demo.dto.AuthenticationRequest;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.User;
import com.example.demo.model.UserCreateForm;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> saveUser(@RequestBody @Valid UserCreateForm userCreateForm) {
        // UserCreateForm에서 필드에 직접 접근하여 데이터를 가져옵니다.
        userService.create(userCreateForm.getEmail(), userCreateForm.getUserName(), userCreateForm.getPw());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/register")
    public ResponseEntity<List<User>> getAllTestEntities() {
        List<User> result = userService.getAllTestEntities();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @GetMapping("/hello")
    public ResponseEntity<Object> testApi() {
        String result = "API 통신에 성공하였습니다.";
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/check-email")
    public ResponseEntity<Void> checkEmail(@RequestBody Map<String, String> email) {
        if (userService.isEmailExists(email.get("email"))) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/check-username")
    public ResponseEntity<Void> checkUserName(@RequestBody Map<String, String> userName) {
        if (userService.isUsernameExists(userName.get("userName"))) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}