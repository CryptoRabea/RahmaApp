package com.servicehub.models;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class Booking {
    @SerializedName("id")
    private int id;
    
    @SerializedName("user_id")
    private int userId;
    
    @SerializedName("service_id")
    private int serviceId;
    
    @SerializedName("service_title")
    private String serviceTitle;
    
    @SerializedName("provider_id")
    private int providerId;
    
    @SerializedName("provider_name")
    private String providerName;
    
    @SerializedName("booking_date")
    private String bookingDate;
    
    @SerializedName("booking_time")
    private String bookingTime;
    
    @SerializedName("duration")
    private int duration;
    
    @SerializedName("price")
    private double price;
    
    @SerializedName("status")
    private String status; // pending, confirmed, cancelled, completed
    
    @SerializedName("payment_status")
    private String paymentStatus; // pending, paid, refunded
    
    @SerializedName("special_requests")
    private String specialRequests;
    
    @SerializedName("location")
    private String location;
    
    @SerializedName("payment_proof")
    private String paymentProof;
    
    @SerializedName("admin_verified")
    private boolean adminVerified;
    
    @SerializedName("notes")
    private String notes;
    
    @SerializedName("created_at")
    private String createdAt;
    
    @SerializedName("updated_at")
    private String updatedAt;

    // Constructors
    public Booking() {}

    public Booking(int serviceId, String bookingDate, String bookingTime, double price) {
        this.serviceId = serviceId;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.price = price;
        this.status = "pending";
        this.paymentStatus = "pending";
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }

    public String getServiceTitle() { return serviceTitle; }
    public void setServiceTitle(String serviceTitle) { this.serviceTitle = serviceTitle; }

    public int getProviderId() { return providerId; }
    public void setProviderId(int providerId) { this.providerId = providerId; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }

    public String getBookingTime() { return bookingTime; }
    public void setBookingTime(String bookingTime) { this.bookingTime = bookingTime; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPaymentProof() { return paymentProof; }
    public void setPaymentProof(String paymentProof) { this.paymentProof = paymentProof; }

    public boolean isAdminVerified() { return adminVerified; }
    public void setAdminVerified(boolean adminVerified) { this.adminVerified = adminVerified; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}