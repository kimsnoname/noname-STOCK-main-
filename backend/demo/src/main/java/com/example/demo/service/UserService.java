package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User create(String email, String username, String pw) {
        if (email == null || username == null || pw == null) {
            throw new IllegalArgumentException("입력 데이터가 올바르지 않습니다.");
        }

        User user = new User();
        user.setEmail(email);
        user.setUserName(username);
        user.setPw(passwordEncoder.encode(pw));
		user.setCreated_at(LocalDateTime.now());
		user.setUpdated_at(LocalDateTime.now());

        return userRepository.save(user);
    }

    public List<User> getAllTestEntities() {
        return userRepository.findAll();
    }


    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean isUsernameExists(String userName) {
        return userRepository.existsByUserName(userName);
    }
}
