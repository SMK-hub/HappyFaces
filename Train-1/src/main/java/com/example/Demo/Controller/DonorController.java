package com.example.Demo.Controller;

import java.util.List;
import java.util.Map;

import com.example.Demo.Model.Orphanage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Demo.DonorServices.DonorService;
import com.example.Demo.Model.Donor;
import com.example.Demo.Repository.DonorRepository;

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
    public String registerUser(@RequestBody Donor user) {
        return donorService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, String> loginData) {

        if (donorService.loginUser(loginData.get("email"), loginData.get("password"))) {
            return "Login successful!";
        } else {
            return "Invalid email or password";
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

