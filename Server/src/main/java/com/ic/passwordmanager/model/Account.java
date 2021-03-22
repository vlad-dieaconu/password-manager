package com.ic.passwordmanager.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Account {
    @Id
    @GeneratedValue
    private String id;
    private String platforma;
    private String password;


    public Account(String platforma, String password) {
        this.platforma = platforma;
        this.password = password;
    }
    public Account(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
