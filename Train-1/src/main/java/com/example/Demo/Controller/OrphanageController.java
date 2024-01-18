package com.example.Demo.Controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.Demo.Model.Events;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.OrphanageServices.OrphanageService;
import com.example.Demo.Repository.OrphanageRepository;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<String> registerUser(@RequestBody Orphanage user) {
        String alpha=orphanageService.registerUser(user);
        if(alpha.equals("Success")){
            return new ResponseEntity<>("Registration Successful",HttpStatus.OK);
        }
        return new ResponseEntity<>("You are an existing user. Please SignIn",HttpStatus.CONFLICT);

    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {

        if (orphanageService.loginUser(loginData.get("email"), loginData.get("password"))) {
            return new ResponseEntity<>("Login successful!",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password",HttpStatus.CONFLICT);
        }
    }
    private static final List<String> ALLOWED_IMAGE_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/bmp"
    );
    @PostMapping("addPhoto/{orphanageId}")
    public ResponseEntity<String> addProfilePhoto(
            @PathVariable String orphanageId,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            // Check if the uploaded file is an image
            if (!isImage(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
            }
            orphanageService.addProfilePhoto(orphanageId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo added successfully");
        }
        catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding profile photo");
        }
    }
    private boolean isImage(MultipartFile file) {
        return file != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(file.getContentType());
    }
    @GetMapping("getPhoto/{orphanageId}")
    public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String orphanageId) {
        String photoBase64 = orphanageService.getProfilePhoto(orphanageId);

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
    @PutMapping("updatePhoto/{orphanageId}")
    public ResponseEntity<String> updateProfilePhoto(
            @PathVariable String orphanageId,
            @RequestParam("file") MultipartFile file) {
        try {
            if (!isImage(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");
            }
            orphanageService.updateProfilePhoto(orphanageId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body("Profile photo updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile photo");
        }
    }

    @PostMapping("/enterDetails")
    public String updateDetails(@RequestBody OrphanageDetails detail) {
        return orphanageService.updateDetails(detail);

    }
    @PostMapping("/createEvent")
    public String createEvents(@RequestBody Events event){
        return orphanageService.createEvents(event);
    }

    @PostMapping("/cancelEvent/{eventId}")
    public String cancelEvents(@PathVariable String eventId){
        return orphanageService.cancelEvent(eventId);
    }

    @PutMapping("/editEvents/{eventId}")
    public String editEvents(@PathVariable String eventId,@RequestBody Events event){
        return orphanageService.editEvent(eventId,event);
    }
    @PostMapping("/sendOtp")
    public String sendOtp(@RequestBody Orphanage orphanage) {
        return orphanageService.sendOtp(orphanage);

    }
    @PostMapping("/ForgetPassword/{email}/{otp}/{create}/{confirm}")
    public String forgetPassword(@PathVariable("email") String email,@PathVariable("create") String create,@PathVariable("otp") String otp,@PathVariable("confirm") String confirm) {
        System.out.println(create + "   " + confirm + "  " + otp);
        return orphanageService.forgetPassword(email,otp,create,confirm);
    }
    @PutMapping("/{orphanageId}/editProfile")
    public String editProfile(@PathVariable("orphanageId") String orphanageId,@RequestBody Orphanage orphanage){
        return orphanageService.editProfile(orphanageId,orphanage);
    }

    @GetMapping("/{orphanageId}/details")
    public Optional<OrphanageDetails> detailsById(@PathVariable("orphanageId") String orphanageId){
        return orphanageService.getDetailById(orphanageId);
    }
    @PutMapping("/{orphanageId}/editDetails")
    public String editDetails(@PathVariable("orphanageId") String orphanageId,@RequestBody OrphanageDetails orphanageDetails){
        return orphanageService.editDetails(orphanageId,orphanageDetails);
    }
}
