#!/bin/bash

# ServiceHub APK Generator Script
# This script provides multiple free methods to generate APK for your ServiceHub app

echo "🚀 ServiceHub APK Generator - Free Methods"
echo "=========================================="

# App Information
APP_NAME="ServiceHub"
PACKAGE_NAME="com.servicehub.app"
WEB_URL="http://21.0.11.139:3000"

echo "📋 App Details:"
echo "  Name: $APP_NAME"
echo "  Package: $PACKAGE_NAME"
echo "  Web URL: $WEB_URL"
echo ""

# Method 1: PWA2APK (Recommended)
echo "📱 Method 1: PWA2APK (Easiest & Fastest)"
echo "----------------------------------------"
echo "1. Opening PWA2APK.com..."
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "https://www.pwa2apk.com/"
elif command -v open >/dev/null 2>&1; then
    open "https://www.pwa2apk.com/"
else
    echo "Please manually open: https://www.pwa2apk.com/"
fi

echo "2. Instructions:"
echo "   • Enter URL: $WEB_URL"
echo "   • Click 'Generate APK'"
echo "   • Download your APK"
echo ""

# Method 2: AppGyser
echo "📱 Method 2: AppGyser"
echo "----------------------------------------"
echo "1. Opening AppGyser.com..."
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "https://www.appgyver.com/"
elif command -v open >/dev/null 2>&1; then
    open "https://www.appgyver.com/"
else
    echo "Please manually open: https://www.appgyver.com/"
fi

echo "2. Instructions:"
echo "   • Sign up for free account"
echo "   • Connect your web app URL"
echo "   • Build Android app"
echo "   • Generate APK"
echo ""

# Method 3: Web2APK
echo "📱 Method 3: Web2APK"
echo "----------------------------------------"
echo "1. Opening Web2APK.com..."
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "https://www.web2apk.com/"
elif command -v open >/dev/null 2>&1; then
    open "https://www.web2apk.com/"
else
    echo "Please manually open: https://www.web2apk.com/"
fi

echo "2. Instructions:"
echo "   • Enter your web app URL"
echo "   • Convert to APK"
echo "   • Download APK file"
echo ""

# Check app status
echo "🔍 Checking if your app is accessible..."
if curl -s --head --connect-timeout 5 "$WEB_URL" >/dev/null 2>&1; then
    echo "✅ Your app is accessible! You can proceed with APK generation."
else
    echo "⚠️  Warning: Your app might not be accessible."
    echo "   Make sure your development server is running: npm run dev"
    echo "   Your app URL should be: $WEB_URL"
fi

echo ""
echo "🎉 Ready to generate your free APK!"
echo "=========================================="
echo "Choose any method above to create your ServiceHub APK."
echo ""
echo "💡 Tips:"
echo "  • PWA2APK is recommended for beginners"
echo "  • AppGyser offers more customization options"
echo "  • All methods are completely free"
echo "  • Your app will work on Android devices"
echo ""