package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.Demo.Model.Requirements;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class RequirementsRepositoryTest {

    @Autowired
    private RequirementsRepository requirementsRepository;

    @BeforeEach
    public void setUp() {
        Requirements req1 = new Requirements();
        req1.setId("1");
        req1.setDescription("Requirement 1");

        Requirements req2 = new Requirements();
        req2.setId("2");
        req2.setDescription("Requirement 2");

        // Save sample requirements to the database
        requirementsRepository.save(req1);
        requirementsRepository.save(req2);
    }

    @AfterEach
    public void tearDown() {
        // Clear the database after each test
        requirementsRepository.deleteAll();
    }

    @Test
    public void testSaveRequirement() {
        Requirements req3 = new Requirements();
        req3.setId("3");
        req3.setDescription("Requirement 3");
        requirementsRepository.save(req3);
        assertNotNull(req3.getId());
    }

    @Test
    public void testFindAllRequirements() {
        List<Requirements> requirements = requirementsRepository.findAll();
        assertNotNull(requirements);
        assertTrue(requirements.size() > 0);
    }

    @Test
    public void testFindRequirementById() {
        Optional<Requirements> optionalReq = requirementsRepository.findById("1");
        assertTrue(optionalReq.isPresent());
        Requirements req = optionalReq.get();
        assertEquals("Requirement 1", req.getDescription());
    }

    @Test
    public void testDeleteRequirement() {
        requirementsRepository.deleteById("2");
        Optional<Requirements> optionalReq = requirementsRepository.findById("2");
        assertTrue(optionalReq.isEmpty());
    }
}
