package com.example.Demo.LogRepo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.OrphanageDetails;

public interface OrphanageDetailsRepository extends MongoRepository<OrphanageDetails, String>{

}
