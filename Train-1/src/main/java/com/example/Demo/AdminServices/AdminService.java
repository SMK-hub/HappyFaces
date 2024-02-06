package com.example.Demo.AdminServices;


import java.io.IOException;
import java.util.List;

import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import org.springframework.web.multipart.MultipartFile;

public interface AdminService {

    List<Admin> getAllAdmin();

    List<Orphanage> getAllOrphanage();

    List<OrphanageDetails> getAllOrphanageDetails();

    List<Donor> getAllDonor();

    List<Events> getAllEvents();

    List<Donations> getAllDonations();

    String registerUser(Admin user);

    boolean loginUser(String email, String password);

    String addProfilePhoto(String adminId, MultipartFile file) throws IOException;

    String getProfilePhoto(String adminId);

    void updateProfilePhoto(String adminId, MultipartFile file) throws IOException;

    OrphanageDetails getOrphanageDetailByOrphanageId(String orpId);

    String verifyOrphanageDetails(OrphanageDetails orph);

    String editProfile(String adminId,Admin admin);

    String verifyEventDetails(Events event);

    Orphanage getOrphanageById(String id);

    Donor getDonorById(String id);

    Admin getAdminById(String id);

    Events getEventById(String id);

    List<Events> getEventsByOrphanageId(String id);

    Donations getDonationById(String id);

    List<Donations> getDonationsByOrphanageId(String id);

    List<Donations> getDonationsByDonorId(String id);

    String sendOtp(Admin admin);

    String forgetPassword(String email, String otp, String create, String confirm);

}
