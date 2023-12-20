package com.example.Demo.LogController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Demo.LogRepo.OrphanageRepository;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.OrphanageServices.OrphanageService;

@RestController
@RequestMapping("/orphanage")
public class OrphanageController {

	@Autowired
	private OrphanageService userService;
	@Autowired
	private OrphanageRepository userRepo;

	@GetMapping
	public List<Orphanage> getAll() {
		return (List<Orphanage>) userRepo.findAll();
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody Orphanage user) {
		return userService.registerUser(user);
	}

	@PostMapping("/login")
	public String loginUser(@RequestBody Map<String, String> loginData) {

		if (userService.loginUser(loginData.get("email"), loginData.get("password"))) {
			return "Login successful!";
		} else {
			return "Invalid email or password";
		}
	}

}
