package com.example.Demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/{id}")
	public Admin getAdminById(@PathVariable String id){return adminService.getAdminById(id);}

	@GetMapping("/orphanageList")
	public List<Orphanage> getAllOrphanage() {
		return adminService.getAllOrphanage();
	}

	@GetMapping("/orphanage/{id}")
	public Orphanage getOrphanageById(@PathVariable String id){return adminService.getOrphanageById(id);}

	@GetMapping("/donorList")
	public List<Donor> getAllDonor() {
		return adminService.getAllDonor();
	}

	@GetMapping("/donor/{id}")
	public Donor getDonorById(@PathVariable String id){return adminService.getDonorById(id);}

	@GetMapping("/eventList")
	public List<Events> getAllEvents() {
		return adminService.getAllEvents();
	}

	@GetMapping("/event/{id}")
	public Events getEventById(@PathVariable String id){return adminService.getEventById(id);}

	@GetMapping("/event/orphanageId/{id}")
	public List<Events> getEventsByOrphanageId(@PathVariable String id){return adminService.getEventsByOrphanageId(id);}

	@PostMapping("/event/verifyEvents")
	public String verifyEvents(@RequestBody Events event)
	{
		return adminService.verifyEventDetails(event);
	}
	@GetMapping("/donationList")
	public List<Donations> getAllDonations() {
		return adminService.getAllDonations();
	}

	@GetMapping("/donation/orphanageId/{id}")
	public List<Donations> getDonationsByOrphanageId(@PathVariable String id){return adminService.getDonationsByOrphanageId(id);}

	@GetMapping("/donation/donorId/{id}")
	public List<Donations> getDonationsByDonorId(@PathVariable String id){return adminService.getDonationsByDonorId(id);}

	@GetMapping("/donation/{id}")
	public Donations getDonationId(@PathVariable String id){return adminService.getDonationById(id);}

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