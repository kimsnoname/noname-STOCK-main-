package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Transaction;
import com.example.demo.model.UserAccount;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserAccountRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountService userAccountService;

    @Transactional
    public Transaction createTransaction(Long userId, String stockCode, Long price, int quantity)throws Exception{
        // 사용자 계좌에서 금액 차감 및 검증 로직 추가
        Long amount = price * quantity; // 거래 금액
        userAccountService.deductAmount(userId, amount);        // 수정 필요

        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setStockCode(stockCode);
        transaction.setPrice(price);
        transaction.setQuantity(quantity);
        transaction.setTimestamp(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    // 비밀번호 검증
    public boolean verifyPassword(Long userId, String accountPassword) throws Exception {
        UserAccount userAccount = userAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new Exception("User not found"));
        return userAccount.getAccountPassword().equals(accountPassword);
    }

    public void saveTransaction(Transaction transaction) {
        throw new UnsupportedOperationException("Unimplemented method 'saveTransaction'");
    }

}