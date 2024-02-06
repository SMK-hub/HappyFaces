package com.example.Demo.Controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.Demo.AdminServices.AdminService;
import com.example.Demo.Model.*;
import com.example.Demo.OrphanageServices.OrphanageService;
import org.apache.coyote.Response;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.DonorServices.DonorService;
import com.example.Demo.Repository.DonorRepository;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/donor")
public class DonorController {

    @Autowired
    private DonorService donorService;
    private OrphanageService orphanageService;
    private AdminService adminService;
    @Autowired
    private DonorRepository userRepo;

    @GetMapping
    public ResponseEntity<List<Donor>> getAll() {
        return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Donor user) {
        String alpha = donorService.registerUser(user);
        if (alpha.equals("Success")) {
            return new ResponseEntity<>("Registration Successful", HttpStatus.OK);
        }
        return new ResponseEntity<>("Existing User", HttpStatus.CONFLICT);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {

        if (donorService.loginUser(loginData.get("email"), loginData.get("password"))) {
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login Failed", HttpStatus.CONFLICT);
        }
    }

    private static final List<String> ALLOWED_IMAGE_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/bmp"
    );

    @PostMapping("/addPhoto/{donorId}")
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
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding profile photo");
        }
    }

    private boolean isImage(MultipartFile file) {
        return file != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(file.getContentType());
    }

    @GetMapping("/getPhoto/{donorId}")
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
    @PutMapping("/updatePhoto/{donorId}")
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
    public ResponseEntity<String> sendOtp(@RequestBody Donor donor) {
        return new ResponseEntity<>(donorService.sendOtp(donor),HttpStatus.OK);

    }

    @PostMapping("/ForgetPassword/{email}/{otp}/{create}/{confirm}")
    public ResponseEntity<String> forgetPassword(@PathVariable("email") String email, @PathVariable("create") String create, @PathVariable("otp") String otp, @PathVariable("confirm") String confirm) {
        System.out.println(create + "   " + confirm + "  " + otp);
        String alpha=donorService.forgetPassword(email, otp, create, confirm);
        if(alpha.equals("Password Changed Successfully")){
            return new ResponseEntity<>(alpha,HttpStatus.OK);
        }
        return new ResponseEntity<>(alpha,HttpStatus.CONFLICT);
    }
    @PostMapping("/ChangePassword/{email}/{oldPassword}/{newPassword}/{conformNewPassword}")
    public ResponseEntity<Donor> changeDonorPassword(@PathVariable("email") String email,@PathVariable("oldPassword") String oldPassword,@PathVariable("newPassword") String newPassword,@PathVariable("conformNewPassword") String conformNewPassword){
        Donor alpha=donorService.changeDonorPassword(email,oldPassword,newPassword,conformNewPassword);
        if(alpha!=null){
            return new ResponseEntity<>(alpha,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);
    }

    @PutMapping("/{donorId}/editProfile")
    public ResponseEntity<Donor> editProfile(@PathVariable("donorId") String donorId, @RequestBody Donor donor) {
        Donor donorValue = donorService.editProfile(donorId, donor);
        if(donorValue!=null){
            return new ResponseEntity<>(donorValue,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);
    }

    @GetMapping("/OrphanageDetails")
    public ResponseEntity<List<OrphanageDetails>> getVerifiedOrphanageDetails() {
        return ResponseEntity.ok(donorService.getVerifiedOrphanageDetails());
    }

    @PostMapping("/{orphanageId}/OrphanageDetails")
    public ResponseEntity<Optional<OrphanageDetails>> getVerifiedOrphanageDetailsById(@PathVariable("orphanageId") String orphanageId) {
        return ResponseEntity.ok(donorService.getVerifiedOrphanageDetailsById(orphanageId));
    }

    @GetMapping("/{orphanageId}/VerifiedEvents")
    public ResponseEntity<List<Events>> getVerifiedEvents(@PathVariable("orphanageId") String orphanageId) {
        return ResponseEntity.ok(donorService.getVerifiedEvents(orphanageId));
    }

    @PostMapping("/{donorId}/eventRegister/{eventId}")
    public ResponseEntity<String> eventRegister(@PathVariable("donorId") String donorId, @PathVariable("eventId") String eventId) {
        donorService.eventRegister(eventId, donorId);
        return new ResponseEntity<>("Registration Successfully Done", HttpStatus.OK);
    }

    @PostMapping("/{donorId}/cancelEventRegister/{eventId}")
    public ResponseEntity<String> cancelEventRegister(@PathVariable("donorId") String donorId, @PathVariable("eventId") String eventId) {
        donorService.cancelEventRegistration(eventId, donorId);
        return new ResponseEntity<>("Registration Canceled Successfully", HttpStatus.OK);
    }

    @GetMapping("/donor/{donorEmail}")
    public ResponseEntity<Donor> getDonorByEmail(@PathVariable String donorEmail){
        Optional<Donor> donor=donorService.getDonorByEmail(donorEmail);
        return donor.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }
    @GetMapping("/orphanageImages/{orphanageId}")
    public ResponseEntity<List<OrphanageImage>> getOrphanageImageById(@PathVariable String orphanageId){
        List<OrphanageImage> images=orphanageService.getOrphanageImagesById(orphanageId);
        if((long) images.size() > 0){
            return new ResponseEntity<>(images,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);
    }
    @GetMapping("/DonationList/{donorId}")
    public ResponseEntity<List<Donations>> getDonationById(@PathVariable String donorId){
        List<Donations> donations=adminService.getDonationsByDonorId(donorId);
        if((long) donations.size() > 0){
            return new ResponseEntity<>(donations,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);
    }

}
