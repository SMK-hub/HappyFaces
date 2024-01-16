package com.example.Demo.Controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
	private static final List<String> ALLOWED_IMAGE_CONTENT_TYPES = Arrays.asList(
			"image/jpeg", "image/png", "image/gif", "image/bmp"
			// Add more image types if needed
	);
	@PostMapping("addPhoto/{adminId}")
	public ResponseEntity<String> addProfilePhoto(
			@PathVariable String adminId,
			@RequestParam("file")MultipartFile file) throws IOException {
		try {
			// Check if the uploaded file is an image
			if (!isImage(file)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
			}
			adminService.addProfilePhoto(adminId, file);
			return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo added successfully");
		}
		catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding profile photo");
		}
	}
	private boolean isImage(MultipartFile file) {
		return file != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(file.getContentType());
	}
	@GetMapping("getPhoto/{adminId}")
	public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String adminId) {
		String photoBase64 = adminService.getProfilePhoto(adminId);

		if (photoBase64 != null) {
			// Decode Base64 to byte array
			byte[] photoBytes = Base64.decodeBase64(photoBase64);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG); // Set the appropriate content type

			return ResponseEntity.ok()
					.headers(headers)
					.body(photoBytes);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@PutMapping("updatePhoto/{adminId}")
	public ResponseEntity<String> updateProfilePhoto(
			@PathVariable String adminId,
			@RequestParam("file") MultipartFile file) {
		try {
			if (!isImage(file)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
			}
			adminService.updateProfilePhoto(adminId, file);
			return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo updated successfully");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile photo");
		}
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