package com.example.Demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "orphanageDetails")
public class OrphanageDetails {

	@Id
	private String id;
	@Field
	private String orpId;

	public String getOrpId() {
		return orpId;
	}

	public void setOrpId(String orpId) {
		this.orpId = orpId;
	}

	private String orphanageName;
	private String directorName;
	private String contact;
	private String description;
	private Address address;
	private VerificationStatus verificationStatus;
	private String website;

	@DBRef
	private Requirement requirements;

	public OrphanageDetails() {
		super();
	}

	public OrphanageDetails(String directorName, String contact, String description, Address address,
			VerificationStatus verificationStatus, String website, Requirement requirements) {
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

	public VerificationStatus getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(VerificationStatus verificationStatus) {
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

	@Override
	public String toString() {
		return "OrphanageDetails{" + "id='" + id + '\'' + ", directorName='" + directorName + '\'' + ", contact='"
				+ contact + '\'' + ", description='" + description + '\'' + ", address=" + address
				+ ", verificationStatus=" + verificationStatus + ", website='" + website + '\'' + ", requirements="
				+ requirements + '}';
	}

	public String getOrphanageName() {
		return orphanageName;
	}

	public void setOrphanageName(String orphanageName) {
		this.orphanageName = orphanageName;
	}

	public enum VerificationStatus {
		NOT_VERIFIED, VALID, IN_VALID
	}
}
