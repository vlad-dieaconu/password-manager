package com.ic.passwordmanager.request;

import com.ic.passwordmanager.model.Account;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String email;
    private List<Account> accounts;
    private List<String> roles;


    public JwtResponse(String token,String id,String email,List<String> roles) {
        this.token = token;
        this.email = email;
        this.roles = roles;
        this.id = id;

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public JwtResponse(String accessToken) {
        this.token = accessToken;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }
}
