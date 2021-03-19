package com.ic.passwordmanager.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class User {


    private String email;
    private String password;
    private ArrayList<Account> accounts;



    public User(String email, String password, ArrayList<Account> accounts) {
        this.email = email;
        this.password = password;
        this.accounts = accounts;
    }

    public User() {
    }

    public ArrayList<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(ArrayList<Account> accounts) {
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
