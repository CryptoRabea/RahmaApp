package com.servicehub.models;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class Service {
    @SerializedName("id")
    private int id;
    
    @SerializedName("title")
    private String title;
    
    @SerializedName("description")
    private String description;
    
    @SerializedName("category")
    private String category;
    
    @SerializedName("price")
    private double price;
    
    @SerializedName("duration")
    private int duration; // in minutes
    
    @SerializedName("provider_id")
    private int providerId;
    
    @SerializedName("provider_name")
    private String providerName;
    
    @SerializedName("provider_avatar")
    private String providerAvatar;
    
    @SerializedName("images")
    private List<String> images;
    
    @SerializedName("rating")
    private double rating;
    
    @SerializedName("review_count")
    private int reviewCount;
    
    @SerializedName("availability")
    private String availability;
    
    @SerializedName("location")
    private String location;
    
    @SerializedName("is_featured")
    private boolean isFeatured;
    
    @SerializedName("is_active")
    private boolean isActive;
    
    @SerializedName("created_at")
    private String createdAt;
    
    @SerializedName("updated_at")
    private String updatedAt;

    // Constructors
    public Service() {}

    public Service(String title, String description, String category, double price, int duration) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.duration = duration;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public int getProviderId() { return providerId; }
    public void setProviderId(int providerId) { this.providerId = providerId; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

    public String getProviderAvatar() { return providerAvatar; }
    public void setProviderAvatar(String providerAvatar) { this.providerAvatar = providerAvatar; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}