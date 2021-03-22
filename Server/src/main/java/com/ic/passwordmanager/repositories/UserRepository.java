package com.ic.passwordmanager.repositories;

import com.ic.passwordmanager.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User,String> {
}
