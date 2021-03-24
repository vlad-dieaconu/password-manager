package com.ic.passwordmanager.controller;

import com.ic.passwordmanager.model.User;
import com.ic.passwordmanager.repositories.UserRepository;
import com.ic.passwordmanager.service.AccountService;
import com.ic.passwordmanager.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {



    private final UserRepository repo;
    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/users")
    User newGroup(@RequestBody User user) {

        User u;
        u = UserService.encrpytPassword(user);

        u.setAccounts(user.getAccounts().stream()
                .map(account -> AccountService.encrpytPassword(account))
                .collect(Collectors.toList()));

        return repo.save(u);
    }

    @GetMapping("/users/{email}")
    User findUserByEmail(@PathVariable String email){
        return repo.findByEmail(email);
    }

    @GetMapping("/users")
    List<User> allGroups() {

        return repo.findAll();
    }










}

