package com.example.Demo.DonorServices;

import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donor;

public interface DonorService {

    String registerUser(Donor user);

    boolean loginUser(String email, String password);

    String editProfile(String donorId,Donor donor);

    String sendOtp(Donor donor);

    public String forgetPassword(String email, String otp, String create, String confirm);

}
