package com.ic.passwordmanager.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class User {


    private int id;
    private String email;
    private String password;
    private List<Account> accounts;




    public User(String email, String password, List<Account> accounts) {

        this.email = email;
        this.password = password;
        this.accounts = accounts;
    }

    public User() {
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}
