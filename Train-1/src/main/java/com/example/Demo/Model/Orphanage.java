package com.example.Demo.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orphanage")
public class Orphanage {


    @Id
    private String orpId;
    private String name;
    private String email;
    private String password;
    private String role;
    public String getId() {
		return orpId;
	}
	public void setId(String id) {
		this.orpId = id;
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
	// Getters and setters
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

