package com.example.Demo.LogModel;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("events")
public class Events {
	@Id
	private String id;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private String title;
	private String description;
	private String date;
	private String time;
	private boolean verificationStatus;
	private List<InterestedPerson> interestedPersons;
	
	public Events() {
    }

    public void Event(String title, String description, String date, String time, boolean verificationStatus, List<InterestedPerson> interestedPersons) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.verificationStatus = verificationStatus;
        this.interestedPersons = interestedPersons;
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(boolean verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public List<InterestedPerson> getInterestedPersons() {
        return interestedPersons;
    }

    public void setInterestedPersons(List<InterestedPerson> interestedPersons) {
        this.interestedPersons = interestedPersons;
    }

    // toString() method
    @Override
    public String toString() {
        return "Event{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", verificationStatus=" + verificationStatus +
                ", interestedPersons=" + interestedPersons +
                '}';
    }
    
    
}
class InterestedPerson {
    private String name;
    private String contact;

    // Constructors, Getters, Setters, etc.

    // Constructors
    public InterestedPerson() {
        // Default constructor
    }

    public InterestedPerson(String name, String contact) {
        this.name = name;
        this.contact = contact;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    // toString() method
    @Override
    public String toString() {
        return "InterestedPerson{" +
                "name='" + name + '\'' +
                ", contact='" + contact + '\'' +
                '}';
    }
}
