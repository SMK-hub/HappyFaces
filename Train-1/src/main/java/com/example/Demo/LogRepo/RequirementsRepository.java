package com.example.Demo.LogRepo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.Requirement;

public interface RequirementsRepository extends MongoRepository<Requirement,String>{

}
