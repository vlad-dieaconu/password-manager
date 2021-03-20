package com.ic.passwordmanager.service;

import com.ic.passwordmanager.controller.EncryptDecrypt;
import com.ic.passwordmanager.model.User;

public class UserService {

    static EncryptDecrypt encryptDecrypt;

    static {
        try {
            encryptDecrypt = new EncryptDecrypt();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static User encrpytPassword(User user){
        User u  = new User(user.getEmail(), encryptDecrypt.encrypt(user.getPassword()), user.getAccounts());

        return u;
    }

}
