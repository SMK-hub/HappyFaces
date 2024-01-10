package com.example.Demo.OrphanageServices;

import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

import java.util.Optional;

public interface OrphanageService {
	
	 String registerUser(Orphanage user);
	 boolean loginUser(String email, String password);
	 Optional<OrphanageDetails> getDetailById(String orpId);
	 String updateDetails(OrphanageDetails details);
	 String createEvents(Events event);
	
}
