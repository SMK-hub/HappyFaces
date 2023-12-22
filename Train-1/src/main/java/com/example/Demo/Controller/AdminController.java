package com.example.Demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Demo.AdminServices.AdminService;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@GetMapping("/adminList")
	public List<Admin> getAllAdmin() {
		return adminService.getAllAdmin();
	}

	@GetMapping("/orphanageList")
	public List<Orphanage> getAllOrphanage() {
		return adminService.getAllOrphanage();
	}

	@GetMapping("/donorList")
	public List<Donor> getAllDonor() {
		return adminService.getAllDonor();
	}

	@GetMapping("/eventList")
	public List<Events> getAllEvents() {
		return adminService.getAllEvents();
	}

	@GetMapping("/donationList")
	public List<Donations> getAllDonations() {
		return adminService.getAllDonations();
	}
	
	@PostMapping("/verifyOrphanageDetails")
	public String verifyOrphanageDetails(@RequestBody OrphanageDetails orph)
	{
		return adminService.verifyOrphanageDetails(orph);
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody Admin user) {
		return adminService.registerUser(user);
	}

	@PostMapping("/login")
	public String loginUser(@RequestBody Map<String, String> loginData) {

		if (adminService.loginUser(loginData.get("email"), loginData.get("password"))) {
			return "Login successful!";
		} else {
			return "Invalid email or password";
		}
	}
	
}