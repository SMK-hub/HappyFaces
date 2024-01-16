package com.example.Demo.DonorServices;

import com.example.Demo.Model.Donor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DonorService {

    String registerUser(Donor user);

    boolean loginUser(String email, String password);

    String editProfile(String donorId,Donor donor);
    void addProfilePhoto(String donorId, MultipartFile file) throws IOException;

    String getProfilePhoto(String donorId);

    void updateProfilePhoto(String donorId, MultipartFile file) throws IOException;

    String sendOtp(Donor donor);

    String forgetPassword(String email, String otp, String create, String confirm);

    void eventRegister(String eventId,String donorId);
    void cancelEventRegistration(String eventId,String donorId);

}
