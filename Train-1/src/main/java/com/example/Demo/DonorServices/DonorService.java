package com.example.Demo.DonorServices;

import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.OrphanageDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface DonorService {

    String registerUser(Donor user);

    boolean loginUser(String email, String password);

    Optional<Donor> viewProfile(String donorId);

    String editProfile(String donorId, Donor donor);

    void addProfilePhoto(String donorId, MultipartFile file) throws IOException;

    String getProfilePhoto(String donorId);

    void updateProfilePhoto(String donorId, MultipartFile file) throws IOException;

    String sendOtp(Donor donor);

    String forgetPassword(String email, String otp, String create, String confirm);

    List<OrphanageDetails> getVerifiedOrphanageDetails();

    Optional<OrphanageDetails> getVerifiedOrphanageDetailsById(String orpId);

    List<Events> getVerifiedEvents(String orpId);

    void eventRegister(String eventId, String donorId);

    void cancelEventRegistration(String eventId, String donorId);

    Optional<Donor> getDonorByEmail(String email);

}
