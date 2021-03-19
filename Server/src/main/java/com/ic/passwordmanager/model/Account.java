package com.ic.passwordmanager.model;

public class Account {

    private String platforma;
    private String password;


    public Account(String platforma, String password) {
        this.platforma = platforma;
        this.password = password;
    }

    public String getPlatforma() {
        return platforma;
    }

    public void setPlatforma(String platforma) {
        this.platforma = platforma;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
