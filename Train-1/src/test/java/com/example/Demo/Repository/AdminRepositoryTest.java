package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.Demo.Model.Admin;
import com.example.Demo.Enum.EnumClass;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AdminRepositoryTest {

    @Mock
    private AdminRepository adminRepositoryMock;

    @InjectMocks
    private AdminRepository adminRepository;

    @Test
    public void testFindByEmail() {
        // Mocking data
        String email = "admin@example.com";
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setName("Test Admin");
        admin.setRole(EnumClass.Roles.ADMIN);

        // Mocking repository behavior
        when(adminRepositoryMock.findByEmail(email)).thenReturn(Optional.of(admin));

        // Performing the actual test
        Optional<Admin> foundAdmin = adminRepository.findByEmail(email);

        // Asserting the result
        assertTrue(foundAdmin.isPresent());
        assertEquals(admin.getEmail(), foundAdmin.get().getEmail());
        assertEquals(admin.getName(), foundAdmin.get().getName());
        assertEquals(admin.getRole(), foundAdmin.get().getRole());
    }

    @Test
    public void testFindByEmail_NotFound() {
        // Mocking data
        String email = "nonexistent@example.com";

        // Mocking repository behavior for a non-existent email
        when(adminRepositoryMock.findByEmail(email)).thenReturn(Optional.empty());

        // Performing the actual test
        Optional<Admin> foundAdmin = adminRepository.findByEmail(email);

        // Asserting the result
        assertFalse(foundAdmin.isPresent());
    }
}
