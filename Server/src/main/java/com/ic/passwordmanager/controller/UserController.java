package com.ic.passwordmanager.controller;

import com.ic.passwordmanager.model.User;
import com.ic.passwordmanager.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    @Autowired
    FirebaseService firebaseService;

    @GetMapping("/getUserCredentials")
    public User getExample(@RequestHeader() String email) throws ExecutionException, InterruptedException {
        return firebaseService.getUserDetails(email);
    }
    @PostMapping("/createUser")
    public String postExample(@RequestBody User user) throws Exception {
        return firebaseService.saveUserDetails(user);
    }
    @PutMapping("/updateUser")
    public String putExample(@RequestBody User user){
        return "Updated user " + user.getEmail();
    }


}

