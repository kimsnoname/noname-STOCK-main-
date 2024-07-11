package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.demo.model.User;
import com.example.demo.model.UserAccount;
import com.example.demo.repository.UserAccountRepository;
import com.example.demo.repository.UserRepository;

import java.security.SecureRandom;
import java.util.List;


@RequiredArgsConstructor
@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccount createAccount(Long userId, UserAccount userAccount) {
        // Add any additional business logic here if needed
        return userAccountRepository.save(userAccount);
    }
}


// @Service
// public class UserAccountService {

//     @Autowired
//     private UserAccountRepository UserAccountRepository;

//     @Autowired
//     private UserRepository userRepository;

//     private static final SecureRandom random = new SecureRandom();

//     public UserAccount createAccount(Long user_id, UserAccount userAccount) {
//         User user = userRepository.findById(user_id)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         userAccount.setUser(user);
//         userAccount.setAccountNum(generateRandomAccountNum());
//         userAccount.setBalance(0);  // Set initial balance to 0

//         return UserAccountRepository.save(userAccount);
//     }

//     private String generateRandomAccountNum() {
//         int randomNum = random.nextInt(90000000) + 10000000;  // Generate 8-digit random number
//         return String.valueOf(randomNum);
//     }

//     public void saveUserAccount(UserAccount userAccount){
//         UserAccountRepository.save(userAccount);
//     }

//     public List<UserAccount> getAllTestEntities(){
//         return UserAccountRepository.findAll();
//     }
// }
