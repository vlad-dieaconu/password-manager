package com.ic.passwordmanager.controller;

import com.ic.passwordmanager.model.Account;
import com.ic.passwordmanager.model.User;
import com.ic.passwordmanager.repositories.UserRepository;
import com.ic.passwordmanager.security.jwt.JwtUtils;
import com.ic.passwordmanager.service.AccountService;
import com.ic.passwordmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class UserController {



    private final UserRepository repo;

    @Autowired
    JwtUtils jwtProvider;


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

    @GetMapping("users/accounts/{id}")
    List<Account> findAccountsById(@PathVariable String id,@RequestHeader (name="Authorization") String token){

        String[] parts = token.split(" ");

        if(id.equals(jwtProvider.getIDFromJwtToken(parts[1]))){
            Optional<User> user = repo.findById(id);
            if(user.isPresent()){
                return user.get().getAccounts();
            }else throw new ResponseStatusException(HttpStatus.NOT_FOUND);


        }else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/users")
    List<User> allGroups() {

        return repo.findAll();
    }










}

