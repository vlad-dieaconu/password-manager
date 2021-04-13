package com.ic.passwordmanager.model;



import com.ic.passwordmanager.service.AccountService;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Document(collection = "user")
public class User {

    @Id
    @GeneratedValue
    private String id;

    @NotBlank
    private String email;
    @NotBlank
    private String password;

    @ElementCollection
    private List<Account> accounts;

    @DBRef
    private Set<Role> roles = new HashSet<>();






    public User(String email, String password, List<Account> accounts) {

        this.email = email;
        this.password = password;
        this.accounts = accounts;
    }

    public User() {
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set roles) {
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public void addAccount(Account account){
        this.accounts.add(account);

    }

}
