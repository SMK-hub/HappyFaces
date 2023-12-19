package com.example.Demo.LogModel;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Orphanage")
public class Orphanage {


    @Id
    private String orpId;
    private String username;
    private String email;
    private String password;
    private String role;
    public String getId() {
		return orpId;
	}
	public void setId(String id) {
		this.orpId = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public Orphanage(String id, String username, String email, String password, String role) {
		super();
		this.orpId = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}
	public Orphanage() {
		super();
	}
}

