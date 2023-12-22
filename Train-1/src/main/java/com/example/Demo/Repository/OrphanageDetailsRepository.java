package com.example.Demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.OrphanageDetails;

public interface OrphanageDetailsRepository extends MongoRepository<OrphanageDetails, String>{

    List<OrphanageDetails> findAllById(String orpId);

}
