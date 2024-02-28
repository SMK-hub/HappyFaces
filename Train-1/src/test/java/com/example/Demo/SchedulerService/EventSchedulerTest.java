package com.example.Demo.SchedulerService;

import com.example.Demo.Enum.EnumClass;
import com.example.Demo.Model.Events;
import com.example.Demo.AdminServices.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.lang.reflect.Field;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EventSchedulerTest {

    @InjectMocks
    private EventScheduler eventScheduler;

    @Mock
    private AdminService adminService;

    @BeforeEach
    public void setUp() throws NoSuchFieldException, IllegalAccessException {
        setField(eventScheduler, "adminService", adminService);
    }

    private void setField(Object targetObject, String fieldName, Object fieldValue)
            throws NoSuchFieldException, IllegalAccessException {
        Field field = targetObject.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(targetObject, fieldValue);
    }

    @Test
    public void testCheckEventStatus() throws ParseException {
        List<Events> events = new ArrayList<>();
        Events event1 = new Events();
        event1.setEventStatus(EnumClass.EventStatus.PLANNED);
        event1.setDate(LocalDate.now().toString());
        Events event2 = new Events();
        event2.setEventStatus(EnumClass.EventStatus.PLANNED);
        event2.setDate(LocalDate.now().plusDays(1).toString());
        events.add(event1);
        events.add(event2);

        when(adminService.getAllEvents()).thenReturn(events);

        eventScheduler.checkEventStatus();

        assertEquals(EnumClass.EventStatus.ONGOING, event1.getEventStatus());
        assertEquals(EnumClass.EventStatus.COMPLETED, event2.getEventStatus());
    }
}
