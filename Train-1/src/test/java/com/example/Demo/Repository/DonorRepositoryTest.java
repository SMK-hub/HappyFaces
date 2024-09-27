package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.Demo.Model.Donor;

@ExtendWith(MockitoExtension.class)
public class DonorRepositoryTest {

    @Mock
    private DonorRepository donorRepositoryMock;

    @Test
    public void testFindByEmail() {
        // Mocking data
        String email = "test@example.com";
        Donor donor = new Donor();
        donor.setEmail(email);

        // Mocking repository behavior
        when(donorRepositoryMock.findByEmail(email)).thenReturn(Optional.of(donor));

        // Calling the repository method
        Optional<Donor> result = donorRepositoryMock.findByEmail(email);

        // Asserting the result
        assertEquals(Optional.of(donor), result);
    }
}
