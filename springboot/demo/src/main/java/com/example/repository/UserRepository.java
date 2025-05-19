package com.example.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.model.UserModel;

@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addUser(UserModel userModel) {
        jdbcTemplate.update("INSERT INTO userac(EMAIL, PASSWORD, ADDRESS, PHONENUMBER, CREATE_DATE) VALUES (?, ?, ?, ?, NOW())",
                userModel.getEmail(), userModel.getPassword(), userModel.getAddress(), userModel.getPhone());
    }
}
