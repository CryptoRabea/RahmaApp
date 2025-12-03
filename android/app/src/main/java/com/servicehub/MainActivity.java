package com.servicehub.app;

import android.app.Application;
import android.os.Bundle;

public class MainActivity extends Application {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Load the web app in WebView
        setContentView(R.layout.activity_main);
        
        WebView webView = findViewById(R.id.webview);
        
        // Enable JavaScript (if needed)
        webView.getSettings().setJavaScriptEnabled(true);
        
        // Enable file access from local storage
        webView.getSettings().setAllowFileAccess(true);
        
        // Enable DOM storage
        webView.getSettings().setDomStorageEnabled(true);
        
        // Load your web app
        webView.loadUrl("http://21.0.11.139:3000");
        
        // Handle back button
        webView.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
                    webView.goBack();
                    return true;
                }
                return false;
            }
        });
    }
}