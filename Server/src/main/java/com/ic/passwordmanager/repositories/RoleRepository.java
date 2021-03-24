package com.ic.passwordmanager.repositories;

import com.ic.passwordmanager.model.Role;
import com.ic.passwordmanager.model.RoleName;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(RoleName name);
}
