package com.example.Demo.Repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import com.example.Demo.Enum.EnumClass;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import com.example.Demo.Model.OrphanageDetails;


@DataMongoTest
public class OrphanageDetailsRepositoryTest {

    @Autowired
    private OrphanageDetailsRepository orphanageDetailsRepository;

    @Test
    public void testFindAllById() {
        // Create a sample orphanage
        OrphanageDetails orphanage = new OrphanageDetails();
        orphanage.setOrpId("1");
        orphanage.setOrphanageName("Orphanage A");
        orphanage.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        orphanageDetailsRepository.save(orphanage);

        // Fetch orphanages by ID
        List<OrphanageDetails> orphanages = orphanageDetailsRepository.findAllById("1");

        // Assert
        assertThat(orphanages).isNotEmpty();
        assertThat(orphanages).hasSize(1);
        assertThat(orphanages.get(0).getOrphanageName()).isEqualTo("Orphanage A");
    }

    @Test
    public void testFindByOrpId() {
        // Create a sample orphanage
        OrphanageDetails orphanage = new OrphanageDetails();
        orphanage.setOrpId("1");
        orphanage.setOrphanageName("Orphanage A");
        orphanage.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        orphanageDetailsRepository.save(orphanage);

        // Fetch orphanage by ID
        Optional<OrphanageDetails> orphanageOptional = orphanageDetailsRepository.findByOrpId("1");

        // Assert
        assertThat(orphanageOptional).isPresent();
        orphanageOptional.ifPresent(orphanageDetails -> {
            assertThat(orphanageDetails.getOrphanageName()).isEqualTo("Orphanage A");
        });
    }

    @Test
    public void testFindByVerificationStatus() {
        // Create sample orphanages
        OrphanageDetails orphanage1 = new OrphanageDetails();
        orphanage1.setOrpId("3");
        orphanage1.setOrphanageName("Orphanage C");
        orphanage1.setVerificationStatus(EnumClass.VerificationStatus.VERIFIED);
        orphanageDetailsRepository.save(orphanage1);

        OrphanageDetails orphanage2 = new OrphanageDetails();
        orphanage2.setOrpId("4");
        orphanage2.setOrphanageName("Orphanage D");
        orphanage2.setVerificationStatus(EnumClass.VerificationStatus.NOT_VERIFIED);
        orphanageDetailsRepository.save(orphanage2);

        // Fetch orphanages by verification status
        List<OrphanageDetails> verifiedOrphanages = orphanageDetailsRepository.findByVerificationStatus(String.valueOf(EnumClass.VerificationStatus.VERIFIED));

        // Assert
        assertThat(verifiedOrphanages).isNotEmpty();
        assertThat(verifiedOrphanages).hasSize(1);
        assertThat(verifiedOrphanages.get(0).getOrphanageName()).isEqualTo("Orphanage C");
    }
}
