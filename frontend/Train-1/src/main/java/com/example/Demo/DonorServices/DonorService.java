package com.example.Demo.DonorServices;

import com.example.Demo.Model.Donor;

public interface DonorService {

	String registerUser(Donor user);
	boolean loginUser(String email, String password);
	
}
