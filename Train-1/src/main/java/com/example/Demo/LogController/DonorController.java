package com.example.Demo.LogController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Demo.DonorServices.DonorService;
import com.example.Demo.LogRepo.DonorRepository;
import com.example.Demo.Model.Donor;

@RestController
@RequestMapping("/donor")
public class DonorController {

		@Autowired
		private DonorService userService;
		@Autowired
		private DonorRepository userRepo;

		@GetMapping
		public List<Donor> getAll() {
			return (List<Donor>) userRepo.findAll();
		}

		@PostMapping("/register")
		public String registerUser(@RequestBody Donor user) {
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

