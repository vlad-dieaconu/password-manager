package com.ic.passwordmanager.service;

import com.ic.passwordmanager.model.Account;
import com.ic.passwordmanager.controller.EncryptDecrypt;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    static EncryptDecrypt encryptDecrypt;

    static {
        try {
            encryptDecrypt = new EncryptDecrypt();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static Account encrpytPassword(Account account){
        Account a  = new Account(account.getPlatforma(), encryptDecrypt.encrypt(account.getPassword()));

        return a;
    }
    public static Account decryptPassword(Account account){
        Account a  = new Account(account.getPlatforma(), encryptDecrypt.decrypt(account.getPassword()));

        return a;
    }



}
