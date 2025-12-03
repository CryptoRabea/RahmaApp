package com.servicehub.ui.auth;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.servicehub.MainActivity;
import com.servicehub.R;
import com.servicehub.models.User;
import com.servicehub.utils.ApiClient;
import com.servicehub.utils.SharedPreferencesManager;
import com.servicehub.utils.Constants;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.POST;

public class RegisterActivity extends AppCompatActivity {

    private EditText etName, etEmail, etPassword, etPhone;
    private RadioGroup rgRole;
    private RadioButton rbUser, rbProvider;
    private Button btnRegister;
    private TextView tvLogin;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        initViews();
        setupClickListeners();
    }

    private void initViews() {
        etName = findViewById(R.id.et_name);
        etEmail = findViewById(R.id.et_email);
        etPassword = findViewById(R.id.et_password);
        etPhone = findViewById(R.id.et_phone);
        rgRole = findViewById(R.id.rg_role);
        rbUser = findViewById(R.id.rb_user);
        rbProvider = findViewById(R.id.rb_provider);
        btnRegister = findViewById(R.id.btn_register);
        tvLogin = findViewById(R.id.tv_login);
        progressBar = findViewById(R.id.progress_bar);

        // Set default role to user
        rbUser.setChecked(true);
    }

    private void setupClickListeners() {
        btnRegister.setOnClickListener(v -> attemptRegister());
        tvLogin.setOnClickListener(v -> {
            Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
            startActivity(intent);
            finish();
        });
    }

    private void attemptRegister() {
        String name = etName.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String phone = etPhone.getText().toString().trim();
        String role = rbUser.isChecked() ? Constants.ROLE_USER : Constants.ROLE_PROVIDER;

        // Basic validation
        if (name.isEmpty()) {
            etName.setError("Name is required");
            return;
        }
        if (email.isEmpty()) {
            etEmail.setError("Email is required");
            return;
        }
        if (password.isEmpty()) {
            etPassword.setError("Password is required");
            return;
        }
        if (password.length() < 6) {
            etPassword.setError("Password must be at least 6 characters");
            return;
        }

        // Show progress
        progressBar.setVisibility(View.VISIBLE);
        btnRegister.setEnabled(false);

        // Create user object
        User user = new User(name, email, password, role);
        user.setPhone(phone);

        // Make API call
        AuthApiService apiService = ApiClient.getClient().create(AuthApiService.class);
        Call<AuthResponse> call = apiService.register(user);

        call.enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                progressBar.setVisibility(View.GONE);
                btnRegister.setEnabled(true);

                if (response.isSuccessful() && response.body() != null) {
                    AuthResponse authResponse = response.body();
                    if (authResponse.isSuccess()) {
                        // Save user session
                        User registeredUser = authResponse.getUser();
                        SharedPreferencesManager.saveUserSession(
                                registeredUser.getId(),
                                registeredUser.getName(),
                                registeredUser.getEmail(),
                                registeredUser.getRole(),
                                authResponse.getToken()
                        );

                        Toast.makeText(RegisterActivity.this, Constants.SUCCESS_REGISTER, Toast.LENGTH_SHORT).show();
                        
                        // Redirect to MainActivity
                        Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        Toast.makeText(RegisterActivity.this, authResponse.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(RegisterActivity.this, Constants.ERROR_SERVER, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                btnRegister.setEnabled(true);
                Toast.makeText(RegisterActivity.this, Constants.ERROR_NETWORK, Toast.LENGTH_SHORT).show();
            }
        });
    }

    // API interfaces
    interface AuthApiService {
        @POST("auth/register")
        Call<AuthResponse> register(@Body User user);
    }

    // Response models
    public static class AuthResponse {
        private boolean success;
        private String message;
        private String token;
        private User user;

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }
    }
}