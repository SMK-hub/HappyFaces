package com.example.Demo.DonorServices;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

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
    @Autowired
    private OrphanageDetailsRepository orphanageDetailsRepository;
    @Autowired
    private DonationRequirementRepository donationRequirementRepository;
    @Autowired
    private InterestedPersonRepository interestedPersonRepository;
    @Autowired
    private OrphanageRepository orphanageRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private OrphanageDetailsRepository detailsRepository;
    @Autowired
    private DonationsRepository donationsRepository;

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
            newUser.setRole(EnumClass.Roles.valueOf(String.valueOf(EnumClass.Roles.DONOR)));
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
    public Donor editProfile(String donorId, Donor donor) {
        Optional<Donor> optionalDonor = donorRepository.findById(donorId);

        if (optionalDonor.isPresent()) {
            Donor existingDonor = optionalDonor.get();

            Class<?> donorClass = Donor.class;
            Field[] fields = donorClass.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);

                try {
                    Object newValue = field.get(donor);
                    if (newValue != null && !newValue.toString().isEmpty()) {
                        field.set(existingDonor, newValue);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace(); // Handle the exception according to your needs
                }
            }

            donorRepository.save(existingDonor);
            return existingDonor;
        }

        return null;
    }

    @Override
    public Donor addProfilePhoto(String donorId, MultipartFile file) throws IOException {
        byte[] photoBytes = file.getBytes();
        System.out.println();

        Donor donor= donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        donor.setProfilePhoto(photoBytes);
        donorRepository.save(donor);
        return donor;
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
        return detailsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VERIFIED));
    }

    @Override
    public Optional<OrphanageDetails> getVerifiedOrphanageDetailsById(String orpId) {
        Optional<OrphanageDetails> optionalOrphanageDetails=detailsRepository.findByOrpId(orpId);
        if(optionalOrphanageDetails.isPresent() && optionalOrphanageDetails.get().getVerificationStatus().equals(EnumClass.VerificationStatus.VERIFIED)){
            return optionalOrphanageDetails;
        }else {
            return Optional.empty();
        }
    }

    @Override
    public List<Events> getVerifiedEvents(String orpId) {
        return eventsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VERIFIED),orpId);
    }

    @Override
    public String eventRegister(String eventId, String donorId) {
        Optional<Events> event = eventsRepository.findById(eventId);
        Optional<Donor> donor = donorRepository.findById(donorId);
        List<InterestedPerson> donorParticipating = interestedPersonRepository.findAllInterestedPersonByDonorId(donorId);
        Optional<InterestedPerson> checkingEvent= donorParticipating.stream().filter(donorParticipating1->donorParticipating1.getEventId().equals(eventId)).findAny();

        if (event.isPresent() && donor.isPresent() && checkingEvent.isEmpty()) {
            InterestedPerson interestedPerson = new InterestedPerson(); // Initialize the object

            interestedPerson.setDonorId(donor.get().getDonorId());
            interestedPerson.setContact(donor.get().getContact());
            interestedPerson.setEmail(donor.get().getEmail());
            interestedPerson.setName(donor.get().getName());
            interestedPerson.setEventId(event.get().getId());

            interestedPersonRepository.save(interestedPerson);

            String subject = "Event Registration is Done";
            String body = "Dear " + donor.get().getName() + ", Your Registration on " + event.get().getTitle() + " is done. Thank You for registering for our upcoming event,Your generosity is a vital contribution to our cause.";
            emailService.sendSimpleMail(donor.get().getEmail(), subject, body);
            return subject;
        }
        return "Problem in Event Registration Process";
    }

    @Override
    public String cancelEventRegistration(String eventId, String donorId) {
        List<InterestedPerson> donorParticipating = interestedPersonRepository.findAllInterestedPersonByDonorId(donorId);
        Optional<InterestedPerson> cancellingEvent = donorParticipating.stream().filter(donorParticipating1->donorParticipating1.getEventId().equals(eventId)).findAny();
        if(cancellingEvent.isPresent()) {
            String donorEmail=cancellingEvent.get().getEmail();
            interestedPersonRepository.delete(cancellingEvent.get());
            String subject = "Event Registration Cancelled";
            String body = "We appreciate your initial commitment, and while we understand your circumstances, we hope to welcome you back as a valued donor in the future.";
            emailService.sendSimpleMail(donorEmail, subject, body);
            System.out.println(subject);
            return subject;
        }
        return "Unable to Cancel the registration";
    }

    @Override
    public Optional<Donor> getDonorByEmail(String email) {
        return donorRepository.findByEmail(email);
    }

    @Override
    public Donor changeDonorPassword(String email,String oldPassword, String newPassword, String conformNewPassword) {
        Optional<Donor> donor=donorRepository.findByEmail(email);
        if(donor.isPresent()){
            if(newPassword.equals(conformNewPassword)){
                donor.get().setPassword(newPassword);
                donorRepository.save(donor.get());
                return donor.get();
            }
            return null;
        }
        return null;
    }

    @Override
    public Donations saveDonationDetail(Donations donations) {
        donationsRepository.save(donations);
        return donationsRepository.findById(donations.getId()).orElse(null);
    }

    @Override
    public List<String> getDonorIdFromEvent(String eventId) {
        List<InterestedPerson> interestedPerson=interestedPersonRepository.findAllInterestedPersonByEventId(eventId);
        return interestedPerson.stream().map(InterestedPerson::getDonorId).toList();
    }

    @Override
    public String saveDonationRequirements(DonationRequirements donationRequirements) {
        donationRequirementRepository.save(donationRequirements);
        Optional<Donor> donor = donorRepository.findById(donationRequirements.getDonorId());
        Optional<OrphanageDetails> orphanageDetails=orphanageDetailsRepository.findByOrpId(donationRequirements.getOrpId());
        Optional<Orphanage> orphanage= orphanageRepository.findById(donationRequirements.getOrpId());
        String subject="Heartfelt Thanks for Your Generous Donation";
        String body="Dear "+donor.get().getName()+",\n" +
                "\n" +
                "Thank you for your generous donation to \""+orphanageDetails.get().getOrphanageName()+"\". Your kindness will make a lasting impact, providing hope and support to the children in our care. We are deeply grateful for your compassion and generosity.";
        String subjectOrp = "Generous Donation Offer from "+donor.get().getName() +"\uD83D\uDE0A";
        String bodyOrp = "We are thrilled to inform you that "+donor.get().getName()+" has graciously offered to donate essential items to support the children in your care. In their own words, \""+donationRequirements.getDescription()+".\" We are excited to coordinate this contribution to enhance the lives of the children at your orphanage.\uD83D\uDE0A";
        emailService.sendSimpleMail(donor.get().getEmail(),subject,body);
        emailService.sendSimpleMail(orphanage.get().getEmail(),subjectOrp,bodyOrp);
        return "Requirement Donation Info Saved Successfully";
    }

    @Override
    public List<DonationRequirements> getAllDonationRequirementByDonorId(String donorId) {
        Optional<Donor> donor = donorRepository.findById(donorId);
        if(donor.isPresent()){
            return donationRequirementRepository.findAllDonationsRequirementByDonorId(donorId);
        }
        return null;
    }

    @Override
    public List<InterestedPerson> findAllInterestedPersonByDonorId(String donorId) {
        return interestedPersonRepository.findAllInterestedPersonByDonorId(donorId);
    }

    @Override
    public Events findEventByEventId(String eventId) {
        Optional<Events> events = eventsRepository.findById(eventId);
        if(events.isPresent()){
            return events.get();
        }
        return null;
    }
}
