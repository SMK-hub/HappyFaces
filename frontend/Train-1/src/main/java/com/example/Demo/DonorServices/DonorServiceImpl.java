package com.example.Demo.DonorServices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Model.Donor;
import com.example.Demo.Repository.DonorRepository;

@Service
public class DonorServiceImpl implements DonorService{

	@Autowired
	private DonorRepository userRepository;
	@Autowired
    private EmailService emailService;

	public String registerUser(Donor newUser) {
		Optional<Donor> user = userRepository.findByEmail(newUser.getEmail());
		
		if (!user.isPresent()) {
			userRepository.save(newUser);
			String subject="Registration Successful";
			String body="Dear "+newUser.getName()+", Welcome to Happy Faces! Your registration as a donor brings smiles to countless faces. Thank you for joining us in making a positive impact!";
			emailService.sendSimpleMail(newUser.getEmail(), subject, body);
			return "Success";
		} 
		else {
			return "You are an existing user.\nPlease Login";
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
