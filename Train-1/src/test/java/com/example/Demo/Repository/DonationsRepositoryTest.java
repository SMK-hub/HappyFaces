package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import com.example.Demo.Enum.EnumClass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.Demo.DonorServices.DonorService;
import com.example.Demo.Model.Donations;

@ExtendWith(MockitoExtension.class)
public class DonationsRepositoryTest {

    @Test
    void testGetDonationsByOrpId() {
        // Arrange
        String orpId = "ORP1";
        DonationsRepository donationsRepository = mock(DonationsRepository.class);
        List<Donations> expectedDonations = new ArrayList<>();
        expectedDonations.add(new Donations("1", "Donor1", orpId, "Orphanage A", "100", EnumClass.Status.SUCCESS, "2024-02-29", "transaction123"));
        expectedDonations.add(new Donations("2", "Donor2", orpId, "Orphanage A", "200", EnumClass.Status.SUCCESS, "2024-02-29", "transaction456"));
        when(donationsRepository.getDonationsByOrpId(orpId)).thenReturn(expectedDonations);

        // Act
        List<Donations> actualDonations = donationsRepository.getDonationsByOrpId(orpId);

        // Assert
        assertEquals(expectedDonations.size(), actualDonations.size());
        for (int i = 0; i < expectedDonations.size(); i++) {
            assertEquals(expectedDonations.get(i), actualDonations.get(i));
        }
    }

    @Test
    void testGetDonationsByDonorId() {
        // Arrange
        String donorId = "Donor1";
        DonationsRepository donationsRepository = mock(DonationsRepository.class);
        List<Donations> expectedDonations = new ArrayList<>();
        expectedDonations.add(new Donations("1", donorId, "ORP1", "Orphanage A", "100", EnumClass.Status.SUCCESS, "2024-02-29", "transaction123"));
        expectedDonations.add(new Donations("3", donorId, "ORP2", "Orphanage B", "300", EnumClass.Status.SUCCESS, "2024-02-29", "transaction789"));
        when(donationsRepository.getDonationsByDonorId(donorId)).thenReturn(expectedDonations);

        // Act
        List<Donations> actualDonations = donationsRepository.getDonationsByDonorId(donorId);

        // Assert
        assertEquals(expectedDonations.size(), actualDonations.size());
        for (int i = 0; i < expectedDonations.size(); i++) {
            assertEquals(expectedDonations.get(i), actualDonations.get(i));
        }
    }
}
