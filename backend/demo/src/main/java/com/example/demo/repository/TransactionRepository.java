package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Transaction;
import com.example.demo.model.UserAccount;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    //Optional<Stock> findByStockCode(String stockCode);
    
    // 비밀번호 검증 시 필요
    UserAccount findByUserId(Long userId);
}
