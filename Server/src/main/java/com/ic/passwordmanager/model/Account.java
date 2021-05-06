package com.ic.passwordmanager.model;

import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;

public class Account {


    private String platforma;
    private String password;



    public Account(String platforma, String password) {

        this.platforma = platforma;
        this.password = password;
    }
    public Account(){

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

    @Override
    public String toString() {
        return "Account{" +
                "platforma='" + platforma + '\'' +
                ", password='" + password + '\'' +
                '}';
    }


}
