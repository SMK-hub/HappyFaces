package com.example.Demo.OrphanageServices;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Enum.EnumClass.VerificationStatus;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Repository.EventsRepository;
import com.example.Demo.Repository.OrphanageDetailsRepository;
import com.example.Demo.Repository.OrphanageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class OrphanageServiceImpl implements OrphanageService {

    @Autowired
    private OrphanageRepository orphanageRepository;
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private OrphanageDetailsRepository detailRepository;
    @Autowired
    private EmailService emailService;

    public void saveUser(Optional<Orphanage> optionalOrphanage) {
        optionalOrphanage.ifPresent(orphanage -> {
            orphanageRepository.save(orphanage);
        });
    }

    public String registerUser(Orphanage newUser) {
        Optional<Orphanage> user = orphanageRepository.findByEmail(newUser.getEmail());

        if (user.isEmpty()) {
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
        details.setVerificationStatus(VerificationStatus.NOT_VERIFIED);
        detailRepository.save(details);
        return "Updated Successfully";
    }

    @Override
    public String createEvents(Events event) {
        event.setEventStatus(EnumClass.EventStatus.PLANNED);
        event.setVerificationStatus(EnumClass.VerificationStatus.NOT_VERIFIED);
        eventsRepository.save(event);
        return null;
    }

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

            return "Otp sent successfully";
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

    public String editProfile(String orphanageId, Orphanage orphanage) {
        Optional<Orphanage> optionalOrphanage = orphanageRepository.findById(orphanageId);
        if (optionalOrphanage.isPresent()) {
            orphanageRepository.save(orphanage);
            return "Profile changed Successfully";
        }
        return null;
    }

    @Override
    public String editDetails(String orphanageId, OrphanageDetails orphanageDetails) {
        Optional<OrphanageDetails> optionalOrphanageDetails = detailRepository.findById(orphanageId);
        if (optionalOrphanageDetails.isPresent()) {
            detailRepository.save(orphanageDetails);
            return "Profile changed Successfully";
        }
        return null;
    }

}
