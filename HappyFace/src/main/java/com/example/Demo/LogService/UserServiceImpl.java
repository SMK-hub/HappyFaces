package com.example.Demo.LogService;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.LogModel.Admin;
import com.example.Demo.LogRepo.AdminRepository;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private AdminRepository userRepository;

    @Override
    public String registerUser(Admin newUser) {
    	Optional<Admin> user = userRepository.findByEmail(newUser.getEmail());
    	if(!user.isPresent()) {
    		if(newUser.getPasscode().equals("Admin123Admin")) {
    			userRepository.save(newUser);
    			return "Success";
    		}
    		else {
    			return "Enter Correct Passcode";
    		}
    	}
    	else {
    			return "You are an existing user.Please Login";
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
