package com.example.Demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.Demo.Enum.EnumClass;


@Document(collection = "orphanageDetails")
public class OrphanageDetails {

    @Id
    private String id;
    private String orpId;
    private String orphanageName;
    private String directorName;
    private String contact;
    private String orphanageEmail;
    private String description;
    private Address address;
    private int viewCount;
    private EnumClass.VerificationStatus verificationStatus;
    private String website;
    private byte[] certificate;
    @DBRef
    private Requirement requirements;

    public byte[] getCertificate() {
        return certificate;
    }

    public void setCertificate(byte[] certificate) {
        this.certificate = certificate;
    }



    public OrphanageDetails() {
        super();
    }


    public String getOrpId() {
        return orpId;
    }

    public void setOrpId(String orpId) {
        this.orpId = orpId;
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

    public EnumClass.VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(EnumClass.VerificationStatus verificationStatus) {
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


    public String getOrphanageName() {
        return orphanageName;
    }

    public void setOrphanageName(String orphanageName) {
        this.orphanageName = orphanageName;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public String getOrphanageEmail() {
        return orphanageEmail;
    }

    public void setOrphanageEmail(String orphanageEmail) {
        this.orphanageEmail = orphanageEmail;
    }

    @Override
    public String toString() {
        return "OrphanageDetails{" + "id='" + id + '\'' + ", orpId='" + orpId + '\'' + ", orphanageName='" + orphanageName + '\'' + ", directorName='" + directorName + '\'' + ", contact='" + contact + '\'' + ", description='" + description + '\'' + ", address=" + address + ", viewCount=" + viewCount + ", verificationStatus=" + verificationStatus + ", website='" + website + '\'' + ", requirements=" + requirements + '}';
    }

    public OrphanageDetails(String id, String orpId, String orphanageName, String directorName, String contact, String description, Address address, int viewCount, EnumClass.VerificationStatus verificationStatus, String website, Requirement requirements,byte[] certificate) {
        this.id = id;
        this.orpId = orpId;
        this.orphanageName = orphanageName;
        this.directorName = directorName;
        this.contact = contact;
        this.description = description;
        this.address = address;
        this.viewCount = viewCount;
        this.verificationStatus = verificationStatus;
        this.website = website;
        this.requirements = requirements;
        this.certificate=certificate;
    }
}
