
package com.example.Demo.Repository;

import com.example.Demo.Model.DonationRequirements;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DataMongoTest
public class DonationRequirementRepositoryTest {

    @Mock
    private DonationRequirementRepository donationRequirementRepository;

    @InjectMocks
    private DonationRequirementRepositoryTest donationRequirementRepositoryTest;

    @Test
    public void testFindAllDonationsRequirementByDonorId() {
        String donorId = "someDonorId";
        List<DonationRequirements> expectedDonations = new ArrayList<>();
        // Add some dummy data for testing
        expectedDonations.add(new DonationRequirements());
        expectedDonations.add(new DonationRequirements());

        when(donationRequirementRepository.findAllDonationsRequirementByDonorId(donorId)).thenReturn(expectedDonations);

        List<DonationRequirements> actualDonations = donationRequirementRepositoryTest.donationRequirementRepository.findAllDonationsRequirementByDonorId(donorId);

        assertEquals(expectedDonations.size(), actualDonations.size());
    }

    @Test
    public void testFindAllDonationRequirementByOrpId() {
        String orpId = "someOrpId";
        List<DonationRequirements> expectedDonations = new ArrayList<>();
        // Add some dummy data for testing
        expectedDonations.add(new DonationRequirements());
        expectedDonations.add(new DonationRequirements());

        when(donationRequirementRepository.findAllDonationRequirementByOrpId(orpId)).thenReturn(expectedDonations);

        List<DonationRequirements> actualDonations = donationRequirementRepositoryTest.donationRequirementRepository.findAllDonationRequirementByOrpId(orpId);

        assertEquals(expectedDonations.size(), actualDonations.size());
    }
}
