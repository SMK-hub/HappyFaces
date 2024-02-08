package com.example.Demo.Model;

public class   InterestedPerson {
    private String donorId;
    private String name;
    private String email;


    public InterestedPerson() {
        // Default constructor
    }

    public InterestedPerson(String donorId,String name, String email) {
        this.donorId=donorId;
        this.name = name;
        this.email = email;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmails() {
        return email;
    }

    public void setEmails(String email) {
        this.email = email;
    }
    public String getDonorId() {
        return donorId;
    }

    public void setDonorId(String donorId) {
        this.donorId = donorId;
    }

    // toString() method
    @Override
    public String toString() {
        return "InterestedPerson{" +
                "name='" + name + '\'' +
                ", email='" + email + '\''+"DonorId=" +donorId+
                '}';
    }
}
