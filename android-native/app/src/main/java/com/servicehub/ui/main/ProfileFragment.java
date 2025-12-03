package com.servicehub.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.servicehub.R;
import com.servicehub.ui.auth.LoginActivity;
import com.servicehub.utils.SharedPreferencesManager;

public class ProfileFragment extends Fragment {

    private TextView tvName, tvEmail, tvRole, tvLogout;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        
        initViews(view);
        setupUserInfo();
        setupClickListeners();
        
        return view;
    }

    private void initViews(View view) {
        tvName = view.findViewById(R.id.tv_name);
        tvEmail = view.findViewById(R.id.tv_email);
        tvRole = view.findViewById(R.id.tv_role);
        tvLogout = view.findViewById(R.id.tv_logout);
    }

    private void setupUserInfo() {
        tvName.setText(SharedPreferencesManager.getUserName());
        tvEmail.setText(SharedPreferencesManager.getUserEmail());
        tvRole.setText("Role: " + SharedPreferencesManager.getUserRole());
    }

    private void setupClickListeners() {
        tvLogout.setOnClickListener(v -> {
            SharedPreferencesManager.clearUserSession();
            Intent intent = new Intent(getActivity(), LoginActivity.class);
            startActivity(intent);
            getActivity().finish();
        });
    }
}