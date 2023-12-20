package com.example.Demo.LogController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Demo.AdminServices.AdminService;
import com.example.Demo.LogRepo.AdminRepository;
import com.example.Demo.Model.Admin;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService userService;
	@Autowired
	private AdminRepository userRepo;

	@GetMapping
	public List<Admin> getAll() {
		return (List<Admin>) userRepo.findAll();
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody Admin user) {
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