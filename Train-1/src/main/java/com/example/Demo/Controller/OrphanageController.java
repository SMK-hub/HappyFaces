package com.example.Demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.OrphanageServices.OrphanageService;
import com.example.Demo.Repository.OrphanageRepository;

@RestController
@RequestMapping("/orphanage")
public class OrphanageController {

	@Autowired
	private OrphanageService orphanageService;
	@Autowired
	private OrphanageRepository orphanageRepo;

	@GetMapping
	public List<Orphanage> getAll() {
		return (List<Orphanage>) orphanageRepo.findAll();
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody Orphanage user) {
		return orphanageService.registerUser(user);
	}

	@PostMapping("/login")
	public String loginUser(@RequestBody Map<String, String> loginData) {

		if (orphanageService.loginUser(loginData.get("email"), loginData.get("password"))) {
			return "Login successful!";
		} else {
			return "Invalid email or password";
		}
	}
	
	@PostMapping("/enterDetails")
	public String updateDetails(@RequestBody OrphanageDetails detail) {
		return orphanageService.updateDetails(detail);
		
	}

}
