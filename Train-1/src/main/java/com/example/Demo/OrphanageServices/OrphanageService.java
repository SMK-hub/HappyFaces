package com.example.Demo.OrphanageServices;

import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface OrphanageService {

    String registerUser(Orphanage user);

    boolean loginUser(String email, String password);

    Optional<OrphanageDetails> getDetailById(String orpId);

    String updateDetails(OrphanageDetails details);

    void addProfilePhoto(String orphanageId, MultipartFile file) throws IOException;

    String getProfilePhoto(String orphanageId);

    void updateProfilePhoto(String orphanageId, MultipartFile file) throws IOException;

    String createEvents(Events event);

    String editEvent(String eventId,Events event);

    String cancelEvent(String eventId);

    String sendOtp(Orphanage orphanage);

    public String forgetPassword(String email, String otp, String create, String confirm);

    String editProfile(String orphanageId, Orphanage orphanage);

    String editDetails(String orphanageId, OrphanageDetails orphanageDetails);
}
