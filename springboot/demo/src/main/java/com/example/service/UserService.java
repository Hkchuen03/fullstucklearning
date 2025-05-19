package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.UserModel;
import com.example.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    public void addUser(UserModel userModel) {
        userRepository.addUser(userModel);
    }
}
