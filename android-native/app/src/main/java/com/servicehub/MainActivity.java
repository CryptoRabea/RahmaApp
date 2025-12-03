package com.servicehub;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;
import androidx.appcompat.app.AppCompatActivity;
import com.servicehub.ui.auth.LoginActivity;
import com.servicehub.ui.main.HomeActivity;
import com.servicehub.utils.SharedPreferencesManager;

public class MainActivity extends AppCompatActivity {

    private static final int SPLASH_TIME_OUT = 2000; // 2 seconds

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize SharedPreferences
        SharedPreferencesManager.init(this);

        // Hide status bar
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        // Check login status and redirect accordingly
        new Handler().postDelayed(() -> {
            if (SharedPreferencesManager.isUserLoggedIn()) {
                // User is logged in, go to HomeActivity
                Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                startActivity(intent);
            } else {
                // User is not logged in, go to LoginActivity
                Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                startActivity(intent);
            }
            finish();
        }, SPLASH_TIME_OUT);
    }
}