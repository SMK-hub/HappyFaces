package com.example.Demo.OrphanageServices;

import java.util.List;

import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

public interface OrphanageService {
	
	 String registerUser(Orphanage user);
	 boolean loginUser(String email, String password);
	 List<OrphanageDetails> getDetailById(String orpId);
	 String updateDetails(OrphanageDetails details);
	
}
