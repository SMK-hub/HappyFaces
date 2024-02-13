package com.example.Demo.Enum;

public class EnumClass {

    public enum EventStatus {
        PLANNED, ONGOING, COMPLETED, CANCELLED
    }

    public enum VerificationStatus {
        NOT_VERIFIED, VALID, IN_VALID
    }

    public enum Roles{
        ADMIN,DONOR,ORPHANAGE;
    }
    public enum Status{
        SUCCESS,FAIL;
    }
    public enum Need{
        FOOD,CLOTHES,BOOKS;
    }
}
