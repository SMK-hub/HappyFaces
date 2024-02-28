package com.example.Demo.controller;

import com.example.Demo.Model.DonationRequirements;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.InterestedPerson;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Model.OrphanageImage;
import com.example.Demo.OrphanageServices.OrphanageServiceImpl;
import com.example.Demo.RazorPayServices.RazorPayServiceImpl;
import com.example.Demo.Repository.DonorRepository;
import com.example.Demo.AdminServices.AdminServiceImpl;
import com.example.Demo.Controller.DonorController;
import com.example.Demo.DonorServices.DonorServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

import org.apache.commons.codec.binary.Base64;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class DonorControllerTest {

    @Mock
    private DonorServiceImpl donorService;
    
    @Mock
    private OrphanageServiceImpl orphanageService;

    @Mock
    private DonorRepository donorRepository;
    
    @Mock
    private AdminServiceImpl adminService;

    @Mock
    private RazorPayServiceImpl razorPayService;

    @InjectMocks
    private DonorController donorController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_Success() {
        Donor user = new Donor();
        when(donorService.registerUser(any(Donor.class))).thenReturn("Success");

        ResponseEntity<String> response = donorController.registerUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Registration Successful", response.getBody());
    }

    @Test
    void testRegisterUser_Conflict() {
        Donor user = new Donor();
        when(donorService.registerUser(any(Donor.class))).thenReturn("Existing User");

        ResponseEntity<String> response = donorController.registerUser(user);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Existing User", response.getBody());
    }

    @Test
    void testLoginUser_Success() {
        Map<String, String> loginData = Collections.singletonMap("email", "test@example.com");
        when(donorService.loginUser(eq("test@example.com"), anyString())).thenReturn(true);

        ResponseEntity<String> response = donorController.loginUser(loginData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login successful!", response.getBody());
    }

    @Test
    void testAddProfilePhoto_Success() throws IOException {
        String donorId = "123";
        MultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);
        Donor donor = new Donor();
        when(donorService.addProfilePhoto(donorId, file)).thenReturn(donor);

        ResponseEntity<Donor> response = donorController.addProfilePhoto(donorId, file);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(donor, response.getBody());
    }

    @Test
    void testAddProfilePhoto_BadRequest() throws IOException {
        String donorId = "123";
        MultipartFile file = new MockMultipartFile("test.txt", "test".getBytes());
        
        ResponseEntity<Donor> response = donorController.addProfilePhoto(donorId, file);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void testAddProfilePhoto_InternalServerError() throws IOException {
        String donorId = "123";
        MultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);
        when(donorService.addProfilePhoto(donorId, file)).thenThrow(new IOException());

        ResponseEntity<Donor> response = donorController.addProfilePhoto(donorId, file);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }
    
    @Test
    void testGetProfilePhoto_Success() {
        String donorId = "123";
        byte[] photoBytes = {1, 2, 3};
        ResponseEntity<byte[]> expectedResponse = ResponseEntity.ok()
                .headers(new HttpHeaders())
                .body(photoBytes);
        when(donorService.getProfilePhoto(donorId)).thenReturn("base64_encoded_image");
        when(Base64.decodeBase64("base64_encoded_image")).thenReturn(photoBytes);

        ResponseEntity<byte[]> response = donorController.getProfilePhoto(donorId);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getHeaders(), response.getHeaders());
        assertEquals(Arrays.toString(expectedResponse.getBody()), Arrays.toString(response.getBody()));
    }

    @Test
    void testGetProfilePhoto_NotFound() {
        String donorId = "123";
        when(donorService.getProfilePhoto(donorId)).thenReturn(null);

        ResponseEntity<byte[]> response = donorController.getProfilePhoto(donorId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testSendOtp() {
        Donor donor = new Donor();
        ResponseEntity<String> expectedResponse = ResponseEntity.ok("otp_sent");
        when(donorService.sendOtp(donor)).thenReturn("otp_sent");

        ResponseEntity<String> response = donorController.sendOtp(donor);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    
    @Test
    void testForgetPassword_Success() {
        String email = "test@example.com";
        String create = "password123";
        String otp = "123456";
        String confirm = "password123";
        ResponseEntity<String> expectedResponse = ResponseEntity.ok("Password Changed Successfully");
        when(donorService.forgetPassword(email, otp, create, confirm)).thenReturn("Password Changed Successfully");

        ResponseEntity<String> response = donorController.forgetPassword(email, create, otp, confirm);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testForgetPassword_Conflict() {
        String email = "test@example.com";
        String create = "password123";
        String otp = "123456";
        String confirm = "password123";
        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.CONFLICT).body("Error Message");
        when(donorService.forgetPassword(email, otp, create, confirm)).thenReturn("Error Message");

        ResponseEntity<String> response = donorController.forgetPassword(email, create, otp, confirm);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }
    
    @Test
    void testChangeDonorPassword_Success() {
        String email = "test@example.com";
        String oldPassword = "oldPass123";
        String newPassword = "newPass456";
        String confirmNewPassword = "newPass456";
        Donor donor = new Donor();
        ResponseEntity<Donor> expectedResponse = ResponseEntity.ok(donor);
        when(donorService.changeDonorPassword(email, oldPassword, newPassword, confirmNewPassword)).thenReturn(donor);

        ResponseEntity<Donor> response = donorController.changeDonorPassword(email, oldPassword, newPassword, confirmNewPassword);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testChangeDonorPassword_Conflict() {
        String email = "test@example.com";
        String oldPassword = "oldPass123";
        String newPassword = "newPass456";
        String confirmNewPassword = "newPass456";
        ResponseEntity<Donor> expectedResponse = ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        when(donorService.changeDonorPassword(email, oldPassword, newPassword, confirmNewPassword)).thenReturn(null);

        ResponseEntity<Donor> response = donorController.changeDonorPassword(email, oldPassword, newPassword, confirmNewPassword);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testEditProfile_Success() {
        String donorId = "123";
        Donor donor = new Donor();
        ResponseEntity<Donor> expectedResponse = ResponseEntity.ok(donor);
        when(donorService.editProfile(donorId, donor)).thenReturn(donor);

        ResponseEntity<Donor> response = donorController.editProfile(donorId, donor);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }

    @Test
    void testEditProfile_Conflict() {
        String donorId = "123";
        ResponseEntity<Donor> expectedResponse = ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        when(donorService.editProfile(donorId, null)).thenReturn(null);

        ResponseEntity<Donor> response = donorController.editProfile(donorId, null);

        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());
        assertEquals(expectedResponse.getBody(), response.getBody());
    }
   
    
    @Test
    void testGetVerifiedOrphanageDetails() {
        List<OrphanageDetails> orphanageDetailsList = new ArrayList<>();
        // Add some orphanage details to the list
        when(donorService.getVerifiedOrphanageDetails()).thenReturn(orphanageDetailsList);

        ResponseEntity<List<OrphanageDetails>> responseEntity = donorController.getVerifiedOrphanageDetails();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanageDetailsList, responseEntity.getBody());
    }

    @Test
    void testGetVerifiedOrphanageDetailsById() {
        String orphanageId = "123";
        Optional<OrphanageDetails> orphanageDetails = Optional.of(new OrphanageDetails());
        when(donorService.getVerifiedOrphanageDetailsById(orphanageId)).thenReturn(orphanageDetails);

        ResponseEntity<Optional<OrphanageDetails>> responseEntity = donorController.getVerifiedOrphanageDetailsById(orphanageId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanageDetails, responseEntity.getBody());
    }

    @Test
    void testGetVerifiedEvents() {
        String orphanageId = "123";
        List<Events> eventsList = new ArrayList<>();
        // Add some events to the list
        when(donorService.getVerifiedEvents(orphanageId)).thenReturn(eventsList);

        ResponseEntity<List<Events>> responseEntity = donorController.getVerifiedEvents(orphanageId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(eventsList, responseEntity.getBody());
    }
    
    @Test
    void testEventRegister() {
        String donorId = "donor123";
        String eventId = "event123";
        String expectedMessage = "Event Registration is Done";
        
        when(donorService.eventRegister(eventId, donorId)).thenReturn(expectedMessage);

        ResponseEntity<String> responseEntity = donorController.eventRegister(donorId, eventId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Registration Successfully Done", responseEntity.getBody());
    }

    @Test
    void testCancelEventRegister() {
        String donorId = "donor123";
        String eventId = "event123";
        String expectedMessage = "Event Registration Cancelled";
        
        when(donorService.cancelEventRegistration(eventId, donorId)).thenReturn(expectedMessage);

        ResponseEntity<String> responseEntity = donorController.cancelEventRegister(donorId, eventId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedMessage, responseEntity.getBody());
    }
    @Test
    void testGetDonorByEmail() {
        String donorEmail = "test@example.com";
        Donor donor = new Donor();
        donor.setEmail(donorEmail);
        Optional<Donor> optionalDonor = Optional.of(donor);

        when(donorService.getDonorByEmail(donorEmail)).thenReturn(optionalDonor);

        ResponseEntity<Donor> responseEntity = donorController.getDonorByEmail(donorEmail);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(donor, responseEntity.getBody());
    }
    @Test
    void testGetOrphanageImageById_Success() {
        // Arrange
        String orphanageId = "orphanage123";
        List<OrphanageImage> images = new ArrayList<>();
        images.add(new OrphanageImage("1", orphanageId, new byte[]{1, 2, 3}));
        images.add(new OrphanageImage("2", orphanageId, new byte[]{4, 5, 6}));
        when(orphanageService.getOrphanageImagesById(orphanageId)).thenReturn(images);

        // Act
        ResponseEntity<List<OrphanageImage>> response = donorController.getOrphanageImageById(orphanageId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(images, response.getBody());
    }

    @Test
    void testGetOrphanageImageById_Conflict() {
        // Arrange
        String orphanageId = "orphanage123";
        List<OrphanageImage> images = new ArrayList<>();
        when(orphanageService.getOrphanageImagesById(orphanageId)).thenReturn(images);

        // Act
        ResponseEntity<List<OrphanageImage>> response = donorController.getOrphanageImageById(orphanageId);

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals(null, response.getBody());
    }
    
    @Test
    void testGetDonationById() {
        String donorId = "1";
        List<Donations> donations = new ArrayList<>();
        // Add some donations for testing
        donations.add(new Donations());
        donations.add(new Donations());

        when(adminService.getDonationsByDonorId(donorId)).thenReturn(donations);

        ResponseEntity<List<Donations>> responseEntity = donorController.getDonationById(donorId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(donations, responseEntity.getBody());
    }

    @Test
    void testSaveDonationData() {
        Donations donations = new Donations();
        // Set up any required data in donations for testing

        when(donorService.saveDonationDetail(donations)).thenReturn(donations);

        ResponseEntity<Donations> responseEntity = donorController.saveDonationData(donations);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(donations, responseEntity.getBody());
    }
    @Test
    void testGenerateOrder_Success() {
        Donations donations = new Donations();
        String orderId = "123456"; // Sample orderId

        when(razorPayService.createOrder(donations)).thenReturn(orderId);

        ResponseEntity<String> responseEntity = donorController.generateOrder(donations);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orderId, responseEntity.getBody());
    }

    @Test
    void testGenerateOrder_Exception() {
        Donations donations = new Donations();
        String errorMessage = "Error while creating order"; // Sample error message

        when(razorPayService.createOrder(donations)).thenThrow(new RuntimeException(errorMessage));

        ResponseEntity<String> responseEntity = donorController.generateOrder(donations);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals(errorMessage, responseEntity.getBody());
    }

    @Test
    void testGetAllParticipatedDonorsId() {
        String eventId = "event123";
        List<String> participantIds = new ArrayList<>();
        participantIds.add("donor1");
        participantIds.add("donor2");

        when(donorService.getDonorIdFromEvent(eventId)).thenReturn(participantIds);

        ResponseEntity<List<String>> responseEntity = donorController.getAllParticipatedDonorsId(eventId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(participantIds, responseEntity.getBody());
    }
    
    @Test
    void testSaveDonationRequirement() {
        DonationRequirements donationRequirements = new DonationRequirements();
        String responseMessage = "Donation requirements saved successfully"; // Sample response message

        when(donorService.saveDonationRequirements(donationRequirements)).thenReturn(responseMessage);

        ResponseEntity<String> responseEntity = donorController.saveDonationRequirement(donationRequirements);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(responseMessage, responseEntity.getBody());
    }

    @Test
    void testGetAllInterestedPersonByDonorId() {
        String donorId = "donor123";
        List<InterestedPerson> interestedPersons = new ArrayList<>(); // Sample interested persons list

        when(donorService.findAllInterestedPersonByDonorId(donorId)).thenReturn(interestedPersons);

        ResponseEntity<List<InterestedPerson>> responseEntity = donorController.getAllInterestedPersonByDonorId(donorId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(interestedPersons, responseEntity.getBody());
    }

    @Test
    void testGetEventByEventId() {
        String eventId = "event123";
        Events event = new Events(); // Sample event object

        when(donorService.findEventByEventId(eventId)).thenReturn(event);

        ResponseEntity<Events> responseEntity = donorController.getEventByEventId(eventId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(event, responseEntity.getBody());
    }
    
}
