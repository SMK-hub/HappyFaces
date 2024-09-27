package com.example.Demo.EmailServices;

import com.example.Demo.EmailServices.EmailServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class EmailserviceImplTest {

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailServiceImpl emailService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendSimpleMail_Success() {
        // Arrange
        String email = "recipient@example.com";
        String subject = "Test Subject";
        String body = "Test Body";

        // Mocking behavior
        doNothing().when(javaMailSender).send(any(SimpleMailMessage.class));

        // Act
        String result = emailService.sendSimpleMail(email, subject, body);

        // Assert
        assertEquals("Mail Send Successfully", result);
        verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class));
    }

    @Test
    void testSendSimpleMail_Failure() {
        // Arrange
        String email = "recipient@example.com";
        String subject = "Test Subject";
        String body = "Test Body";

        // Mocking behavior to throw an exception
        doThrow(new RuntimeException()).when(javaMailSender).send(any(SimpleMailMessage.class));

        // Act
        String result = emailService.sendSimpleMail(email, subject, body);

        // Assert
        assertEquals("Error while Sending Mail", result);
        verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class));
    }
}

