package com.example.Demo.LogModel;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "orphanageDetails")
public class OrphanageDetails {
	
	@Id
	private String id;
	@Field
	private ObjectId orpId;
	
	public ObjectId getOrpId() {
		return orpId;
	}

	public void setOrpId(ObjectId orpId) {
		this.orpId = orpId;
	}

	private String directorName;
	private String contact;
	private String description;
	private Address address; 
	private boolean verificationStatus;
	private String website;
	
	@DBRef
	private Requirement requirements;
	

    public OrphanageDetails() {
        // Default constructor
    }

    public OrphanageDetails(String directorName, String contact, String description, Address address,
                            boolean verificationStatus, String website, Requirement requirements) {
        this.directorName = directorName;
        this.contact = contact;
        this.description = description;
        this.address = address;
        this.verificationStatus = verificationStatus;
        this.website = website;
        this.requirements = requirements;
    }

	
	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDirectorName() {
        return directorName;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public boolean isVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(boolean verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Requirement getRequirements() {
        return requirements;
    }

    public void setRequirements(Requirement requirements) {
        this.requirements = requirements;
    }

    // toString() method

    @Override
    public String toString() {
        return "OrphanageDetails{" +
                "id='" + id + '\'' +
                ", directorName='" + directorName + '\'' +
                ", contact='" + contact + '\'' +
                ", description='" + description + '\'' +
                ", address=" + address +
                ", verificationStatus=" + verificationStatus +
                ", website='" + website + '\'' +
                ", requirements=" + requirements +
                '}';
    }
}
