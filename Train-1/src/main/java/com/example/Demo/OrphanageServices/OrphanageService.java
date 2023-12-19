package com.example.Demo.OrphanageServices;

import com.example.Demo.Model.Orphanage;

public interface OrphanageService {
	
	 String registerUser(Orphanage user);
	 boolean loginUser(String email, String password);
	
}
