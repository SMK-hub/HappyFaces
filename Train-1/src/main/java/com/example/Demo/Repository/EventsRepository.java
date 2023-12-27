package com.example.Demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Demo.Model.Events;

import java.util.List;

public interface EventsRepository extends MongoRepository<Events, String>{
    List<Events> getEventsByOrphanageId(String orpId);
}
