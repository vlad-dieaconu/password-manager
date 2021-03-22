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

/*   @Autowired
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
    }*/


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

    @GetMapping("/users")
    List<User> allGroups() {




        return repo.findAll();
    }










}

