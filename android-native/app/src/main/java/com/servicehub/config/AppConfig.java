package com.servicehub.config;

public class AppConfig {
    // Server Configuration
    public static final String BASE_URL = "http://21.0.11.139:3000/api";
    public static final String WEB_URL = "http://21.0.11.139:3000";
    
    // App Configuration
    public static final String APP_NAME = "ServiceHub";
    public static final String APP_VERSION = "1.0.0";
    
    // SharedPreferences Keys
    public static final String PREF_NAME = "ServiceHubPrefs";
    public static final String KEY_USER_ID = "user_id";
    public static final String KEY_USER_NAME = "user_name";
    public static final String KEY_USER_EMAIL = "user_email";
    public static final String KEY_USER_ROLE = "user_role";
    public static final String KEY_AUTH_TOKEN = "auth_token";
    public static final String KEY_IS_LOGGED_IN = "is_logged_in";
    
    // Request Timeouts
    public static final int CONNECT_TIMEOUT = 30; // seconds
    public static final int READ_TIMEOUT = 30; // seconds
    public static final int WRITE_TIMEOUT = 30; // seconds
    
    // Pagination
    public static final int PAGE_SIZE = 20;
    
    // Image Configuration
    public static final String IMAGE_BASE_URL = "http://21.0.11.139:3000/images/";
    
    // Currency
    public static final String CURRENCY_SYMBOL = "EGP";
    public static final String CURRENCY_CODE = "EGP";
}