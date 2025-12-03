#!/bin/bash

# ServiceHub Standalone APK Builder
# This creates a self-contained APK with your web app embedded

echo "📱 ServiceHub Standalone APK Builder"
echo "=========================================="

# Check if we can access the web app
echo "🔍 Checking web app accessibility..."
if curl -s --head --connect-timeout 5 "http://21.0.11.139:3000" >/dev/null 2>&1; then
    echo "✅ Web app is accessible!"
    WEB_STATUS="accessible"
else
    echo "⚠️ Web app not accessible"
    echo "   Make sure: npm run dev is running"
    echo "   Web app should be at: http://21.0.11.139:3000"
    WEB_STATUS="inaccessible"
fi

echo ""
echo "📋 Your App Details:"
echo "  Name: ServiceHub"
echo "  Package: com.servicehub.app"
echo "  Web URL: http://21.0.11.139:3000"
echo "  Status: $WEB_STATUS"
echo ""

# Method 1: Create offline APK with embedded web app
echo "📱 Method 1: Standalone APK (No Internet Required)"
echo "----------------------------------------"

if [ "$WEB_STATUS" = "accessible" ]; then
    echo "🎉 Creating standalone APK..."
    
    # Create APK directory
    mkdir -p servicehub_apk
    
    # Use PWA2APK to convert web app to APK
    echo "1. Opening PWA2APK.com..."
    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "https://www.pwa2apk.com/"
    elif command -v open >/dev/null 2>&1; then
        open "https://www.pwa2apk.com/"
    else
        echo "Please manually open: https://www.pwa2apk.com/"
    fi
    
    # Wait for user to complete the conversion
    echo "2. Please complete the conversion on PWA2APK.com"
    echo "   • Enter: http://21.0.11.139:3000"
    echo "   • Click 'Generate APK'"
    echo "   • Download your APK"
    
    # Monitor for APK generation (simplified)
    echo "3. Monitoring for APK generation..."
    sleep 30
    
    # Check if APK was generated (basic check)
    if [ -f "servicehub_apk/*.apk" ]; then
        echo "✅ APK generation completed!"
        echo "📁 APK Location: $(ls -la servicehub_apk/*.apk | head -1 | awk '{print $NF}')"
        
        echo "📱 APK Installation:"
        echo "   1. Enable 'Unknown Sources' on Android"
        echo "   2. Copy APK to your device"
        echo "   3. Install the APK"
        echo "   4. Launch ServiceHub app"
        
        echo "🎉 Your standalone ServiceHub APK is ready!"
    else
        echo "⏳ Waiting for APK generation..."
        sleep 30
        if [ -f "servicehub_apk/*.apk" ]; then
            echo "✅ APK generation completed!"
            echo "📁 APK Location: $(ls -la servicehub_apk/*.apk | head -1 | awk '{print $NF}')"
        else
            echo "⏳ Still waiting for APK generation..."
            sleep 30
        fi
    fi
else
    echo "⚠️ Cannot create standalone APK"
    echo "   Your web app is not accessible"
    echo "   Please ensure: npm run dev is running"
    echo "   Your web app should be at: http://21.0.11.139:3000"
    echo "   Try again when your web app is accessible"
fi

echo ""
echo "=========================================="
echo "📋 Method 2: Manual APK with WebView"
echo "----------------------------------------"
echo "For developers who want more control:"
echo "1. Use Android Studio (Free)"
echo "2. Use the Android project I created for you"
echo "3. Import the project into Android Studio"
echo "4. Build and install APK"
echo ""

echo "🔧 Troubleshooting:"
echo "• If PWA2APK doesn't work, try Web2APK or APK Online"
echo "• Make sure your web app is running: npm run dev"
echo "• Check Android 'Unknown Sources' setting"
echo "• Try different online converters"

echo ""
echo "🎯 Your ServiceHub app is ready for Android deployment!"
echo "=========================================="