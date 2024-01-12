package com.example.Demo.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.AdminServices.AdminService;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import org.springframework.web.multipart.MultipartFile;

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
  	@GetMapping("/orphanageDetails/{id}")
	public OrphanageDetails getOrphanageDetailByOrpId(@PathVariable String orpId)
	{
		return adminService.getOrphanageDetailByOrphanageId(orpId);
	}
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
	@PostMapping("/{adminId}/photo")
	public ResponseEntity<String> addProfilePhoto(
			@PathVariable String adminId,
			@RequestParam("file")MultipartFile file) throws IOException {
		adminService.addProfilePhoto(adminId,file);
		return ResponseEntity.ok("Profile photo added successfully");
	}
	@PostMapping("/sendOtp")
	public String sendOtp(@RequestBody Admin admin) {
		return adminService.sendOtp(admin);

	}

	@PostMapping("/ForgetPassword/{email}/{otp}/{create}/{confirm}")
	public String forgetPassword(@PathVariable("email") String email,@PathVariable("create") String create,@PathVariable("otp") String otp,@PathVariable("confirm") String confirm) {
		System.out.println(create + "   " + confirm + "  " + otp);
		return adminService.forgetPassword(email,otp,create,confirm);
	}
	@PutMapping("/{adminId}/editProfile")
	public String editProfile(@PathVariable("adminId") String adminId,@RequestBody Admin admin){
		return adminService.editProfile(adminId,admin);
	}
}