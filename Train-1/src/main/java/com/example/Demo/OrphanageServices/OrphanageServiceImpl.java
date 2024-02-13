package com.example.Demo.OrphanageServices;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Enum.EnumClass.VerificationStatus;
import com.example.Demo.Model.*;
import com.example.Demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

@Service
public class OrphanageServiceImpl implements OrphanageService {

    @Autowired
    private OrphanageRepository orphanageRepository;
    @Autowired
    private DonorRepository donorRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private OrphanageDetailsRepository detailRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OrphanageImageRepository orphanageImageRepository;
    @Autowired
    private OrphanageDetailsRepository orphanageDetailsRepository;

    public void saveUser(Optional<Orphanage> optionalOrphanage) {
        optionalOrphanage.ifPresent(orphanage -> {
            orphanageRepository.save(orphanage);
        });
    }

    public String registerUser(Orphanage newUser) {
        Optional<Orphanage> user = orphanageRepository.findByEmail(newUser.getEmail());
        Optional<Donor> donorUser=donorRepository.findByEmail(newUser.getEmail());
        Optional<Admin> adminUser=adminRepository.findByEmail(newUser.getEmail());

        if (user.isEmpty() && donorUser.isEmpty() && adminUser.isEmpty()) {
            newUser.setRole(String.valueOf(EnumClass.Roles.ORPHANAGE));
            orphanageRepository.save(newUser);
            String subject = "Registration Successful";
            String body = "Dear " + newUser.getName()
                    + ", thank you for registering with Happy Faces! Your commitment to our cause brings hope and happiness to the lives of many. Welcome to our compassionate community!";
            emailService.sendSimpleMail(newUser.getEmail(), subject, body);
            return "Success";
        } else {
            return "You are an existing user.\nPlease Login";
        }
    }

    @Override
    public boolean loginUser(String email, String password) {
        Optional<Orphanage> user = orphanageRepository.findByEmail(email);
        if (user.isPresent()) {
            return user != null && user.get().getPassword().equals(password);
        } else {
            return false;
        }
    }

    @Override
    public String updateDetails(OrphanageDetails details) {
        Optional<OrphanageDetails> orphanageDetails = orphanageDetailsRepository.findByOrpId(details.getOrpId());
        if(orphanageDetails.isPresent()) {
            orphanageDetails.get().setVerificationStatus(VerificationStatus.NOT_VERIFIED);
            detailRepository.save(orphanageDetails.get());
            return "Updated Successfully";
        }
        else{
            details.setVerificationStatus(VerificationStatus.NOT_VERIFIED);
            detailRepository.save(details);
            return "Details Added successfully";
        }
    }
    @Override
    public void addProfilePhoto(String orphanageId, MultipartFile file) throws IOException {
        byte[] photoBytes = file.getBytes();
        System.out.println();

        Orphanage orphanage= orphanageRepository.findById(orphanageId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        orphanage.setProfilePhoto(photoBytes);
        orphanageRepository.save(orphanage);
    }

    @Override
    public String getProfilePhoto(String orphanageId) {
        Orphanage orphanage= orphanageRepository.findById(orphanageId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] photoBytes = orphanage.getProfilePhoto();
        if (photoBytes != null && photoBytes.length > 0) {
            return Base64.getEncoder().encodeToString(photoBytes);
        } else {
            return null; // Or return a default image URL or handle it based on your requirements
        }
    }

    public void updateProfilePhoto(String orphanageId, MultipartFile file) throws IOException {
        byte[] newPhotoBytes = file.getBytes();
        Orphanage orphanage= orphanageRepository.findById(orphanageId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        orphanage.setProfilePhoto(newPhotoBytes);
        orphanageRepository.save(orphanage);
    }

    @Override
    public String createEvents(Events event) {
        Optional<Events> oldEvent = eventsRepository.getEventsByOrpId(event.getOrpId())
                .stream()
                .filter(xEvent-> xEvent.getEventStatus().equals(EnumClass.EventStatus.PLANNED) || xEvent.getEventStatus().equals(EnumClass.EventStatus.ONGOING))
                .filter(xEvent-> xEvent.getTitle().equals(event.getTitle()))
                .findAny();
        if(oldEvent.isEmpty()) {
            event.setEventStatus(EnumClass.EventStatus.PLANNED);
            event.setVerificationStatus(EnumClass.VerificationStatus.NOT_VERIFIED);
            eventsRepository.save(event);
            return "Event Created";
        }
        return null;
    }
    @Override
    public String editEvent(String eventId,Events event){
        Optional<Events> optionalEvents=eventsRepository.findById(eventId);
        if(optionalEvents.isPresent()){
            event.setId(eventId);
            eventsRepository.save(event);
            return "Event Updated Successfully";
        }
        return "Error occurred try again";
    }

    @Override
    public String cancelEvent(String eventId) {
        Optional<Events> optionalEvent = eventsRepository.findById(eventId);
        optionalEvent.ifPresent(events -> events.setEventStatus(EnumClass.EventStatus.CANCELLED));
        return "Event Cancelled Successfully";
    }

    @Override
    public Optional<OrphanageDetails> getDetailById(String orpId) {
        Optional<OrphanageDetails> optionalOrphanageDetails = detailRepository.findByOrpId(orpId);
        if (optionalOrphanageDetails.isPresent()) {
            return optionalOrphanageDetails;
        }
        return Optional.empty();
    }

    private String Otp;

    public String sendOtp(Orphanage orphanage) {

        Optional<Orphanage> user = orphanageRepository.findByEmail(orphanage.getEmail());
//		if (saved.isPresent()) {
        if (user.isPresent()) {
            String subject = "OTP";

            String sixDigitCode = String.valueOf(10000 + new Random().nextInt(900000));

            String body = "Dear admin OTP to change password is " + sixDigitCode;

//            user.get().setOtp(sixDigitCode);
//            saveUser(user);
            Otp = sixDigitCode;
            emailService.sendSimpleMail(user.get().getEmail(), subject, body);

            return Otp;
        }
        return null;
    }

    public String forgetPassword(String email, String otp, String create, String confirm) {
        Optional<Orphanage> user = orphanageRepository.findByEmail(email);
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

    public Orphanage editProfile(String orphanageId, Orphanage orphanage) {
        Optional<Orphanage> optionalOrphanage = orphanageRepository.findById(orphanageId);
        if (optionalOrphanage.isPresent()) {
            Orphanage existingOrphanage = optionalOrphanage.get();

            Class<?> orphanageClass = Orphanage.class;
            Field[] fields = orphanageClass.getDeclaredFields();

            for(Field field:fields){
                field.setAccessible(true);

                try{
                    Object newValue = field.get(orphanage);
                    if(newValue != null && !newValue.toString().isEmpty()){
                        field.set(existingOrphanage,newValue);
                    }
                }catch (IllegalAccessException e) {
                    e.printStackTrace(); // Handle the exception according to your needs
                }
            }

            orphanageRepository.save(existingOrphanage);
            return existingOrphanage;
        }
        return null;
    }

    @Override
    public String editDetails(String orphanageId, OrphanageDetails orphanageDetails) {
        Optional<OrphanageDetails> optionalOrphanageDetails = detailRepository.findById(orphanageId);
        if (optionalOrphanageDetails.isPresent()) {
            orphanageDetails.setId(orphanageId);
            detailRepository.save(orphanageDetails);
            return "Details Updated Successfully";
        }
        return null;
    }
    @Override
    public void uploadImages(String orphanageId, List<MultipartFile> imageFiles) throws IOException {
        for (MultipartFile file : imageFiles) {
            byte[] imageData = file.getBytes();
            OrphanageImage orphanageImage = new OrphanageImage();
            orphanageImage.setOrphanageId(orphanageId);
            orphanageImage.setImage(imageData);
            orphanageImageRepository.save(orphanageImage);
        }
    }

    @Override
    public List<OrphanageImage> getOrphanageImagesById(String orphanageId) {
        return orphanageImageRepository.findOrphanageImageByOrphanageId(orphanageId);
    }


    @Override
    public void removeImage(String orphanageId, String imageId) {
        orphanageImageRepository.deleteByOrphanageIdAndId(orphanageId, imageId);
    }

    @Override
    public Optional<Orphanage> getOrphanageByEmail(String email) {
        return orphanageRepository.findByEmail(email);
    }

    @Override
    public String storeCertificate(String orpId, MultipartFile file) throws IOException {
        Optional<OrphanageDetails> optionalOrphanageDetails = orphanageDetailsRepository.findByOrpId(orpId);
        if (optionalOrphanageDetails.isPresent()) {
            OrphanageDetails orphanageDetails = optionalOrphanageDetails.get();
            orphanageDetails.setCertificate(Base64.getEncoder().encodeToString(file.getBytes()).getBytes());
            // Ensure the OrphanageDetails object has an ID before saving
            if (orphanageDetails.getId() == null) {
                orphanageDetails.setId(UUID.randomUUID().toString()); // Generate a new ID if it's null
            }
            orphanageDetailsRepository.save(orphanageDetails);
            return "Certificate Uploaded Successfully";
        }
        return null; // OrphanageDetails not found
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

    @Override
    public Optional<Orphanage> changeOrphanagePassword(String email, String oldPassword, String newPassword, String conformNewPassword) {
        Optional<Orphanage> orphanage=orphanageRepository.findByEmail(email);
        if(orphanage.isPresent()){
            if(newPassword.equals(conformNewPassword)){
                orphanage.get().setPassword(newPassword);
                orphanageRepository.save(orphanage.get());
                return orphanage;
            }
            return Optional.empty();
        }
        return Optional.empty();
    }
}
