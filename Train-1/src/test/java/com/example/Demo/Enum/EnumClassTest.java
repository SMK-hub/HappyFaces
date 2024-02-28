package com.example.Demo.Enum;

import com.example.Demo.Enum.EnumClass;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EnumClassTest {

    @Test
    void testEventStatus() {
        assertEquals(EnumClass.EventStatus.PLANNED, EnumClass.EventStatus.valueOf("PLANNED"));
        assertEquals(EnumClass.EventStatus.ONGOING, EnumClass.EventStatus.valueOf("ONGOING"));
        assertEquals(EnumClass.EventStatus.COMPLETED, EnumClass.EventStatus.valueOf("COMPLETED"));
        assertEquals(EnumClass.EventStatus.CANCELLED, EnumClass.EventStatus.valueOf("CANCELLED"));
    }

    @Test
    void testVerificationStatus() {
        assertEquals(EnumClass.VerificationStatus.NOT_VERIFIED, EnumClass.VerificationStatus.valueOf("NOT_VERIFIED"));
        assertEquals(EnumClass.VerificationStatus.VERIFIED, EnumClass.VerificationStatus.valueOf("VALID"));
        assertEquals(EnumClass.VerificationStatus.NOT_VERIFIED, EnumClass.VerificationStatus.valueOf("IN_VALID"));
    }

    @Test
    void testRoles() {
        assertEquals(EnumClass.Roles.ADMIN, EnumClass.Roles.valueOf("ADMIN"));
        assertEquals(EnumClass.Roles.DONOR, EnumClass.Roles.valueOf("DONOR"));
        assertEquals(EnumClass.Roles.ORPHANAGE, EnumClass.Roles.valueOf("ORPHANAGE"));
    }

    @Test
    void testStatus() {
        assertEquals(EnumClass.Status.SUCCESS, EnumClass.Status.valueOf("SUCCESS"));
        assertEquals(EnumClass.Status.FAIL, EnumClass.Status.valueOf("FAIL"));
    }

    @Test
    void testNeed() {
        assertEquals(EnumClass.Need.FOOD, EnumClass.Need.valueOf("FOOD"));
        assertEquals(EnumClass.Need.CLOTHES, EnumClass.Need.valueOf("CLOTHES"));
        assertEquals(EnumClass.Need.BOOKS, EnumClass.Need.valueOf("BOOKS"));
    }
}

