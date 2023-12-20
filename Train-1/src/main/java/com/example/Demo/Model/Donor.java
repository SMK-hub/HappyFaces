package com.example.Demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donor")

public class Donor {
	
	@Id
    private String donorId;
    private String name;
    private String email;
    private String password;
    private String Role;
    
	public Donor(String id, String name, String email, String password, String role) {
		super();
		this.donorId = id;
		this.name = name;
		this.email = email;
		this.password = password;
		Role = role;
	}
	public Donor() {
		super();
	}
	@Override
	public String toString() {
		return "Donor [id=" + donorId + ", name=" + name + ", email=" + email + ", password=" + password + ", Role=" + Role
				+ "]";
	}
	public String getId() {
		return donorId;
	}
	public void setId(String id) {
		this.donorId = id;
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
		return Role;
	}
	public void setRole(String role) {
		Role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
