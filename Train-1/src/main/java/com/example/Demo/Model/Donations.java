package com.example.Demo.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "donationDetails")
public class Donations {

    @Id
    private String donid;
    private ObjectId donorId;
    private ObjectId orpId;
    private String amount;
    private String status;
    private String date;

    public Donations() {
        // Default constructor
    }

    public Donations(ObjectId donorId, ObjectId orpId, String amount, String status, String date) {
        this.donorId = donorId;
        this.orpId = orpId;
        this.amount = amount;
        this.status = status;
        this.date = date;
    }

    // Getters and setters

    public String getId() {
        return donid;
    }

    public void setId(String donid) {
        this.donid = donid;
    }

    public ObjectId getDonorId() {
        return donorId;
    }

    public void setDonorId(ObjectId donorId) {
        this.donorId = donorId;
    }

    public ObjectId getOrpId() {
        return orpId;
    }

    public void setOrpId(ObjectId orpId) {
        this.orpId = orpId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Donation{" +
                "donid='" + donid + '\'' +
                ", donorId=" + donorId +
                ", orpId=" + orpId +
                ", amount='" + amount + '\'' +
                ", status='" + status + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

}
