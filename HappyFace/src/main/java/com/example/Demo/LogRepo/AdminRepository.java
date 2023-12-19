package com.example.Demo.LogRepo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.LogModel.Admin;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
}