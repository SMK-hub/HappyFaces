package com.example.Demo.controller; // Correct package declaration


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;


import com.example.Demo.AdminServices.AdminServiceImpl;
import com.example.Demo.Controller.AdminController;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

class AdminControllerTest {

    @Mock
    private AdminServiceImpl adminService;

    @InjectMocks
    private AdminController adminController;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    

    @Test
    void testGetAllAdmin() {
        // Mock data
        List<Admin> admins = new ArrayList<>();
        admins.add(new Admin());
        admins.add(new Admin());

        // Mock behavior
        when(adminService.getAllAdmin()).thenReturn(admins);

        // Call the method in the controller
        ResponseEntity<List<Admin>> responseEntity = adminController.getAllAdmin();

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(admins, responseEntity.getBody());
    }

    @Test
    void testGetAdminById_Exists() {
        // Mock data
        String adminId = "1";
        Admin admin = new Admin();
        admin.setAdminId(adminId);

        // Mock behavior
        when(adminService.getAdminById(adminId)).thenReturn(admin);

        // Call the method in the controller
        ResponseEntity<Admin> responseEntity = adminController.getAdminById(adminId);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(admin, responseEntity.getBody());
    }

    @Test
    void testGetAdminById_NotFound() {
        // Mock data
        String adminId = "1";

        // Mock behavior
        when(adminService.getAdminById(adminId)).thenReturn(null);

        // Call the method in the controller
        ResponseEntity<Admin> responseEntity = adminController.getAdminById(adminId);

        // Verify the response
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }
    @Test
    void testGetAllOrphanage() {
        // Mock the behavior of the AdminService to return a list of orphanages
        List<Orphanage> orphanages = new ArrayList<>();
        // Add some orphanages to the list
        when(adminService.getAllOrphanage()).thenReturn(orphanages);

        // Call the controller method
        ResponseEntity<List<Orphanage>> response = adminController.getAllOrphanage();

        // Check if the response status is OK and the body contains the expected orphanages
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orphanages, response.getBody());
    }

    @Test
    void testGetOrphanageById() {
        String orphanageId = "1";
        Orphanage orphanage = new Orphanage(); // Create a sample orphanage object
        Optional<Orphanage> optionalOrphanage = Optional.of(orphanage);

        // Mock the behavior of the AdminService to return an orphanage for the given ID
        when(adminService.getOrphanageById(orphanageId)).thenReturn(orphanage);

        // Call the controller method
        ResponseEntity<Orphanage> response = adminController.getOrphanageById(orphanageId);

        // Check if the response status is OK and the body contains the expected orphanage
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orphanage, response.getBody());
    }

    @Test
    void testGetAllOrphanageDetails() {
        // Mock the behavior of the AdminService to return a list of orphanage details
        List<OrphanageDetails> orphanageDetails = new ArrayList<>();
        // Add some orphanage details to the list
        when(adminService.getAllOrphanageDetails()).thenReturn(orphanageDetails);

        // Call the controller method
        ResponseEntity<List<OrphanageDetails>> response = adminController.getAllOrphanageDetails();

        // Check if the response status is OK and the body contains the expected orphanage details
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orphanageDetails, response.getBody());
    }
    @Test
    void testGetOrphanageDetailByOrpId() {
        String orphanageId = "1";
        OrphanageDetails orphanageDetails = new OrphanageDetails(); // Create a sample orphanage details object
        Optional<OrphanageDetails> optionalOrphanageDetails = Optional.of(orphanageDetails);

        // Mock the behavior of the AdminService to return orphanage details for the given ID
        when(adminService.getOrphanageDetailByOrphanageId(orphanageId)).thenReturn(orphanageDetails);

        // Call the controller method
        ResponseEntity<OrphanageDetails> response = adminController.getOrphanageDetailByOrpId(orphanageId);

        // Check if the response status is OK and the body contains the expected orphanage details
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orphanageDetails, response.getBody());
    }

    @Test
    void testGetAllDonor() {
        // Mock the behavior of the AdminService to return a list of donors
        List<Donor> donors = new ArrayList<>();
        // Add some donors to the list
        when(adminService.getAllDonor()).thenReturn(donors);

        // Call the controller method
        ResponseEntity<List<Donor>> response = adminController.getAllDonor();

        // Check if the response status is OK and the body contains the expected list of donors
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donors, response.getBody());
    }

    @Test
    void testGetDonorById() {
        String donorId = "1";
        Donor donor = new Donor(); // Create a sample donor object
        Optional<Donor> optionalDonor = Optional.of(donor);

        // Mock the behavior of the AdminService to return a donor for the given ID
        when(adminService.getDonorById(donorId)).thenReturn(donor);

        // Call the controller method
        ResponseEntity<Donor> response = adminController.getDonorById(donorId);

        // Check if the response status is OK and the body contains the expected donor
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donor, response.getBody());
    }
    @Test
    void testGetAllEvents() {
        // Mock the behavior of the AdminService to return a list of events
        List<Events> eventsList = new ArrayList<>();
        // Add some events to the list
        when(adminService.getAllEvents()).thenReturn(eventsList);

        // Call the controller method
        ResponseEntity<List<Events>> response = adminController.getAllEvents();

        // Check if the response status is OK and the body contains the expected events
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(eventsList, response.getBody());
    }

    @Test
    void testGetEventById() {
        String eventId = "1";
        Events event = new Events(); // Create a sample event object
        Optional<Events> optionalEvent = Optional.of(event);

        // Mock the behavior of the AdminService to return an event for the given ID
        when(adminService.getEventById(eventId)).thenReturn(event);

        // Call the controller method
        ResponseEntity<Events> response = adminController.getEventById(eventId);

        // Check if the response status is OK and the body contains the expected event
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(event, response.getBody());
    }

    @Test
    void testGetEventsByOrphanageId() {
        String orphanageId = "1";
        List<Events> eventsList = new ArrayList<>();
        // Add some events to the list
        when(adminService.getEventsByOrphanageId(orphanageId)).thenReturn(eventsList);

        // Call the controller method
        ResponseEntity<List<Events>> response = adminController.getEventsByOrphanageId(orphanageId);

        // Check if the response status is OK and the body contains the expected events
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(eventsList, response.getBody());
    }
    @Test
    void testVerifyEvents_Done() {
        // Arrange
        Events event = new Events();
        String eventId = "event123";
        String verificationStatus = "VERIFIED";
        when(adminService.verifyEventDetails(eventId, verificationStatus)).thenReturn(event);

        // Act
        ResponseEntity<Events> response = adminController.verifyEventDetails(eventId, verificationStatus);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(event, response.getBody());
    }

    @Test
    void testVerifyEvents_Conflict() {
        // Arrange
        Events event = new Events();
        String eventId = "event123";
        String verificationStatus = "VERIFIED";
        when(adminService.verifyEventDetails(eventId, verificationStatus)).thenReturn(null);

        // Act
        ResponseEntity<Events> response = adminController.verifyEventDetails(eventId, verificationStatus);

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void testVerifyOrphanageDetails_Done() {
        // Arrange
        OrphanageDetails orphanageDetails = new OrphanageDetails();
        String orpId = "orp123";
        String verificationStatus = "VERIFIED";
        when(adminService.verifyOrphanageDetails(orpId, verificationStatus)).thenReturn(orphanageDetails);

        // Act
        ResponseEntity<OrphanageDetails> response = adminController.verifyOrphanageDetails(orpId, verificationStatus);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Verification Done", response.getBody());
    }

    @Test
    void testVerifyOrphanageDetails_Conflict() {
        // Arrange
        String orpId = "orp123";
        String verificationStatus = "VERIFIED";
        when(adminService.verifyOrphanageDetails(orpId, verificationStatus)).thenReturn(null);

        // Act
        ResponseEntity<OrphanageDetails> response = adminController.verifyOrphanageDetails(orpId, verificationStatus);

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Verification Not Done, Try again", response.getBody());
    }

    @Test
    void testGetAllDonations() {
        // Mock the behavior of the AdminService to return a list of donations
        List<Donations> donations = new ArrayList<>();
        // Add some donations to the list
        when(adminService.getAllDonations()).thenReturn(donations);

        // Call the controller method
        ResponseEntity<List<Donations>> response = adminController.getAllDonations();

        // Check if the response status is OK and the body contains the expected donations
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donations, response.getBody());
    }
    @Test
    void testGetDonationsByOrphanageId() {
        String orphanageId = "1";
        List<Donations> donationsList = new ArrayList<>();
        // Add some donations to the list
        when(adminService.getDonationsByOrphanageId(orphanageId)).thenReturn(donationsList);

        // Call the controller method
        ResponseEntity<List<Donations>> response = adminController.getDonationsByOrphanageId(orphanageId);

        // Check if the response status is OK and the body contains the expected donations list
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donationsList, response.getBody());
    }

    @Test
    void testGetDonationsByDonorId() {
        String donorId = "1";
        List<Donations> donationsList = new ArrayList<>();
        // Add some donations to the list
        when(adminService.getDonationsByDonorId(donorId)).thenReturn(donationsList);

        // Call the controller method
        ResponseEntity<List<Donations>> response = adminController.getDonationsByDonorId(donorId);

        // Check if the response status is OK and the body contains the expected donations list
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donationsList, response.getBody());
    }

    @Test
    void testGetDonationById() {
        String donationId = "1";
        Donations donation = new Donations(); // Create a sample donation object
        Optional<Donations> optionalDonation = Optional.of(donation);

        // Mock the behavior of the AdminService to return a donation for the given ID
        when(adminService.getDonationById(donationId)).thenReturn(donation);

        // Call the controller method
        ResponseEntity<Donations> response = adminController.getDonationById(donationId);

        // Check if the response status is OK and the body contains the expected donation
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(donation, response.getBody());
    }
    @Test
    void testRegisterUser_Success() {
        Admin user = new Admin();
        when(adminService.registerUser(user)).thenReturn("Success");

        ResponseEntity<String> response = adminController.registerUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Registration Successful", response.getBody());
    }

    @Test
    void testRegisterUser_Conflict() {
        Admin user = new Admin();
        when(adminService.registerUser(user)).thenReturn("You are an existing user. Please SignIn");

        ResponseEntity<String> response = adminController.registerUser(user);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("You are an existing user. Please SignIn", response.getBody());
    }

    @Test
    void testRegisterUser_IncorrectPasscode() {
        Admin user = new Admin();
        when(adminService.registerUser(user)).thenReturn("Enter Correct Passcode");

        ResponseEntity<String> response = adminController.registerUser(user);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Enter Correct Passcode", response.getBody());
    }

    @Test
    void testLoginUser_Success() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("email", "test@example.com");
        loginData.put("password", "password123");
        when(adminService.loginUser("test@example.com", "password123")).thenReturn(true);

        ResponseEntity<String> response = adminController.loginUser(loginData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login is Successful", response.getBody());
    }

    @Test
    void testLoginUser_Failure() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("email", "test@example.com");
        loginData.put("password", "password123");
        when(adminService.loginUser("test@example.com", "password123")).thenReturn(false);

        ResponseEntity<String> response = adminController.loginUser(loginData);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Login Failed", response.getBody());
    }
    @Test
    void testAddProfilePhoto_Success() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.CREATED).body("Profile photo added successfully");
        when(adminService.addProfilePhoto(adminId, file)).thenReturn(null);

        ResponseEntity<String> response = adminController.addProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verify(adminService).addProfilePhoto(adminId, file);
    }

    @Test
    void testAddProfilePhoto_BadRequest() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.txt", "test".getBytes());

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");

        ResponseEntity<String> response = adminController.addProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testAddProfilePhoto_InternalServerError() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding profile photo");
        when(adminService.addProfilePhoto(adminId, file)).thenThrow(new IOException());

        ResponseEntity<String> response = adminController.addProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testGetProfilePhoto_Success() {
        String adminId = "admin123";
        String photoBase64 = "base64_encoded_image";

        when(adminService.getProfilePhoto(adminId)).thenReturn(photoBase64);

        ResponseEntity<byte[]> response = adminController.getProfilePhoto(adminId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getHeaders().getContentType().includes(MediaType.IMAGE_JPEG));
        assertEquals(photoBase64, new String(response.getBody()));
    }

    @Test
    void testGetProfilePhoto_NotFound() {
        String adminId = "admin123";
        when(adminService.getProfilePhoto(adminId)).thenReturn(null);

        ResponseEntity<byte[]> response = adminController.getProfilePhoto(adminId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
    void testUpdateProfilePhoto_Success() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);

        doNothing().when(adminService).updateProfilePhoto(adminId, file);

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.CREATED).body("Profile photo updated successfully");

        ResponseEntity<String> response = adminController.updateProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verify(adminService).updateProfilePhoto(adminId, file);
    }

    @Test
    void testUpdateProfilePhoto_BadRequest() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.txt", "test".getBytes());

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed");

        ResponseEntity<String> response = adminController.updateProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verifyNoInteractions(adminService);
    }

    void testUpdateProfilePhoto_InternalServerError() throws IOException {
        String adminId = "admin123";
        MockMultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);
        
        // Mocking the method to throw IOException
        doThrow(new IOException()).when(adminService).updateProfilePhoto(adminId, file);

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile photo");

        ResponseEntity<String> response = adminController.updateProfilePhoto(adminId, file);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verify(adminService).updateProfilePhoto(adminId, file);
    }

    @Test
    void testSendOtp_Success() {
        Admin admin = new Admin();
        when(adminService.sendOtp(admin)).thenReturn("1234");

        ResponseEntity<String> expectedResponse = ResponseEntity.ok("1234");

        ResponseEntity<String> response = adminController.sendOtp(admin);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verify(adminService).sendOtp(admin);
    }

    @Test
    void testSendOtp_Conflict() {
        Admin admin = new Admin();
        when(adminService.sendOtp(admin)).thenReturn(null);

        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.CONFLICT).body("Try Again");

        ResponseEntity<String> response = adminController.sendOtp(admin);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
        verify(adminService).sendOtp(admin);
    }
    @Test
    void testForgetPassword_Success() {
        String email = "test@example.com";
        String create = "password123";
        String otp = "123456";
        String confirm = "password123";
        String expectedResponse = "Password Changed Successfully";

        when(adminService.forgetPassword(email, otp, create, confirm)).thenReturn(expectedResponse);

        ResponseEntity<String> response = adminController.forgetPassword(email, create, otp, confirm);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testForgetPassword_Conflict() {
        String email = "test@example.com";
        String create = "password123";
        String otp = "123456";
        String confirm = "password123";
        String expectedResponse = "Error Message";

        when(adminService.forgetPassword(email, otp, create, confirm)).thenReturn(expectedResponse);

        ResponseEntity<String> response = adminController.forgetPassword(email, create, otp, confirm);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testEditProfile_Success() {
        // Arrange
        String adminId = "admin123";
        Admin admin = new Admin();
        String expectedResponse = "Profile updated successfully";

        when(adminService.editProfile(adminId, admin)).thenReturn(admin);

        // Act
        ResponseEntity<Admin> response = adminController.editProfile(adminId, admin);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(admin, response.getBody());
    }

    @Test
    void testEditProfile_Conflict() {
        // Arrange
        String adminId = "admin123";
        Admin admin = new Admin();
        String expectedResponse = "Problem in Update the Profile";

        when(adminService.editProfile(adminId, admin)).thenReturn(null);

        // Act
        ResponseEntity<Admin> response = adminController.editProfile(adminId, admin);

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertNull(response.getBody()); // No need to check the response body in this case
    }
}
