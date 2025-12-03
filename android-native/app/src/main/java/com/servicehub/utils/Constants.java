package com.servicehub.utils;

public class Constants {
    
    // API Endpoints
    public static final String AUTH_LOGIN = "auth/login";
    public static final String AUTH_REGISTER = "auth/register";
    public static final String SERVICES = "services";
    public static final String EVENTS = "events";
    public static final String BOOKINGS = "bookings";
    public static final String PAYMENTS = "payments";
    public static final String SOCIAL = "social";
    
    // User Roles
    public static final String ROLE_USER = "user";
    public static final String ROLE_PROVIDER = "provider";
    public static final String ROLE_ADMIN = "admin";
    
    // Booking Status
    public static final String STATUS_PENDING = "pending";
    public static final String STATUS_CONFIRMED = "confirmed";
    public static final String STATUS_CANCELLED = "cancelled";
    public static final String STATUS_COMPLETED = "completed";
    
    // Payment Status
    public static final String PAYMENT_PENDING = "pending";
    public static final String PAYMENT_PAID = "paid";
    public static final String PAYMENT_REFUNDED = "refunded";
    
    // Service Categories
    public static final String[] SERVICE_CATEGORIES = {
        "All", "Home Services", "Beauty", "Health", "Education", 
        "Technology", "Business", "Entertainment", "Other"
    };
    
    // Event Categories
    public static final String[] EVENT_CATEGORIES = {
        "All", "Workshop", "Conference", "Social", "Sports", 
        "Cultural", "Educational", "Business", "Other"
    };
    
    // Error Messages
    public static final String ERROR_NETWORK = "Network error. Please check your internet connection.";
    public static final String ERROR_SERVER = "Server error. Please try again later.";
    public static final String ERROR_AUTH = "Authentication failed. Please login again.";
    public static final String ERROR_VALIDATION = "Please check your input and try again.";
    public static final String ERROR_UNKNOWN = "An unknown error occurred.";
    
    // Success Messages
    public static final String SUCCESS_LOGIN = "Login successful!";
    public static final String SUCCESS_REGISTER = "Registration successful!";
    public static final String SUCCESS_BOOKING = "Booking confirmed!";
    public static final String SUCCESS_PAYMENT = "Payment uploaded successfully!";
    public static final String SUCCESS_UPDATE = "Updated successfully!";
}