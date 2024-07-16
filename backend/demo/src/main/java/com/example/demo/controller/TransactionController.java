package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transaction")
@Validated
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/buy")
    public ResponseEntity<?> handleBuyStock(@RequestHeader("Authorization") String token,
                                            @Valid @RequestBody TransactionEntity transactionEntity) {
        try {
            // Bearer token prefix 제거
            String jwt = token.substring(7);
            String userEmail = jwtService.extractUsername(jwt);
            User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // 토큰이 유효한지 검증
            if (jwtService.isTokenValid(jwt, user)) {
                // Transaction 생성
                Transaction transaction = transactionService.createTransaction(
                    user.getUser_id(),
                    transactionEntity.getStockCode(),
                    transactionEntity.getPrice(),
                    transactionEntity.getQuantity(),
                    transactionEntity.getProductName()
                );

                return new ResponseEntity<>(transaction, HttpStatus.CREATED);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<?> handleSellStock(@RequestHeader("Authorization") String token,
                                             @Valid @RequestBody TransactionEntity transactionEntity) {
        try {
            // Bearer token prefix 제거
            String jwt = token.substring(7);
            String userEmail = jwtService.extractUsername(jwt);
            User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // 토큰이 유효한지 검증
            if (jwtService.isTokenValid(jwt, user)) {
                // Transaction 삭제
                Transaction transaction = transactionService.deleteTransaction(
                    user.getUser_id(),
                    transactionEntity.getStockCode(),
                    transactionEntity.getPrice(),
                    transactionEntity.getQuantity(),
                    transactionEntity.getProductName()
                );

                return new ResponseEntity<>(transaction, HttpStatus.CREATED);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

class TransactionEntity {
    private Long userId;
    private String stockCode;
    private Long price;
    private int quantity;
    private String productName;

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStockCode() {
        return stockCode;
    }
    public void setStockCode(String stockCode) {
        this.stockCode = stockCode;
    }

    public Long getPrice() {
        return price;
    }
    public void setPrice(Long price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
}
