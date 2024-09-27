package com.example.Demo.DonorServices;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Model.*;
import com.example.Demo.Repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import java.lang.reflect.Field;


class DonorServiceImplTest {

    @InjectMocks
    private DonorServiceImpl donorService;

    @Mock
    private DonorRepository donorRepository;

    @Mock
    private OrphanageDetailsRepository orphanageDetailsRepository;

    @Mock
    private DonationRequirementRepository donationRequirementRepository;

    @Mock
    private InterestedPersonRepository interestedPersonRepository;

    @Mock
    private OrphanageRepository orphanageRepository;

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private EventsRepository eventsRepository;

    @Mock
    private OrphanageDetailsRepository detailsRepository;

    @Mock
    private DonationsRepository donationsRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveUser() {
        // Arrange
        Donor donor = new Donor();
        Optional<Donor> optionalDonor = Optional.of(donor);

        // Act
        donorService.saveUser(optionalDonor);

        // Assert
        verify(donorRepository, times(1)).save(any(Donor.class));
    }

    @Test
    void testRegisterUser_Success() {
        // Arrange
        Donor newUser = new Donor();
        newUser.setEmail("test@example.com");
        when(donorRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());
        when(orphanageRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());
        when(adminRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());

        // Act
        String result = donorService.registerUser(newUser);

        // Assert
        assertEquals("Success", result);
        verify(donorRepository, times(1)).save(newUser);
    }

    @Test
    void testRegisterUser_AlreadyExistingUser() {
        // Arrange
        Donor existingUser = new Donor();
        existingUser.setEmail("existing@example.com");
        when(donorRepository.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));

        // Act
        String result = donorService.registerUser(existingUser);

        // Assert
        assertEquals("You are an existing user.\nPlease Login", result);
        verify(donorRepository, never()).save(existingUser);
    }

    @Test
    void testLoginUser_UserExistsAndCorrectPassword() {
        // Arrange
        String email = "test@example.com";
        String password = "password123";
        Donor user = new Donor();
        user.setEmail(email);
        user.setPassword(password);
        when(donorRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        boolean result = donorService.loginUser(email, password);

        // Assert
        assertTrue(result);
    }

    @Test
    void testLoginUser_UserDoesNotExist() {
        // Arrange
        String email = "nonexistent@example.com";
        String password = "password123";
        when(donorRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        boolean result = donorService.loginUser(email, password);

        // Assert
        assertFalse(result);
    }

    @Test
    void testLoginUser_IncorrectPassword() {
        // Arrange
        String email = "test@example.com";
        String correctPassword = "password123";
        String incorrectPassword = "incorrect";
        Donor user = new Donor();
        user.setEmail(email);
        user.setPassword(correctPassword);
        when(donorRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        boolean result = donorService.loginUser(email, incorrectPassword);

        // Assert
        assertFalse(result);
    }
    @Test
    void testViewProfile_DonorExists() {
        // Arrange
        String donorId = "123";
        Donor donor = new Donor();
        donor.setDonorId(donorId);
        when(donorRepository.findById(donorId)).thenReturn(Optional.of(donor));

        // Act
        Optional<Donor> result = donorService.viewProfile(donorId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(donor, result.get());
    }

    @Test
    void testViewProfile_DonorDoesNotExist() {
        // Arrange
        String donorId = "123";
        when(donorRepository.findById(donorId)).thenReturn(Optional.empty());

        // Act
        Optional<Donor> result = donorService.viewProfile(donorId);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testEditProfile_DonorExists() {
        // Arrange
        String donorId = "123";
        Donor donor = new Donor();
        donor.setDonorId(donorId);
        when(donorRepository.findById(donorId)).thenReturn(Optional.of(donor));

        // Act
        Donor updatedDonor = donorService.editProfile(donorId, donor);

        // Assert
        assertNotNull(updatedDonor);
        verify(donorRepository, times(1)).save(donor);
    }

    @Test
    void testEditProfile_DonorDoesNotExist() {
        // Arrange
        String donorId = "123";
        Donor donor = new Donor();
        donor.setDonorId(donorId);
        when(donorRepository.findById(donorId)).thenReturn(Optional.empty());

        // Act
        Donor updatedDonor = donorService.editProfile(donorId, donor);

        // Assert
        assertNull(updatedDonor);
        verify(donorRepository, never()).save(donor);
    }
    
    @Test
    void testAddProfilePhoto() throws IOException {
        // Arrange
        String donorId = "123";
        byte[] photoBytes = "TestPhoto".getBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", photoBytes);
        Donor donor = new Donor();
        donor.setDonorId(donorId);
        when(donorRepository.findById(donorId)).thenReturn(Optional.of(donor));

        // Act
        Donor result = donorService.addProfilePhoto(donorId, file);

        // Assert
        assertNotNull(result);
        assertArrayEquals(photoBytes, result.getProfilePhoto());
        verify(donorRepository, times(1)).save(donor);
    }

    @Test
    void testGetProfilePhoto() {
        // Arrange
        DonorRepository donorRepositoryMock = mock(DonorRepository.class);

        Donor donor = new Donor();
        donor.setProfilePhoto(new byte[]{1, 2, 3}); // Set some dummy photo data
        when(donorRepositoryMock.findById("donorId")).thenReturn(Optional.of(donor));

        DonorServiceImpl donorService = new DonorServiceImpl(donorRepositoryMock);

        // Act
        String result = donorService.getProfilePhoto("donorId");

        // Assert
        assertNotNull(result);
        assertEquals("AQID", result); // "AQID" is the Base64 encoding of {1, 2, 3}
    }



    @Test
    void testSendOtp() {
        // Arrange
        String email = "test@example.com";
        String sixDigitCode = "123456";
        Donor donor = new Donor();
        donor.setEmail(email);
        Optional<Donor> user = Optional.of(donor);
        when(donorRepository.findByEmail(email)).thenReturn(user);
        doNothing().when(emailService).sendSimpleMail(anyString(), anyString(), anyString());

        // Act
        String result = donorService.sendOtp(donor);

        // Assert
        assertNotNull(result);
        assertEquals(sixDigitCode, result);
        verify(emailService, times(1)).sendSimpleMail(email, "OTP", "Dear admin OTP to change password is " + sixDigitCode);
    }
    @Test
    void testForgetPassword() throws NoSuchFieldException, IllegalAccessException {
        // Arrange
        String email = "test@example.com";
        String otp = "123456";
        String create = "newPassword";
        String confirm = "newPassword";
        Donor donor = new Donor();
        donor.setEmail(email);
        Optional<Donor> user = Optional.of(donor);
        when(donorRepository.findByEmail(email)).thenReturn(user);

        // Use reflection to set the OTP value
        Field field = DonorServiceImpl.class.getDeclaredField("Otp");
        field.setAccessible(true);
        DonorServiceImpl donorService = new DonorServiceImpl(donorRepository);
        field.set(donorService, otp);

        // Act & Assert
        assertEquals("OTP not matched", donorService.forgetPassword(email, "wrongOTP", create, confirm));
        assertEquals("Password Changed Successfully", donorService.forgetPassword(email, otp, create, confirm));
        assertEquals("Password Do not Matched", donorService.forgetPassword(email, otp, "wrongPassword", confirm));
        assertEquals("user not existed", donorService.forgetPassword("nonexistent@example.com", otp, create, confirm));
    }


    @Test
    void testGetVerifiedOrphanageDetails() {
        // Arrange
        List<OrphanageDetails> orphanageDetailsList = new ArrayList<>();
        OrphanageDetails orphanageDetails1 = new OrphanageDetails();
        orphanageDetails1.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        orphanageDetailsList.add(orphanageDetails1);
        when(detailsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VERIFIED))).thenReturn(orphanageDetailsList);

        // Act
        List<OrphanageDetails> result = donorService.getVerifiedOrphanageDetails();

        // Assert
        assertEquals(orphanageDetailsList, result);
    }

    @Test
    void testGetVerifiedOrphanageDetailsById() {
        // Arrange
        String orpId = "123";
        OrphanageDetails orphanageDetails = new OrphanageDetails();
        orphanageDetails.setOrpId(orpId);
        orphanageDetails.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        Optional<OrphanageDetails> optionalOrphanageDetails = Optional.of(orphanageDetails);
        when(detailsRepository.findByOrpId(orpId)).thenReturn(optionalOrphanageDetails);

        // Act & Assert
        assertEquals(optionalOrphanageDetails, donorService.getVerifiedOrphanageDetailsById(orpId));
    }

    @Test
    void testGetVerifiedEvents() {
        // Arrange
        String orpId = "123";
        List<Events> eventsList = new ArrayList<>();
        Events event1 = new Events();
        event1.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        event1.setOrpId(orpId);
        eventsList.add(event1);
        when(eventsRepository.findByVerificationStatusAndOrpId(String.valueOf(EnumClass.VerificationStatus.VERIFIED), orpId)).thenReturn(eventsList);

        // Act
        List<Events> result = donorService.getVerifiedEvents(orpId);

        // Assert
        assertEquals(eventsList, result);
    }
    @Test
    void testEventRegister() {
        // Arrange
        String eventId = "event123";
        String donorId = "donor123";
        Events event = new Events();
        event.setId(eventId);
        Donor donor = new Donor();
        donor.setDonorId(donorId);
        Optional<Events> optionalEvent = Optional.of(event);
        Optional<Donor> optionalDonor = Optional.of(donor);
        when(eventsRepository.findById(eventId)).thenReturn(optionalEvent);
        when(donorRepository.findById(donorId)).thenReturn(optionalDonor);
        when(interestedPersonRepository.findAllInterestedPersonByDonorId(donorId)).thenReturn(new ArrayList<>());

        // Act
        String result = donorService.eventRegister(eventId, donorId);

        // Assert
        assertEquals("Event Registration is Done", result);
    }
    @Test
    void testGetDonorByEmail() {
        // Arrange
        String email = "test@example.com";
        Donor donor = new Donor();
        donor.setEmail(email);
        when(donorRepository.findByEmail(email)).thenReturn(Optional.of(donor));
        
        // Act
        Optional<Donor> result = donorService.getDonorByEmail(email);
        
        // Assert
        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
    }
    
    @Test
    void testChangeDonorPassword_Success() {
        // Arrange
        String email = "test@example.com";
        String oldPassword = "oldPassword";
        String newPassword = "newPassword";
        String conformNewPassword = "newPassword";
        Donor donor = new Donor();
        donor.setEmail(email);
        donor.setPassword(oldPassword);
        when(donorRepository.findByEmail(email)).thenReturn(Optional.of(donor));
        
        // Act
        Donor result = donorService.changeDonorPassword(email, oldPassword, newPassword, conformNewPassword);
        
        // Assert
        assertNotNull(result);
        assertEquals(newPassword, result.getPassword());
    }
    
    @Test
    void testChangeDonorPassword_PasswordMismatch() {
        // Arrange
        String email = "test@example.com";
        String oldPassword = "oldPassword";
        String newPassword = "newPassword";
        String conformNewPassword = "wrongPassword";
        Donor donor = new Donor();
        donor.setEmail(email);
        donor.setPassword(oldPassword);
        when(donorRepository.findByEmail(email)).thenReturn(Optional.of(donor));
        
        // Act
        Donor result = donorService.changeDonorPassword(email, oldPassword, newPassword, conformNewPassword);
        
        // Assert
        assertNull(result);
    }
    @Test
    void testSaveDonationDetail() {
        // Arrange
        Donations donation = new Donations();
        donation.setId("donation123");
        when(donationsRepository.save(donation)).thenReturn(donation);
        when(donationsRepository.findById("donation123")).thenReturn(Optional.of(donation));
        
        // Act
        Donations result = donorService.saveDonationDetail(donation);
        
        // Assert
        assertNotNull(result);
        assertEquals(donation.getId(), result.getId());
    }
    
    @Test
    void testGetDonorIdFromEvent() {
        // Arrange
        String eventId = "event123";
        InterestedPerson person1 = new InterestedPerson();
        person1.setDonorId("donor1");
        InterestedPerson person2 = new InterestedPerson();
        person2.setDonorId("donor2");
        List<InterestedPerson> interestedPeople = new ArrayList<>();
        interestedPeople.add(person1);
        interestedPeople.add(person2);
        when(interestedPersonRepository.findAllInterestedPersonByEventId(eventId)).thenReturn(interestedPeople);
        
        // Act
        List<String> result = donorService.getDonorIdFromEvent(eventId);
        
        // Assert
        assertEquals(2, result.size());
        assertTrue(result.contains("donor1"));
        assertTrue(result.contains("donor2"));
    }
    @Test
    void testSaveDonationRequirements() {
        // Arrange
        DonationRequirements donationRequirements = new DonationRequirements();
        donationRequirements.setDonorId("donor123");
        donationRequirements.setOrpId("orphanage123");
        Donor donor = new Donor();
        donor.setName("John Doe");
        donor.setEmail("john@example.com");
        Optional<Donor> donorOptional = Optional.of(donor);
        Orphanage orphanage = new Orphanage();
        orphanage.setEmail("orphanage@example.com");
        Optional<Orphanage> orphanageOptional = Optional.of(orphanage);
        OrphanageDetails orphanageDetails = new OrphanageDetails();
        orphanageDetails.setOrphanageName("Happy Orphanage");
        Optional<OrphanageDetails> orphanageDetailsOptional = Optional.of(orphanageDetails);
        when(donorRepository.findById("donor123")).thenReturn(donorOptional);
        when(orphanageRepository.findById("orphanage123")).thenReturn(orphanageOptional);
        when(orphanageDetailsRepository.findByOrpId("orphanage123")).thenReturn(orphanageDetailsOptional);

        // Act
        String result = donorService.saveDonationRequirements(donationRequirements);

        // Assert
        assertEquals("Requirement Donation Info Saved Successfully", result);
        verify(emailService, times(1)).sendSimpleMail(eq("john@example.com"), anyString(), anyString());
        verify(emailService, times(1)).sendSimpleMail(eq("orphanage@example.com"), anyString(), anyString());
    }

    @Test
    void testGetAllDonationRequirementByDonorId() {
        // Arrange
        String donorId = "donor123";
        DonationRequirements req1 = new DonationRequirements();
        DonationRequirements req2 = new DonationRequirements();
        List<DonationRequirements> requirements = new ArrayList<>();
        requirements.add(req1);
        requirements.add(req2);
        when(donorRepository.findById(donorId)).thenReturn(Optional.of(new Donor()));
        when(donationRequirementRepository.findAllDonationsRequirementByDonorId(donorId)).thenReturn(requirements);

        // Act
        List<DonationRequirements> result = donorService.getAllDonationRequirementByDonorId(donorId);

        // Assert
        assertEquals(requirements.size(), result.size());
    }
    @Test
    void testFindAllInterestedPersonByDonorId() {
        // Arrange
        String donorId = "donor123";
        InterestedPerson person1 = new InterestedPerson();
        InterestedPerson person2 = new InterestedPerson();
        List<InterestedPerson> persons = new ArrayList<>();
        persons.add(person1);
        persons.add(person2);
        when(interestedPersonRepository.findAllInterestedPersonByDonorId(donorId)).thenReturn(persons);

        // Act
        List<InterestedPerson> result = donorService.findAllInterestedPersonByDonorId(donorId);

        // Assert
        assertEquals(persons.size(), result.size());
    }

    @Test
    void testFindEventByEventId() {
        // Arrange
        String eventId = "event123";
        Events event = new Events();
        when(eventsRepository.findById(eventId)).thenReturn(Optional.of(event));

        // Act
        Events result = donorService.findEventByEventId(eventId);

        // Assert
        assertNotNull(result);
    }
    
}
