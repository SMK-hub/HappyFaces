package com.example.Demo.OrphanageServices;

import java.util.Optional;

import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

public interface OrphanageService {
	
	 String registerUser(Orphanage user);
	 boolean loginUser(String email, String password);
	 Optional<OrphanageDetails> getDetailById(String orpId);
	 String updateDetails(OrphanageDetails details);
	
}
