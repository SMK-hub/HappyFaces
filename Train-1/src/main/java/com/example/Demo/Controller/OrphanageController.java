package com.example.Demo.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.Demo.Model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.OrphanageServices.OrphanageService;
import com.example.Demo.Repository.OrphanageRepository;

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
    public String registerUser(@RequestBody Orphanage user) {
        return orphanageService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, String> loginData) {

        if (orphanageService.loginUser(loginData.get("email"), loginData.get("password"))) {
            return "Login successful!";
        } else {
            return "Invalid email or password";
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
