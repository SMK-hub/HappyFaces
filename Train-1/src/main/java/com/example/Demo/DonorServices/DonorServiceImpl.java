package com.example.Demo.DonorServices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.LogRepo.DonorRepository;
import com.example.Demo.Model.Donor;

@Service
public class DonorServiceImpl implements DonorService{

	@Autowired
	private DonorRepository userRepository;

	public String registerUser(Donor newUser) {
		Optional<Donor> user = userRepository.findByEmail(newUser.getEmail());
		
		if (!user.isPresent()) {
			userRepository.save(newUser);
			return "Success";
		} 
		else {
			return "You are an existing user.Please Login";
		}
	}
	
	@Override
	public boolean loginUser(String email, String password) {
        Optional<Donor> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
        return user != null && user.get().getPassword().equals(password);}
        else {
        	return false;
        }
    }
	
}
