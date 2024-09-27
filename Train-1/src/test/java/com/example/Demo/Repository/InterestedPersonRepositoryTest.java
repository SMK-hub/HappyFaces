package com.example.Demo.Repository;

import com.example.Demo.Model.InterestedPerson;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InterestedPersonRepositoryTest {

    @Mock
    InterestedPersonRepository repository;

    @Test
    void testFindAllInterestedPersonByEventId() {
        // Arrange
        String eventId = "event123";
        InterestedPerson person1 = new InterestedPerson();
        person1.setId("1");
        person1.setEventId(eventId);
        person1.setDonorId("John");

        InterestedPerson person2 = new InterestedPerson();
        person2.setId("2");
        person2.setEventId(eventId);
        person2.setDonorId("Alice");

        List<InterestedPerson> expectedPersons = Arrays.asList(person1, person2);

        when(repository.findAllInterestedPersonByEventId(eventId)).thenReturn(expectedPersons);

        // Act
        List<InterestedPerson> actualPersons = repository.findAllInterestedPersonByEventId(eventId);

        // Assert
        assertEquals(expectedPersons, actualPersons);
    }

    @Test
    void testFindAllInterestedPersonByDonorId() {
        // Arrange
        String donorId = "donor123";
        InterestedPerson person1 = new InterestedPerson();
        person1.setId("1");
        person1.setEventId("event123");
        person1.setDonorId(donorId);

        InterestedPerson person2 = new InterestedPerson();
        person2.setId("2");
        person2.setEventId("event456");
        person2.setDonorId(donorId);

        List<InterestedPerson> expectedPersons = Arrays.asList(person1, person2);

        when(repository.findAllInterestedPersonByDonorId(donorId)).thenReturn(expectedPersons);

        // Act
        List<InterestedPerson> actualPersons = repository.findAllInterestedPersonByDonorId(donorId);

        // Assert
        assertEquals(expectedPersons, actualPersons);
    }
}
