package com.example.Demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "admin")
public class Admin {
    
	@Id
    private String adminId;
    private String name;
    private String email;
	private byte[] profilePhoto;
    private String password;
    private String role;
	private String passcode;
	private String contact;
	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}



	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public Admin() {
		super();
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

	public String getPasscode() {
		return passcode;
	}

	public void setPasscode(String passcode) {
		this.passcode = passcode;
	}
	public byte[] getProfilePhoto() {
		return profilePhoto;
	}
	public void setProfilePhoto(byte[] profilePhoto) {
		this.profilePhoto = profilePhoto;
	}
	@Override
	public String toString() {
		return "Admin{" +
				"adminId='" + adminId + '\'' +
				", name='" + name + '\'' +
				", email='" + email + '\'' +
				", profilePhoto=" + Arrays.toString(profilePhoto) +
				", password='" + password + '\'' +
				", role='" + role + '\'' +
				", passcode='" + passcode + '\'' +
				'}';
	}
}