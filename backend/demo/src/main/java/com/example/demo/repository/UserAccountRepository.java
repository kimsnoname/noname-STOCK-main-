package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    UserAccount findByUserId(Long userId);
}