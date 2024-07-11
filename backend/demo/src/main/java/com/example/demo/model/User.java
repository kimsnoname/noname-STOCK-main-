package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name="User")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long user_id;

    //@Column(nullable = false, unique = true)
    private String email;

    //@Column(nullable = false, unique = true)
    private String userName;

    //@Column(nullable = false)
    private String pw;

    //private String phoneNumber;

    //@Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonProperty("created_at")
    private LocalDateTime created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonProperty("updated_at")
    private LocalDateTime updated_at;

    // public User() {
    // }

    // public User(String userName, String email, String pw, LocalDateTime created_at, LocalDateTime updated_at) {
    //     this.userName = userName;
    //     this.email = email;
    //     this.pw = pw;
    //     //this.phoneNumber = phoneNumber;
    //     this.created_at = created_at;
    //     this.updated_at = updated_at;
    // }

    // public LocalDateTime getCreatedAt() {
    //     return created_at;
    // }

    // public void setCreatedAt(LocalDateTime created_at) {
    //     this.created_at = created_at;
    // }

    // public LocalDateTime getUpdatedAt() {
    //     return updated_at;
    // }

    // public void setUpdatedAt(LocalDateTime updated_at) {
    //     this.updated_at = updated_at;
    // }

    // @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE) 
    // private List<UserAccount> accountList;

}