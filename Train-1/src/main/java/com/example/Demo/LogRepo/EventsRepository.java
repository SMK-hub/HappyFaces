package com.example.Demo.LogRepo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.Events;

public interface EventsRepository extends MongoRepository<Events, String>{

}
