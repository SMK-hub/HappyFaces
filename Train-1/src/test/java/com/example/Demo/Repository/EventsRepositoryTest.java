package com.example.Demo.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.Demo.Model.Events;
import com.example.Demo.Repository.EventsRepository;

@ExtendWith(MockitoExtension.class)
public class EventsRepositoryTest {

    @Mock
    private EventsRepository eventsRepository;

    @BeforeEach
    void setUp() {
        // Mocking behavior for eventsRepository methods
    }

    @Test
    void testGetEventsByOrpId() {
        String orpId = "exampleOrpId";
        List<Events> expectedEvents = new ArrayList<>();
        // Add some test events to expectedEvents list

        when(eventsRepository.getEventsByOrpId(orpId)).thenReturn(expectedEvents);

        List<Events> actualEvents = eventsRepository.getEventsByOrpId(orpId);

        assertEquals(expectedEvents, actualEvents);
    }

    @Test
    void testFindByVerificationStatusAndOrpId() {
        String verificationStatus = "exampleStatus";
        String orpId = "exampleOrpId";
        List<Events> expectedEvents = new ArrayList<>();
        // Add some test events to expectedEvents list

        when(eventsRepository.findByVerificationStatusAndOrpId(verificationStatus, orpId)).thenReturn(expectedEvents);

        List<Events> actualEvents = eventsRepository.findByVerificationStatusAndOrpId(verificationStatus, orpId);

        assertEquals(expectedEvents, actualEvents);
    }

    @Test
    void testFindByOrpId() {
        String orpId = "exampleOrpId";
        Events expectedEvent = new Events(); // Create a sample event

        when(eventsRepository.findByOrpId(orpId)).thenReturn(Optional.of(expectedEvent));

        Optional<Events> actualEventOptional = eventsRepository.findByOrpId(orpId);

        assertEquals(expectedEvent, actualEventOptional.orElse(null));
    }
}
