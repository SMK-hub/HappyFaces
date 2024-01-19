package com.example.Demo.Controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.Demo.Model.Orphanage;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.DonorServices.DonorService;
import com.example.Demo.Model.Donor;
import com.example.Demo.Repository.DonorRepository;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/donor")
public class DonorController {

    @Autowired
    private DonorService donorService;
    @Autowired
    private DonorRepository userRepo;

    @GetMapping
    public List<Donor> getAll() {
        return (List<Donor>) userRepo.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Donor user) {
        String alpha= donorService.registerUser(user);
        if(alpha.equals("Success")){
            return new ResponseEntity<>("Registration Successful",HttpStatus.OK);
        }
        return  new ResponseEntity<>("Existing User",HttpStatus.CONFLICT);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {

        if (donorService.loginUser(loginData.get("email"), loginData.get("password"))) {
            return new ResponseEntity<>("Login successful!",HttpStatus.OK) ;
        } else {
            return new ResponseEntity<>("Login Failed",HttpStatus.CONFLICT);
        }
    }

    private static final List<String> ALLOWED_IMAGE_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/bmp"
    );
    @PostMapping("addPhoto/{donorId}")
    public ResponseEntity<String> addProfilePhoto(
            @PathVariable String donorId,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            // Check if the uploaded file is an image
            if (!isImage(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
            }
            donorService.addProfilePhoto(donorId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo added successfully");
        }
        catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding profile photo");
        }
    }
    private boolean isImage(MultipartFile file) {
        return file != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(file.getContentType());
    }
    @GetMapping("getPhoto/{donorId}")
    public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String donorId) {
        String photoBase64 = donorService.getProfilePhoto(donorId);

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
    @PutMapping("updatePhoto/{donorId}")
    public ResponseEntity<String> updateProfilePhoto(
            @PathVariable String donorId,
            @RequestParam("file") MultipartFile file) {
        try {
            if (!isImage(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
            }
            donorService.updateProfilePhoto(donorId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile photo");
        }
    }

    @PostMapping("/sendOtp")
    public String sendOtp(@RequestBody Donor donor) {
        return donorService.sendOtp(donor);

    }
    @PostMapping("/ForgetPassword/{email}/{otp}/{create}/{confirm}")
    public String forgetPassword(@PathVariable("email") String email, @PathVariable("create") String create, @PathVariable("otp") String otp, @PathVariable("confirm") String confirm) {
        System.out.println(create + "   " + confirm + "  " + otp);
        return donorService.forgetPassword(email,otp,create,confirm);
    }
    @PutMapping("/{donorId}/editProfile")
    public String editProfile(@PathVariable("donorId") String donorId,@RequestBody Donor donor){
        return donorService.editProfile(donorId,donor);
    }
}

