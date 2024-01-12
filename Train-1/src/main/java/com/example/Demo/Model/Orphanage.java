package com.example.Demo.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orphanage")
public class Orphanage {

    @Id
    private String orpId;
    private String name;
    private String email;
    private byte[] profilePhoto;
    private String password;
    private String role;

    public String getOrpId() {
        return orpId;
    }

    public void setOrpId(String orpId) {
        this.orpId = orpId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public byte[] getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public Orphanage(String id, String name, String email, String password, String role) {
        super();
        this.orpId = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Orphanage() {
        super();
    }
}

