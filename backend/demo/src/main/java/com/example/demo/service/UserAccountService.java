package com.example.demo.service;

import com.example.demo.model.UserAccount;
import com.example.demo.repository.UserAccountRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccount createAccount(Long userId, UserAccount userAccount) {
        // Add any additional business logic here if needed
        return userAccountRepository.save(userAccount);
    }

    @Transactional
    public void deductAmount(Long userId, Long amount) throws Exception {
        UserAccount userAccount = userAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new Exception("User not found"));

        if (userAccount.getBalance() < amount) {
            throw new Exception("Insufficient balance");
        }

        userAccount.setBalance(userAccount.getBalance() - amount.intValue());
        userAccountRepository.save(userAccount);
    }
}