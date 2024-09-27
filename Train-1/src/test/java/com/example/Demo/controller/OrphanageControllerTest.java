package com.example.Demo.controller;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Model.OrphanageImage;
import com.example.Demo.Repository.OrphanageRepository;
import com.example.Demo.OrphanageServices.OrphanageService;
import com.example.Demo.AdminServices.AdminService;
import com.example.Demo.Controller.OrphanageController;
import com.example.Demo.Enum.EnumClass;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

class OrphanageControllerTest {

    @Mock
    private OrphanageRepository orphanageRepo;

    @Mock
    private AdminService adminService;

    @Mock
    private OrphanageService orphanageService;

    @InjectMocks
    private OrphanageController orphanageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        // Prepare test data
        List<Orphanage> orphanages = new ArrayList<>();
        Orphanage orphanage1 = new Orphanage();
        orphanage1.setOrpId("1");
        orphanage1.setName("Orphanage 1");

        Orphanage orphanage2 = new Orphanage();
        orphanage2.setOrpId("2");
        orphanage2.setName("Orphanage 2");

        orphanages.add(orphanage1);
        orphanages.add(orphanage2);

        // Mock the behavior of orphanageRepo.findAll() to return the test data
        when(orphanageRepo.findAll()).thenReturn(orphanages);

        // Call the method to be tested
        ResponseEntity<List<Orphanage>> responseEntity = orphanageController.getAll();

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanages, responseEntity.getBody());
    }

    @Test
    void testRegisterUser_Success() {
        // Prepare test data
        Orphanage user = new Orphanage();
        when(orphanageService.registerUser(user)).thenReturn("Success");

        // Call the method to be tested
        ResponseEntity<String> responseEntity = orphanageController.registerUser(user);

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Success", responseEntity.getBody());
    }

    @Test
    void testRegisterUser_Conflict() {
        // Prepare test data
        Orphanage user = new Orphanage();
        when(orphanageService.registerUser(user)).thenReturn("Existing User");

        // Call the method to be tested
        ResponseEntity<String> responseEntity = orphanageController.registerUser(user);

        // Assert the response
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Existing User", responseEntity.getBody());
    }

    @Test
    void testLoginUser_Success() {
        // Prepare test data
        Map<String, String> loginData = new HashMap<>();
        loginData.put("email", "test@example.com");
        loginData.put("password", "password");
        when(orphanageService.loginUser(toString(), toString())).thenReturn(true);

        // Call the method to be tested
        ResponseEntity<String> responseEntity = orphanageController.loginUser(loginData);

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Login successful!", responseEntity.getBody());
    }

    @Test
    void testLoginUser_Conflict() {
        // Prepare test data
        Map<String, String> loginData = new HashMap<>();
        loginData.put("email", "test@example.com");
        loginData.put("password", "password");
        when(orphanageService.loginUser(toString(), toString())).thenReturn(false);

        // Call the method to be tested
        ResponseEntity<String> responseEntity = orphanageController.loginUser(loginData);

        // Assert the response
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Invalid email or password", responseEntity.getBody());
    }
    @Test
    void testAddProfilePhoto_Success() throws IOException {
        // Mock file and orphanageId
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "testdata".getBytes());
        String orphanageId = "1";

        // Mock the service method
        doNothing().when(orphanageService).addProfilePhoto(orphanageId, file);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.addProfilePhoto(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("Profile photo added successfully", responseEntity.getBody());
    }

    @Test
    void testAddProfilePhoto_InvalidFileType() throws IOException {
        // Mock file and orphanageId
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", MediaType.TEXT_PLAIN_VALUE, "testdata".getBytes());
        String orphanageId = "1";

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.addProfilePhoto(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Only image files are allowed", responseEntity.getBody());
    }

    @Test
    void testGetProfilePhoto_Success() {
        // Mock photoBase64 and orphanageId
        String photoBase64 = "base64_encoded_image";
        String orphanageId = "1";

        // Mock the service method
        when(orphanageService.getProfilePhoto(orphanageId)).thenReturn(photoBase64);

        // Call the controller method
        ResponseEntity<byte[]> responseEntity = orphanageController.getProfilePhoto(orphanageId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getHeaders().getContentType().includes(MediaType.IMAGE_JPEG));
        assertArrayEquals("base64_encoded_image".getBytes(), responseEntity.getBody());
    }

    @Test
    void testGetProfilePhoto_NotFound() {
        // Mock orphanageId
        String orphanageId = "1";

        // Mock the service method to return null
        when(orphanageService.getProfilePhoto(orphanageId)).thenReturn(null);

        // Call the controller method
        ResponseEntity<byte[]> responseEntity = orphanageController.getProfilePhoto(orphanageId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
    }
    @Test
    void testUpdateProfilePhoto_Success() throws IOException {
        // Mock file and orphanageId
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "testdata".getBytes());
        String orphanageId = "1";

        // Mock the service method
        doNothing().when(orphanageService).updateProfilePhoto(orphanageId, file);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.updateProfilePhoto(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("Profile photo updated successfully", responseEntity.getBody());
    }

    @Test
    void testUpdateProfilePhoto_InvalidFileType() throws IOException {
        // Mock file and orphanageId
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", MediaType.TEXT_PLAIN_VALUE, "testdata".getBytes());
        String orphanageId = "1";

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.updateProfilePhoto(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Only image files are allowed", responseEntity.getBody());
    }

    @Test
    void testUpdateProfilePhoto_InternalServerError() throws IOException {
        // Mock file and orphanageId
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "testdata".getBytes());
        String orphanageId = "1";

        // Mock the service method to throw IOException
        doThrow(new IOException()).when(orphanageService).updateProfilePhoto(orphanageId, file);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.updateProfilePhoto(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Error updating profile photo", responseEntity.getBody());
    }

    @Test
    void testUpdateDetails() {
        // Mock orphanage details
        OrphanageDetails detail = new OrphanageDetails();
        detail.setOrphanageName("Orphanage 1"); // Set necessary fields

        // Mock the service method
        when(orphanageService.updateDetails(detail)).thenReturn("Details updated successfully");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.updateDetails(detail);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Details updated successfully", responseEntity.getBody());

        // Verify if the service method was called with the correct object
        verify(orphanageService).updateDetails(detail);
    }


    @Test
    void testCreateEvents_Success() {
        // Mock event
        Events event = new Events();
        event.setOrpId("Event 1");

        // Mock the service method
        when(orphanageService.createEvents(event)).thenReturn("Event Created");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.createEvents(event);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Event Created", responseEntity.getBody());
    }

    @Test
    void testCreateEvents_Conflict() {
        // Mock event
        Events event = new Events();
        event.setOrpId("Event 1");

        // Mock the service method to return a conflict message
        when(orphanageService.createEvents(event)).thenReturn("Internal Error");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.createEvents(event);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Internal Error", responseEntity.getBody());
    }
    
    @Test
    void testCancelEvents() {
        String eventId = "eventId";
        String expectedResult = "Event cancelled successfully";
        
        // Mock the service method
        when(orphanageService.cancelEvent(eventId)).thenReturn(expectedResult);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.cancelEvents(eventId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResult, responseEntity.getBody());
    }

    @Test
    void testEditEvents_Success() {
        // Arrange
        String eventId = "eventId";
        Events event = new Events("Updated Event");
        String expectedResult = "Event Updated Successfully";

        // Mock the service method
        when(orphanageService.editEvent(eventId, event)).thenReturn(expectedResult);

        // Act
        ResponseEntity<String> responseEntity = orphanageController.editEvents(eventId, event);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResult, responseEntity.getBody());
    }

    @Test
    void testEditEvents_Conflict() {
        // Arrange
        String eventId = "eventId";
        Events event = new Events("Updated Event");
        String expectedResult = "Error updating event";

        // Mock the service method to return a different result
        when(orphanageService.editEvent(eventId, event)).thenReturn(expectedResult);

        // Act
        ResponseEntity<String> responseEntity = orphanageController.editEvents(eventId, event);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals(expectedResult, responseEntity.getBody());
    }

    @Test
    void testSendOtp_Success() {
        Orphanage orphanage = new Orphanage();
        String expectedResult = "OTP sent successfully";
        
        // Mock the service method
        when(orphanageService.sendOtp(orphanage)).thenReturn(expectedResult);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.sendOtp(orphanage);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResult, responseEntity.getBody());
    }

    @Test
    void testSendOtp_Conflict() {
        Orphanage orphanage = new Orphanage();
        String expectedResult = null;
        
        // Mock the service method to return a different result
        when(orphanageService.sendOtp(orphanage)).thenReturn(expectedResult);

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.sendOtp(orphanage);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Internal Error", responseEntity.getBody());
    }
    @Test
    void testForgetPassword_Success() {
        // Prepare test data
        String email = "test@example.com";
        String otp = "123456";
        String create = "password123";
        String confirm = "password123";

        // Mock the service method
        when(orphanageService.forgetPassword(email, otp, create, confirm)).thenReturn("Password Changed Successfully");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.forgetPassword(email, create, otp, confirm);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Password Changed Successfully", responseEntity.getBody());
    }

    @Test
    void testForgetPassword_Conflict() {
        // Prepare test data
        String email = "test@example.com";
        String otp = "123456";
        String create = "password123";
        String confirm = "password123";

        // Mock the service method
        when(orphanageService.forgetPassword(email, otp, create, confirm)).thenReturn("Password Change Failed");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.forgetPassword(email, create, otp, confirm);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Password Change Failed", responseEntity.getBody());
    }

    @Test
    void testChangePassword_Success() {
        // Prepare test data
        String email = "test@example.com";
        String oldPassword = "oldPassword";
        String newPassword = "newPassword";
        String conformNewPassword = "newPassword";

        // Mock the service method
        when(orphanageService.changeOrphanagePassword(email, oldPassword, newPassword, conformNewPassword))
                .thenReturn(Optional.of(new Orphanage()));

        // Call the controller method
        ResponseEntity<Optional<Orphanage>> responseEntity = orphanageController.changeOrphanagePassword(email, oldPassword,
                newPassword, conformNewPassword);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    void testChangePassword_Conflict() {
        // Prepare test data
        String email = "test@example.com";
        String oldPassword = "oldPassword";
        String newPassword = "newPassword";
        String conformNewPassword = "newPassword";

        // Mock the service method
        when(orphanageService.changeOrphanagePassword(email, oldPassword, newPassword, conformNewPassword))
                .thenReturn(Optional.empty());

        // Call the controller method
        ResponseEntity<Optional<Orphanage>> responseEntity = orphanageController.changeOrphanagePassword(email, oldPassword,
                newPassword, conformNewPassword);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
    }
    @Test
    void testEditProfile_Success() {
        // Prepare test data
        String orphanageId = "123";
        Orphanage orphanage = new Orphanage();
        orphanage.setName("New Orphanage");

        // Mock the service method
        when(orphanageService.editProfile(orphanageId, orphanage)).thenReturn(orphanage);

        // Call the controller method
        ResponseEntity<Orphanage> responseEntity = orphanageController.editProfile(orphanageId, orphanage);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanage, responseEntity.getBody());
    }

    @Test
    void testEditProfile_Conflict() {
        // Prepare test data
        String orphanageId = "123";
        Orphanage orphanage = new Orphanage();

        // Mock the service method
        when(orphanageService.editProfile(orphanageId, orphanage)).thenReturn(null);

        // Call the controller method
        ResponseEntity<Orphanage> responseEntity = orphanageController.editProfile(orphanageId, orphanage);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
    }

    @Test
    void testDetailsById_Success() {
        // Prepare test data
        String orphanageId = "123";
        OrphanageDetails orphanageDetails = new OrphanageDetails();
        orphanageDetails.setId("456");

        // Mock the service method
        when(orphanageService.getDetailById(orphanageId)).thenReturn(Optional.of(orphanageDetails));

        // Call the controller method
        ResponseEntity<Optional<OrphanageDetails>> responseEntity = orphanageController.getDetailsById(orphanageId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanageDetails, responseEntity.getBody().get());
    }

    @Test
    void testDetailsById_Conflict() {
        // Prepare test data
        String orphanageId = "123";

        // Mock the service method
        when(orphanageService.getDetailById(orphanageId)).thenReturn(Optional.empty());

        // Call the controller method
        ResponseEntity<Optional<OrphanageDetails>> responseEntity = orphanageController.getDetailsById(orphanageId);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals(Optional.empty(), responseEntity.getBody());
    }
    @Test
    void testEditDetails_Success() {
        // Prepare test data
        String orphanageId = "123";
        OrphanageDetails orphanageDetails = new OrphanageDetails();
        orphanageDetails.setId("456");

        // Mock the service method
        when(orphanageService.editDetails(orphanageId, orphanageDetails)).thenReturn("Details Updated Successfully");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.editDetails(orphanageId, orphanageDetails);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Details Updated Successfully", responseEntity.getBody());
    }

    @Test
    void testEditDetails_Conflict() {
        // Prepare test data
        String orphanageId = "123";
        OrphanageDetails orphanageDetails = new OrphanageDetails();

        // Mock the service method
        when(orphanageService.editDetails(orphanageId, orphanageDetails)).thenReturn("Conflict");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.editDetails(orphanageId, orphanageDetails);

        // Assert
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Conflict", responseEntity.getBody());
    }

    @Test
    void testUploadImagesById_Success() throws IOException {
        // Prepare test data
        String orphanageId = "123";
        List<MultipartFile> images = new ArrayList<>();

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.uploadImagesById(orphanageId, images);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Images uploaded successfully for orphanageId: " + orphanageId, responseEntity.getBody());
    }
    @Test
    void testGetImagesByOrphanageId() {
        // Prepare test data
        String orphanageId = "123";
        List<OrphanageImage> images = new ArrayList<>();
        images.add(new OrphanageImage("imageId1", "image1.jpg", new byte[]{4, 5, 6}));
        images.add(new OrphanageImage("imageId2", "image2.jpg", new byte[]{4, 5, 6}));

        // Mock the service method
        when(orphanageService.getOrphanageImagesById(orphanageId)).thenReturn(images);

        // Call the controller method
        ResponseEntity<List<OrphanageImage>> responseEntity = orphanageController.getImagesByOrphanageId(orphanageId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(images, responseEntity.getBody());
    }

    @Test
    void testRemoveImageById() {
        // Prepare test data
        String orphanageId = "123";
        String imageId = "imageId1";

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.removeImageById(orphanageId, imageId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Image Removed Successfully", responseEntity.getBody());
        verify(orphanageService).removeImage(orphanageId, imageId);
    }

    @Test
    void testGetOrphanageByEmail() {
        // Prepare test data
        String orphanageEmail = "test@example.com";
        Optional<Orphanage> orphanage = Optional.of(new Orphanage());

        // Mock the service method
        when(orphanageService.getOrphanageByEmail(orphanageEmail)).thenReturn(orphanage);

        // Call the controller method
        ResponseEntity<Orphanage> responseEntity = orphanageController.getDonorByEmail(orphanageEmail);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(orphanage.get(), responseEntity.getBody());
    }
    @Test
    void testGetDonationById() {
        // Prepare test data
        String orphanageId = "123";
        List<Donations> donations = new ArrayList<>();
        donations.add(new Donations("1", "donor1", "100", EnumClass.Status.FAIL, "2024-02-28T12:00:00", "12345")) ;

        donations.add(new Donations("2", "donor2", "200", EnumClass.Status.SUCCESS, "2024-02-27T12:00:00", "67890"));

        // Mock the service method
        when(orphanageService.getDonationsByOrphanageId(orphanageId)).thenReturn(donations);

        // Call the controller method
        ResponseEntity<List<Donations>> responseEntity = orphanageController.getDonationById(orphanageId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(donations, responseEntity.getBody());
    }

    @Test
    void testUploadCertificate() throws IOException {
        // Prepare test data
        String orphanageId = "123";
        MultipartFile file = mock(MultipartFile.class);

        // Mock the service method
        when(orphanageService.storeCertificate(orphanageId, file)).thenReturn("Certificate Uploaded Successfully");

        // Call the controller method
        ResponseEntity<String> responseEntity = orphanageController.uploadCertificate(orphanageId, file);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Certificate Uploaded Successfully", responseEntity.getBody());
    }
    @Test
    void testGetCertificate_Success() {
        // Prepare test data
        String orphanageId = "1";
        byte[] certificateBytes = "Dummy certificate content".getBytes();

        // Mock the OrphanageService
        OrphanageService orphanageService = mock(OrphanageService.class);
        when(orphanageService.getCertificate(orphanageId)).thenReturn(certificateBytes);

        // Create the controller instance with the mocked service
        OrphanageController orphanageController = new OrphanageController(orphanageService);

        // Call the controller method
        ResponseEntity<byte[]> responseEntity = orphanageController.getCertificate(orphanageId);

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        HttpHeaders headers = responseEntity.getHeaders();
        assertNotNull(headers);
        assertEquals(MediaType.APPLICATION_PDF, headers.getContentType());
        assertEquals("attachment; filename=certificate.pdf", headers.getContentDisposition().toString());
        assertEquals(certificateBytes.length, headers.getContentLength());

        // Assert the response body contains the expected certificate bytes
        byte[] responseBody = responseEntity.getBody();
        assertNotNull(responseBody);
        assertArrayEquals(certificateBytes, responseBody);
    }

    @Test
    void testGetCertificate_NotFound() {
        // Prepare test data
        String orphanageId = "2";

        // Mock the OrphanageService to return null
        OrphanageService orphanageService = mock(OrphanageService.class);
        when(orphanageService.getCertificate(orphanageId)).thenReturn(null);

        // Create the controller instance with the mocked service
        OrphanageController orphanageController = new OrphanageController(orphanageService);

        // Call the controller method
        ResponseEntity<byte[]> responseEntity = orphanageController.getCertificate(orphanageId);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
    }
}

