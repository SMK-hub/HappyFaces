package com.example.Demo.AdminServices;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Enum.EnumClass.VerificationStatus;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.OrphanageServices.OrphanageService;
import com.example.Demo.Repository.AdminRepository;
import com.example.Demo.Repository.DonationsRepository;
import com.example.Demo.Repository.DonorRepository;
import com.example.Demo.Repository.EventsRepository;
import com.example.Demo.Repository.OrphanageDetailsRepository;
import com.example.Demo.Repository.OrphanageRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminServiceImplTest {

	 @Mock
	    private AdminRepository adminRepository;

	    @Mock
	    private OrphanageRepository orphanageRepository;

	    @Mock
	    private OrphanageDetailsRepository orphanageDetailsRepository;

	    @Mock
	    private DonationsRepository donationsRepository;
	    
	    @Mock
	    private DonorRepository donorRepository;
	    
	    @Mock
	    private EventsRepository eventsRepository;
	    
	    @Mock
	    private DonationsRepository donationRepo;

	    
	    @Mock
	    private EmailService emailService;
	    
	    @InjectMocks
	    private AdminServiceImpl adminService;

    @InjectMocks
    private OrphanageService orphanageService;

//	    private DonorRepository donorRepository;
	    private OrphanageRepository orphanageRepo;
	    private DonorRepository donorRepository1;
	    private String id;

	    // Initialize donorRepo in your setup method or using annotations
	    @BeforeEach
	    void setUp() {
	        donorRepository = mock(DonorRepository.class);
	        eventsRepository = Mockito.mock(EventsRepository.class);
	        donorRepository = Mockito.mock(DonorRepository.class);
	        orphanageRepo = Mockito.mock(OrphanageRepository.class);
	        donorRepository = Mockito.mock(DonorRepository.class);
	        id = "exampleId"; // Set an example id
	       
	        }
	        
	    

	    

    @Test
    void testSaveUser() {
        // Arrange
        Admin admin = new Admin();
        admin.setEmail("admin@example.com");
        admin.setName("Admin");

        // Act
        adminService.saveUser(Optional.of(admin));

        // Assert
        verify(adminRepository, times(1)).save(admin);
    }
    @Test
    void testGetAllAdmin() {
        // Arrange
        List<Admin> admins = new ArrayList<>();
        Admin admin1 = new Admin();
        admin1.setName("Admin 1");
        admins.add(admin1);

        when(adminRepository.findAll(any(Sort.class))).thenReturn(admins);

        // Act
        List<Admin> result = adminService.getAllAdmin();

        // Assert
        assertEquals(admins.size(), result.size());
        assertEquals(admins.get(0).getName(), result.get(0).getName());
    }

    @Test
    void testGetAllOrphanage() {
        // Arrange
        List<Orphanage> orphanages = new ArrayList<>();
        Orphanage orphanage1 = new Orphanage();
        orphanage1.setName("Orphanage 1");
        orphanages.add(orphanage1);

        when(orphanageRepository.findAll(any(Sort.class))).thenReturn(orphanages);

        // Act
        List<Orphanage> result = adminService.getAllOrphanage();

        // Assert
        assertEquals(orphanages.size(), result.size());
        assertEquals(orphanages.get(0).getName(), result.get(0).getName());
    }

    @Test
    public void testGetAllOrphanageDetails() {
        // Create sample orphanages
        OrphanageDetails orphanage1 = new OrphanageDetails();
        orphanage1.setId("1");
        orphanage1.setOrpId("3");
        orphanage1.setOrphanageName("Orphanage C");
        orphanage1.setVerificationStatus(VerificationStatus.VERIFIED);

        OrphanageDetails orphanage2 = new OrphanageDetails();
        orphanage2.setId("2");
        orphanage2.setOrpId("4");
        orphanage2.setOrphanageName("Orphanage D");
        orphanage2.setVerificationStatus(VerificationStatus.NOT_VERIFIED);

        List<OrphanageDetails> orphanages = new ArrayList<>();
        orphanages.add(orphanage1);
        orphanages.add(orphanage2);

        // Mock the repository method
        when(orphanageDetailsRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(orphanages);

        // Call the service method
        List<OrphanageDetails> result = adminService.getAllOrphanageDetails();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Orphanage C", result.get(0).getOrphanageName());
        assertEquals("Orphanage D", result.get(1).getOrphanageName());
    }
    @Test
    void testGetAllDonor() {
        // Arrange
        List<Donor> donors = new ArrayList<>();
        Donor donor1 = new Donor();
        donor1.setName("Donor 1");
        donors.add(donor1);

        // Mock the behavior of DonorRepository
     // Mock the behavior of DonorRepository
        when(donorRepository.findAll(any(Sort.class))).thenReturn(donors);


        // Act
        List<Donor> result = adminService.getAllDonor();

        // Assert
        assertEquals(donors.size(), result.size());
        assertEquals(donors.get(0).getName(), result.get(0).getName());
    }

    @Test
    void testGetAllEvents() {
        // Arrange
        List<Events> events = new ArrayList<>();
        Events event1 = new Events();
        event1.setTitle("Event 1");
        events.add(event1);

        when(eventsRepository.findAll()).thenReturn(events);

        // Act
        List<Events> result = adminService.getAllEvents();

        // Assert
        assertEquals(events.size(), result.size());
        assertEquals(events.get(0).getTitle(), result.get(0).getTitle());
    }

    @Test
    void testGetAllDonations() {
        // Arrange
        List<Donations> donations = new ArrayList<>();
        Donations donation1 = new Donations();
        donation1.setAmount("100");
        donations.add(donation1);

        when(donationsRepository.findAll()).thenReturn(donations);

        // Act
        List<Donations> result = adminService.getAllDonations();

        // Assert
        assertEquals(donations.size(), result.size());
        assertEquals(donations.get(0).getAmount(), result.get(0).getAmount());
    }

    @Test
    void testEditProfile_Exists() {
        // Arrange
        Admin admin = new Admin();
        admin.setName("Admin");
        String adminId = "1";

        Optional<Admin> optionalAdmin = Optional.of(admin);
        when(adminRepository.findById(adminId)).thenReturn(optionalAdmin);

        // Act
        String result = String.valueOf(adminService.editProfile(adminId, admin));

        // Assert
        assertEquals("Profile Updated Successfully", result);
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    void testEditProfile_NotExists() {
        // Arrange
        Admin admin = new Admin();
        admin.setName("Admin");
        String adminId = "1";

        Optional<Admin> optionalAdmin = Optional.empty();
        when(adminRepository.findById(adminId)).thenReturn(optionalAdmin);

        // Act
        String result = String.valueOf(adminService.editProfile(adminId, admin));

        // Assert
        assertNull(result);
        verify(adminRepository, never()).save(any(Admin.class));
    }
    
    @Test
    void testRegisterUser_Success() {
        // Arrange
        Admin newUser = new Admin();
        newUser.setEmail("newadmin@example.com");
        newUser.setPasscode("Admin123Admin");
        newUser.setRole(EnumClass.Roles.ADMIN);

        when(adminRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());
        when(orphanageRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());
        when(donorRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.empty());

        // Act
        String result = adminService.registerUser(newUser);

        // Assert
        assertEquals("Success", result);
        verify(adminRepository, times(1)).save(newUser);
    }

    @Test
    void testRegisterUser_IncorrectPasscode() {
        // Arrange
        Admin newUser = new Admin();
        newUser.setEmail("newadmin@example.com");
        newUser.setPasscode("InvalidPasscode");

        // Act
        String result = adminService.registerUser(newUser);

        // Assert
        assertEquals("Enter Correct Passcode", result);
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterUser_ExistingUser() {
        // Arrange
        Admin existingUser = new Admin();
        existingUser.setEmail("existingadmin@example.com");

        when(adminRepository.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));

        // Act
        String result = adminService.registerUser(existingUser);

        // Assert
        assertEquals("You are an existing user. Please Login", result);
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testLoginUser_Success() {
        // Arrange
        String email = "admin@example.com";
        String password = "Admin123";

        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(password);

        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));

        // Act
        boolean result = adminService.loginUser(email, password);

        // Assert
        assertTrue(result);
    }

    @Test
    void testLoginUser_WrongPassword() {
        // Arrange
        String email = "admin@example.com";
        String password = "WrongPassword";

        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword("Admin123");

        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));

        // Act
        boolean result = adminService.loginUser(email, password);

        // Assert
        assertFalse(result);
    }

    @Test
    void testLoginUser_UserNotFound() {
        // Arrange
        String email = "nonexistentadmin@example.com";
        String password = "Admin123";

        when(adminRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        boolean result = adminService.loginUser(email, password);

        // Assert
        assertFalse(result);
    }
    
    @Test
    void testAddProfilePhoto_Success() throws IOException {
        // Arrange
        String adminId = "admin123";
        MultipartFile file = mock(MultipartFile.class);
        byte[] photoBytes = "Test Photo".getBytes();

        when(file.getBytes()).thenReturn(photoBytes);
        when(adminRepository.findById(adminId)).thenReturn(Optional.of(new Admin()));

        // Act
        String result = adminService.addProfilePhoto(adminId, file);

        // Assert
        assertEquals("Profile Photo Added Successfully", result);
        verify(adminRepository, times(1)).save(any(Admin.class));
    }

    @Test
    void testGetProfilePhoto_Success() {
        // Arrange
        String adminId = "admin123";
        Admin admin = new Admin();
        byte[] photoBytes = "Test Photo".getBytes();
        admin.setProfilePhoto(photoBytes);

        when(adminRepository.findById(adminId)).thenReturn(Optional.of(admin));

        // Act
        String result = adminService.getProfilePhoto(adminId);

        // Assert
        assertNotNull(result);
        assertEquals("VGVzdCBQaG90bw==", result); // Base64 encoded "Test Photo"
    }

    @Test
    void testGetProfilePhoto_NoPhoto() {
        // Arrange
        String adminId = "admin123";

        when(adminRepository.findById(adminId)).thenReturn(Optional.of(new Admin()));

        // Act
        String result = adminService.getProfilePhoto(adminId);

        // Assert
        assertNull(result);
    }

    @Test
    void testUpdateProfilePhoto_Success() throws IOException {
        // Arrange
        String adminId = "admin123";
        MultipartFile file = mock(MultipartFile.class);
        byte[] newPhotoBytes = "New Test Photo".getBytes();

        when(file.getBytes()).thenReturn(newPhotoBytes);
        when(adminRepository.findById(adminId)).thenReturn(Optional.of(new Admin()));

        // Act
        adminService.updateProfilePhoto(adminId, file);

        // Assert
        verify(adminRepository, times(1)).save(any(Admin.class));
    }
 // Test for verifyOrphanageDetails method
    @Test
    void testVerifyOrphanageDetails() {
        // Arrange
        String orpId = "orp123";
        String verificationStatus = "VERIFIED";
        OrphanageDetails mockOrphanage = new OrphanageDetails();
        mockOrphanage.setOrpId(orpId);
        mockOrphanage.setVerificationStatus(VerificationStatus.NOT_VERIFIED);

        when(orphanageDetailsRepository.findByOrpId(orpId)).thenReturn(Optional.of(mockOrphanage));

        // Act
        OrphanageDetails result = adminService.verifyOrphanageDetails(orpId, verificationStatus);

        // Assert
        assertEquals(VerificationStatus.VERIFIED, result.getVerificationStatus());
        verify(orphanageDetailsRepository).save(mockOrphanage);
    }

    // Test for getOrphanageById method
    @Test
    void testGetOrphanageById1() {
        // Arrange
        String id = "123";
        Orphanage orphanage = new Orphanage();
        when(orphanageRepo.findById(id)).thenReturn(Optional.of(orphanage));

        // Act
        Orphanage result = adminService.getOrphanageById(id);

        // Assert
        assertEquals(orphanage, result);
    }

    // Test for getDonorById method
    @Test
    void testGetDonorById1() {
        // Arrange
        String id = "123";
        Donor donor = new Donor();
        when(donorRepository.findById(id)).thenReturn(Optional.of(donor));

        // Act
        Donor result = adminService.getDonorById(id);

        // Assert
        assertEquals(donor, result);
    }
 // Test for verifyEventDetails method
    @Test
    void testVerifyEventDetails() {
        // Arrange
        String eventId = "event123";
        String verificationStatus = "VERIFIED";
        Events mockEvent = new Events();
        mockEvent.setId(eventId);
        mockEvent.setVerificationStatus(VerificationStatus.NOT_VERIFIED);

        when(eventsRepository.findById(eventId)).thenReturn(Optional.of(mockEvent));

        // Act
        Events result = adminService.verifyEventDetails(eventId, verificationStatus);

        // Assert
        assertEquals(VerificationStatus.VERIFIED, result.getVerificationStatus());
        verify(eventsRepository).save(mockEvent);
    }

    // Test for getOrphanageById method
    @Test
    void testGetOrphanageById() {
        // Arrange
        String id = "123";
        Orphanage orphanage = new Orphanage();
        when(orphanageRepo.findById(id)).thenReturn(Optional.of(orphanage));

        // Act
        Orphanage result = adminService.getOrphanageById(id);

        // Assert
        assertEquals(orphanage, result);
    }

    // Test for getDonorById method
    @Test
    void testGetDonorById() {
        // Arrange
        String id = "123";
        Donor donor = new Donor();
        when(donorRepository.findById(id)).thenReturn(Optional.of(donor));

        // Act
        Donor result = adminService.getDonorById(id);

        // Assert
        assertEquals(donor, result);
    }
    
 // Test for getAdminById method
    @Test
    void testGetAdminById() {
        // Arrange
        String id = "admin123";
        Admin admin = new Admin();
        when(adminRepository.findById(id)).thenReturn(Optional.of(admin));

        // Act
        Admin result = adminService.getAdminById(id);

        // Assert
        assertEquals(admin, result);
    }

    // Test for getEventById method
    @Test
    void testGetEventById() {
        // Arrange
        String id = "event123";
        Events event = new Events();
        when(eventsRepository.findById(id)).thenReturn(Optional.of(event));

        // Act
        Events result = adminService.getEventById(id);

        // Assert
        assertEquals(event, result);
    }

    // Test for getEventsByOrphanageId method
    @Test
    void testGetEventsByOrphanageId() {
        // Arrange
        String orphanageId = "123";
        List<Events> events = new ArrayList<>();
        events.add(new Events());
        events.add(new Events());
        when(eventsRepository.getEventsByOrpId(orphanageId)).thenReturn(events);

        // Act
        List<Events> result = adminService.getEventsByOrphanageId(orphanageId);

        // Assert
        assertEquals(events, result);
    }

 // Test for getDonationById method
    @Test
    void testGetDonationById() {
        // Arrange
        String id = "donation123";
        Donations donation = new Donations();
        when(donationRepo.findById(id)).thenReturn(Optional.of(donation));

        // Act
        Donations result = adminService.getDonationById(id);

        // Assert
        assertEquals(donation, result);
    }


    // Test for getDonationsByOrphanageId method
    @Test
    void testGetDonationsByOrphanageId() {
        // Arrange
        String orphanageId = "123";
        List<Donations> donations = new ArrayList<>();
        donations.add(new Donations());
        donations.add(new Donations());
        when(donationRepo.getDonationsByOrpId(orphanageId)).thenReturn(donations);

        // Act
        List<Donations> result = adminService.getDonationsByOrphanageId(orphanageId);

        // Assert
        assertEquals(donations, result);
    }


    // Test for getDonationsByDonorId method
    @Test
    void testGetDonationsByDonorId() {
        // Arrange
        String donorId = "donor123";
        List<Donations> donations = new ArrayList<>();
        donations.add(new Donations());
        donations.add(new Donations());
        when(donationRepo.getDonationsByDonorId(donorId)).thenReturn(donations);

        // Act
        List<Donations> result = adminService.getDonationsByDonorId(donorId);

        // Assert
        assertEquals(donations, result);
    }

    @Test
    void testSendOtp() {
        // Arrange
        Admin admin = new Admin();
        admin.setEmail("admin@example.com");

        // Mock the adminRepo
        when(adminRepository.findByEmail(admin.getEmail())).thenReturn(Optional.of(admin));

        // Mock the emailService
        doNothing().when(emailService).sendSimpleMail(anyString(), anyString(), anyString());

        // Act
        String otp = adminService.sendOtp(admin);

        // Assert
        assertNotNull(otp);
        // Verify that the emailService was called
        verify(emailService, times(1)).sendSimpleMail(admin.getEmail(), "OTP", "Dear admin OTP to change password is " + otp);
    }
    
    @Test
    void testForgetPassword() {
        // Arrange
        String email = "admin@example.com";
        String otp = "123456";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";
        
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(newPassword);
        
        // Mock the adminRepo
        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));
        
        // Act
        String result = adminService.forgetPassword(email, otp, newPassword, confirmPassword);
        
        // Assert
        assertEquals("Password Changed Successfully", result);
        assertEquals(confirmPassword, admin.getPassword());
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    void testForgetPassword_OtpNotMatched() {
        // Arrange
        String email = "admin@example.com";
        String otp = "123456";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";
        
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(newPassword);
        
        // Mock the adminRepo
        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));
        
        // Act
        String result = adminService.forgetPassword(email, "wrongOTP", newPassword, confirmPassword);
        
        // Assert
        assertEquals("OTP not matched", result);
        assertEquals(newPassword, admin.getPassword()); // Password should not change
        verify(adminRepository, never()).save(admin); // Admin should not be saved
    }

    @Test
    void testForgetPassword_UserNotExisted() {
        // Arrange
        String email = "nonexistent@example.com";
        String otp = "123456";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";
        
        // Mock the adminRepo
        when(adminRepository.findByEmail(email)).thenReturn(Optional.empty());
        
        // Act
        String result = adminService.forgetPassword(email, otp, newPassword, confirmPassword);
        
        // Assert
        assertEquals("user not existed", result);
        verify(adminRepository, never()).save(any()); // Admin should not be saved
    }


}

