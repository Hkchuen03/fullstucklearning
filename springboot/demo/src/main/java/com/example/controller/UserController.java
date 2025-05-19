package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.UserService;
import com.example.model.UserModel;


@RestController
public class UserController {
    
    @Autowired
    UserModel userModel;

    @Autowired
    UserService userService;
    @RequestMapping("/addUser")
    public String add() {
        userModel = new UserModel();
        userModel.setEmail("TEST123@test.com");
        userModel.setPassword("000000");
        userModel.setAddress("TEST123");
        userModel.setPhone("1234567890");
        userService.addUser(userModel);
        return "New User Added";
    }
    

}
