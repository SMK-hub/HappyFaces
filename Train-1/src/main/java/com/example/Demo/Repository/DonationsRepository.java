package com.example.Demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.Donations;

public interface DonationsRepository extends MongoRepository<Donations, String>{

}
