package com.example.Demo.AdminServices;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

import com.example.Demo.Enum.EnumClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.DonationRequirements;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Repository.AdminRepository;
import com.example.Demo.Repository.DonationsRepository;
import com.example.Demo.Repository.DonationRequirementRepository;
import com.example.Demo.Repository.DonorRepository;
import com.example.Demo.Repository.EventsRepository;
import com.example.Demo.Repository.OrphanageDetailsRepository;
import com.example.Demo.Repository.OrphanageRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private AdminRepository adminRepo;
    @Autowired
    private OrphanageRepository orphanageRepository;
    @Autowired
    private DonorRepository donorRepository;
    @Autowired
    private OrphanageRepository orphanageRepo;
    @Autowired
    private OrphanageDetailsRepository orphanageDetailsRepository;
    @Autowired
    private DonorRepository donorRepo;
    @Autowired
    private EventsRepository eventRepo;
    @Autowired
    private DonationsRepository donationRepo;
    @Autowired
    private DonationRequirementRepository requireRepo;

    private String passcode = "Admin123Admin";

    Sort sort = Sort.by(Sort.Order.asc("name"));

    public void saveUser(Optional<Admin> optionalAdmin) {
        optionalAdmin.ifPresent(admin -> {
            adminRepo.save(admin);
        });
    }

    @Override
    public List<Admin> getAllAdmin() {
        return (List<Admin>) adminRepo.findAll(sort);
    }

    @Override
    public List<Orphanage> getAllOrphanage() {
        return (List<Orphanage>) orphanageRepo.findAll(sort);
    }

    @Override
    public List<OrphanageDetails> getAllOrphanageDetails() {
        return (List<OrphanageDetails>) orphanageDetailsRepository.findAll(sort);
    }

    @Override
    public List<Donor> getAllDonor() {
        return (List<Donor>) donorRepo.findAll(sort);
    }

    @Override
    public List<Events> getAllEvents() {
        return (List<Events>) eventRepo.findAll();
    }

    @Override
    public List<Donations> getAllDonations() {
        return (List<Donations>) donationRepo.findAll();
    }
    
    @Override
    public List<DonationRequirements> getAllRequirements() {
    	return (List<DonationRequirements>) requireRepo.findAll();
    }

    @Override
    public Admin editProfile(String adminId, Admin admin) {
        Optional<Admin> optionalAdmin = adminRepo.findById(adminId);

        if (optionalAdmin.isPresent()) {
            Admin existingAdmin = optionalAdmin.get();

            Class<?> adminClass = Admin.class;
            Field[] fields = adminClass.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);

                try {
                    Object newValue = field.get(admin);
                    if (newValue != null && !newValue.toString().isEmpty()) {
                        field.set(existingAdmin, newValue);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace(); // Handle the exception according to your needs
                }
            }

            adminRepo.save(existingAdmin);
            return existingAdmin;
        }

        return null;
    }

    @Override
    public String registerUser(Admin newUser) {
        Optional<Admin> user = adminRepo.findByEmail(newUser.getEmail());
        Optional<Orphanage> orpUser=orphanageRepository.findByEmail(newUser.getEmail());
        Optional<Donor> donorUser=donorRepository.findByEmail(newUser.getEmail());
        if (user.isEmpty() && orpUser.isEmpty() && donorUser.isEmpty()) {
            if (newUser.getPasscode().equals(passcode)) {
                newUser.setRole(String.valueOf(EnumClass.Roles.ADMIN));
                adminRepo.save(newUser);
                String subject = "Registration Successful";
                String body = "Dear Admin, congratulations on taking the lead in maintaining the Happy Faces website! Your dedication will make a positive impact on our mission to support and uplift the lives of those in need.";
                emailService.sendSimpleMail(newUser.getEmail(), subject, body);
                return "Success";
            } else {
                return "Enter Correct Passcode";
            }
        } else {
            return "You are an existing user. Please Login";
        }
    }

    @Override
    public boolean loginUser(String email, String password) {
        Optional<Admin> user = adminRepo.findByEmail(email);
        if (user.isPresent()) {
            return user.isPresent() && user.get().getPassword().equals(password);
        } else {
            return false;
        }
    }

    @Override
    public String addProfilePhoto(String adminId, MultipartFile file) throws IOException {
        byte[] photoBytes = file.getBytes();
        System.out.println();

        Admin admin = adminRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        admin.setProfilePhoto(photoBytes);
        adminRepo.save(admin);
        return "Profile Photo Added Successfully";
    }

    public String getProfilePhoto(String adminId) {
        Admin admin = adminRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] photoBytes = admin.getProfilePhoto();
        if (photoBytes != null && photoBytes.length > 0) {
            return Base64.getEncoder().encodeToString(photoBytes);
        } else {
            return null; // Or return a default image URL or handle it based on your requirements
        }
    }

    public void updateProfilePhoto(String adminId, MultipartFile file) throws IOException {
        byte[] newPhotoBytes = file.getBytes();
        Admin admin = adminRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        admin.setProfilePhoto(newPhotoBytes);
        adminRepo.save(admin);
    }

    @Override
    public OrphanageDetails getOrphanageDetailByOrphanageId(String orpId) {
        return orphanageDetailsRepository.findByOrpId(orpId).orElse(null);
    }

    @Override
    public OrphanageDetails verifyOrphanageDetails(String orpId, String verificationStatus) {
        Optional<OrphanageDetails> orphanage = orphanageDetailsRepository.findByOrpId(orpId);
        if (orphanage.isPresent()) {
            orphanage.get().setVerificationStatus(EnumClass.VerificationStatus.valueOf(verificationStatus));
            orphanageDetailsRepository.save(orphanage.get());
            return orphanage.get();
        }
        return null;
    }

    @Override
    public Events verifyEventDetails(String orpId, String verificationStatus) {
        Optional<Events> event = eventRepo.findByOrpId(orpId);
        if (event.isPresent()) {
            event.get().setVerificationStatus(EnumClass.VerificationStatus.valueOf(verificationStatus));
            eventRepo.save(event.get());
            return event.get();
        }
        return null;
    }


    @Override
    public OrphanageDetails notVerifyEventDetails(Events event) {
        return null;
    }

    @Override
    public Orphanage getOrphanageById(String id) {
        Optional<Orphanage> orphanage = orphanageRepo.findById(id);
        return orphanage.orElse(null);
    }

    @Override
    public Donor getDonorById(String id) {
        Optional<Donor> donor = donorRepo.findById(id);
        return donor.orElse(null);
    }

    @Override
    public Admin getAdminById(String id) {
        Optional<Admin> admin = adminRepo.findById(id);
        return admin.orElse(null);
    }


    @Override
    public Events getEventById(String id) {
        Optional<Events> event = eventRepo.findById(id);
        return event.orElse(null);
    }

    @Override
    public List<Events> getEventsByOrphanageId(String id) {
        return eventRepo.getEventsByOrpId(id);
    }

    @Override
    public Donations getDonationById(String id) {
        Optional<Donations> donation = donationRepo.findById(id);
        return donation.orElse(null);
    }

    @Override
    public List<Donations> getDonationsByOrphanageId(String id) {
        return donationRepo.getDonationsByOrpId(id);
    }

    @Override
    public List<Donations> getDonationsByDonorId(String id) {
        return donationRepo.getDonationsByDonorId(id);
    }

    private String Otp;

    public String sendOtp(Admin admin) {

        Optional<Admin> user = adminRepo.findByEmail(admin.getEmail());
//		if (saved.isPresent()) {
        if (user.isPresent()) {
            String subject = "OTP";

            String sixDigitCode = String.valueOf(10000 + new Random().nextInt(900000));

            String body = "Dear admin OTP to change password is " + sixDigitCode;

//            user.get().setOtp(sixDigitCode);
//            saveUser(user);
            Otp = sixDigitCode;

            emailService.sendSimpleMail(user.get().getEmail(), subject, body);

            return sixDigitCode;
        }
        return null;
    }

    public String forgetPassword(String email, String otp, String create, String confirm) {
        Optional<Admin> user = adminRepo.findByEmail(email);
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

    @Override
    public Admin changeAdminPassword(String email, String oldPassword, String newPassword, String confirmNewPassword) {
        Optional<Admin> admin=adminRepo.findByEmail(email);
        if(admin.isPresent()){
            if(newPassword.equals(confirmNewPassword)){
                admin.get().setPassword(newPassword);
                adminRepo.save(admin.get());
                return admin.get();
            }
            return null;
        }
        return null;
    }
    @Override
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepo.findByEmail(email);
    }
    
    @Override
    public byte[] getCertificate(String orpId) {
        Optional<OrphanageDetails> optionalOrphanageDetails = orphanageDetailsRepository.findByOrpId(orpId);
        if (optionalOrphanageDetails.isPresent()) {
            OrphanageDetails orphanageDetails = optionalOrphanageDetails.get();
            byte[] certificateBytes = orphanageDetails.getCertificate();
            if (certificateBytes != null) {
                return Base64.getDecoder().decode(certificateBytes);
            }
        }
        return null;
    }

}
