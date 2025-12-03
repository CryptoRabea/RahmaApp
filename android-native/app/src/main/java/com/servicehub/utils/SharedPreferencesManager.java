package com.servicehub.utils;

import android.content.Context;
import android.content.SharedPreferences;
import com.servicehub.config.AppConfig;

public class SharedPreferencesManager {
    private static SharedPreferences sharedPreferences;
    private static SharedPreferences.Editor editor;

    public static void init(Context context) {
        sharedPreferences = context.getSharedPreferences(AppConfig.PREF_NAME, Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    // User Session Management
    public static void setUserLoggedIn(boolean isLoggedIn) {
        editor.putBoolean(AppConfig.KEY_IS_LOGGED_IN, isLoggedIn);
        editor.apply();
    }

    public static boolean isUserLoggedIn() {
        return sharedPreferences.getBoolean(AppConfig.KEY_IS_LOGGED_IN, false);
    }

    public static void saveUserId(int userId) {
        editor.putInt(AppConfig.KEY_USER_ID, userId);
        editor.apply();
    }

    public static int getUserId() {
        return sharedPreferences.getInt(AppConfig.KEY_USER_ID, -1);
    }

    public static void saveUserName(String userName) {
        editor.putString(AppConfig.KEY_USER_NAME, userName);
        editor.apply();
    }

    public static String getUserName() {
        return sharedPreferences.getString(AppConfig.KEY_USER_NAME, "");
    }

    public static void saveUserEmail(String userEmail) {
        editor.putString(AppConfig.KEY_USER_EMAIL, userEmail);
        editor.apply();
    }

    public static String getUserEmail() {
        return sharedPreferences.getString(AppConfig.KEY_USER_EMAIL, "");
    }

    public static void saveUserRole(String userRole) {
        editor.putString(AppConfig.KEY_USER_ROLE, userRole);
        editor.apply();
    }

    public static String getUserRole() {
        return sharedPreferences.getString(AppConfig.KEY_USER_ROLE, "");
    }

    public static void saveAuthToken(String authToken) {
        editor.putString(AppConfig.KEY_AUTH_TOKEN, authToken);
        editor.apply();
    }

    public static String getAuthToken() {
        return sharedPreferences.getString(AppConfig.KEY_AUTH_TOKEN, "");
    }

    // Save complete user session
    public static void saveUserSession(int userId, String userName, String userEmail, String userRole, String authToken) {
        editor.putInt(AppConfig.KEY_USER_ID, userId);
        editor.putString(AppConfig.KEY_USER_NAME, userName);
        editor.putString(AppConfig.KEY_USER_EMAIL, userEmail);
        editor.putString(AppConfig.KEY_USER_ROLE, userRole);
        editor.putString(AppConfig.KEY_AUTH_TOKEN, authToken);
        editor.putBoolean(AppConfig.KEY_IS_LOGGED_IN, true);
        editor.apply();
    }

    // Clear user session
    public static void clearUserSession() {
        editor.clear();
        editor.apply();
    }
}