package com.example.Demo.AdminServices;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.LogRepo.AdminRepository;
import com.example.Demo.Model.Admin;

@Service
public class AdminServiceImpl implements AdminService{


    @Autowired
    private AdminRepository userRepository;
    @Autowired
    private EmailService emailService;

    @Override
    public String registerUser(Admin newUser) {
    	Optional<Admin> user = userRepository.findByEmail(newUser.getEmail());
    	if(!user.isPresent()) {
    		if(newUser.getPasscode().equals("Admin123Admin")) {
    			userRepository.save(newUser);
    			String subject="Registration Successful";
    			String body="Dear Admin, congratulations on taking the lead in maintaining the Happy Faces website! Your dedication will make a positive impact on our mission to support and uplift the lives of those in need.";
    			emailService.sendSimpleMail(newUser.getEmail(), subject, body);
    			return "Success";
    		}
    		else {
    			return "Enter Correct Passcode";
    		}
    	}
    	else {
    			return "You are an existing user. Please Login";
    	}
    }

    @Override
    public boolean loginUser(String email, String password) {
        Optional<Admin> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
        return user != null && user.get().getPassword().equals(password);}
        else {
        	return false;
        }
    }

}
