package com.example.Demo.DonorServices;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Model.*;
import com.example.Demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;
    private OrphanageRepository orphanageRepository;
    private AdminRepository adminRepository;
    @Autowired
    private EmailService emailService;
    private EventsRepository eventsRepository;
    private OrphanageDetailsRepository detailsRepository;

    public void saveUser(Optional<Donor> optionalDonor) {
        optionalDonor.ifPresent(donor -> {
            donorRepository.save(donor);
        });
    }

    public String registerUser(Donor newUser) {
        Optional<Donor> user = donorRepository.findByEmail(newUser.getEmail());
        Optional<Orphanage> orpUser=orphanageRepository.findByEmail(newUser.getEmail());
        Optional<Admin> adminUser=adminRepository.findByEmail(newUser.getEmail());

        if (user.isEmpty() && orpUser.isEmpty() && adminUser.isEmpty()) {
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
            return user.get().getPassword().equals(password);
        } else {
            return false;
        }
    }

    @Override
    public Optional<Donor> viewProfile(String donorId) {
        return donorRepository.findById(donorId);
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

    @Override
    public void addProfilePhoto(String donorId, MultipartFile file) throws IOException {
        byte[] photoBytes = file.getBytes();
        System.out.println();

        Donor donor= donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        donor.setProfilePhoto(photoBytes);
        donorRepository.save(donor);
    }
    @Override
    public String getProfilePhoto(String donorId) {
        Donor donor= donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] photoBytes = donor.getProfilePhoto();
        if (photoBytes != null && photoBytes.length > 0) {
            return Base64.getEncoder().encodeToString(photoBytes);
        } else {
            return null; // Or return a default image URL or handle it based on your requirements
        }
    }
    @Override
    public void updateProfilePhoto(String donorId, MultipartFile file) throws IOException {
        byte[] newPhotoBytes = file.getBytes();
        Donor donor= donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        donor.setProfilePhoto(newPhotoBytes);
        donorRepository.save(donor);
    }
    @Override
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
    @Override
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

    @Override
    public List<OrphanageDetails> getVerifiedOrphanageDetails() {
        return detailsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VALID));
    }

    @Override
    public Optional<OrphanageDetails> getVerifiedOrphanageDetailsById(String orpId) {
        Optional<OrphanageDetails> optionalOrphanageDetails=detailsRepository.findByOrpId(orpId);
        if(optionalOrphanageDetails.isPresent() && optionalOrphanageDetails.get().getVerificationStatus().equals(EnumClass.VerificationStatus.VALID)){
            optionalOrphanageDetails.get().setViewCount(optionalOrphanageDetails.get().getViewCount()+1);
            return optionalOrphanageDetails;
        }else {
            return Optional.empty();
        }
    }

    @Override
    public List<Events> getVerifiedEvents(String orpId) {
        return eventsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VALID),orpId);
    }

    @Override
    public void eventRegister(String eventId, String donorId) {
        Optional<Events> event=eventsRepository.findById(eventId);
        Optional<Donor> donor=donorRepository.findById(donorId);

        if(event.isPresent() && donor.isPresent())
        {
            InterestedPerson interestedPerson = null;
            interestedPerson.setDonorId(donor.get().getDonorId());
            interestedPerson.setEmails(donor.get().getEmail());
            interestedPerson.setName(donor.get().getName());
            event.get().getInterestedPersons().add(interestedPerson);
            eventsRepository.save(event.get());
            String subject="Event Registration is Done";
            String body="Dear "+donor.get().getName()+", Your Registration on "+event.get().getTitle()+" is done.Thank You for registering for our upcoming event,Your generosity is a vital contribution to our cause.";
            emailService.sendSimpleMail(donor.get().getEmail(),subject,body);

        }
    }

    @Override
    public void cancelEventRegistration(String eventId, String donorId) {
        Optional<Events> event=eventsRepository.findById(eventId);
        Optional<Donor> donor=donorRepository.findById(donorId);
        event.ifPresent(events -> events.getInterestedPersons().removeIf(person -> person.getDonorId().equals(donorId)));
        String subject="Event Registration Cancelled";
        String body="We appreciate your initial commitment, and while we understand your circumstances, we hope to welcome you back as a valued donor in the future.";
        emailService.sendSimpleMail(donor.get().getEmail(),subject,body);
    }

}
