package com.example.Demo.DonorServices;

import java.util.Optional;
import java.util.Random;

import com.example.Demo.Model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Model.Donor;
import com.example.Demo.Repository.DonorRepository;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;
    @Autowired
    private EmailService emailService;

    public void saveUser(Optional<Donor> optionalDonor) {
        optionalDonor.ifPresent(donor -> {

            donorRepository.save(donor);
        });
    }

    public String registerUser(Donor newUser) {
        Optional<Donor> user = donorRepository.findByEmail(newUser.getEmail());

        if (user.isEmpty()) {
            donorRepository.save(newUser);
            String subject = "Registration Successful";
            String body = "Dear " + newUser.getName() + ", Welcome to Happy Faces! Your registration as a donor brings smiles to countless faces. Thank you for joining us in making a positive impact!";
            emailService.sendSimpleMail(newUser.getEmail(), subject, body);
            return "Success";
        } else {
            return "You are an existing user.\nPlease Login";
        }
    }

    @Override
    public boolean loginUser(String email, String password) {
        Optional<Donor> user = donorRepository.findByEmail(email);
        if (user.isPresent()) {
            return user != null && user.get().getPassword().equals(password);
        } else {
            return false;
        }
    }

    @Override
    public String editProfile(String donorId, Donor donor) {

            Optional<Donor> optionalDonor=donorRepository.findById(donorId);
            if(optionalDonor.isPresent()){
                donor.setDonorId(donorId);
                donorRepository.save(donor);
                return "Profile Updated Successfully";
            }
            return null;

    }

    public String sendOtp(Donor donor) {

        Optional<Donor> user = donorRepository.findByEmail(donor.getEmail());
//		if (saved.isPresent()) {
        if (user.isPresent()) {
            String subject = "OTP";

            String sixDigitCode = String.valueOf(10000 + new Random().nextInt(900000));

            String body = "Dear admin OTP to change password is " + sixDigitCode;

//            user.get().setOtp(sixDigitCode);
//            saveUser(user);
            Otp=sixDigitCode;
            emailService.sendSimpleMail(user.get().getEmail(), subject, body);

            return sixDigitCode;
        }
        return null;
    }
    private String Otp;
    public String forgetPassword(String email, String otp, String create, String confirm) {
        Optional<Donor> user = donorRepository.findByEmail(email);
//	if(saved.isPresent()) {

        System.out.println("forget");
        if (user.isPresent()) {
            if (!Otp.equals(otp))
                return "OTP not matched";
            if (create.equals(confirm)) {
                user.get().setPassword(confirm);
                saveUser(user);
                return "Password Changed Successfully";
            } else {
                return "Password Do not Matched";
            }
        }
        return "user not existed";
    }

}
