package com.ic.passwordmanager.repositories;

import com.ic.passwordmanager.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface AccountRepository extends MongoRepository<Account,String> {
}
