package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.Demo.Model.Orphanage;

@ExtendWith(MockitoExtension.class)
public class OrphanageRepositoryTest {

    @Mock
    private OrphanageRepository orphanageRepositoryMock;

    @Test
    void testFindByExistingEmail() {
        // Arrange
        String email = "test@example.com";
        Orphanage orphanage = new Orphanage();
        orphanage.setEmail(email);
        when(orphanageRepositoryMock.findByEmail(email)).thenReturn(Optional.of(orphanage));

        // Act
        Optional<Orphanage> result = orphanageRepositoryMock.findByEmail(email);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
    }

    @Test
    void testFindByNonExistingEmail() {
        // Arrange
        String email = "nonexistent@example.com";
        when(orphanageRepositoryMock.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        Optional<Orphanage> result = orphanageRepositoryMock.findByEmail(email);

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void testSaveOrphanage() {
        // Arrange
        Orphanage orphanage = new Orphanage();
        orphanage.setName("Orphanage A");

        // Act
        when(orphanageRepositoryMock.save(orphanage)).thenReturn(orphanage);
        Orphanage savedOrphanage = orphanageRepositoryMock.save(orphanage);

        // Assert
        assertNotNull(savedOrphanage);
        assertEquals("Orphanage A", savedOrphanage.getName());
    }

    @Test
    void testDeleteOrphanage() {
        // Arrange
        Orphanage orphanage = new Orphanage();

        // Act
        orphanageRepositoryMock.delete(orphanage);

        // Assert
        verify(orphanageRepositoryMock, times(1)).delete(orphanage);
    }
}
