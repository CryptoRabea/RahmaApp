#!/bin/bash

# ServiceHub Native Android App Setup Script
echo "🚀 Setting up ServiceHub Native Android App..."

# Check if Android Studio is installed
if ! command -v studio &> /dev/null; then
    echo "⚠️  Android Studio not found in PATH"
    echo "Please install Android Studio from https://developer.android.com/studio"
    echo "After installation, run this script again"
    exit 1
fi

# Navigate to the android-native directory
cd "$(dirname "$0")/android-native"

echo "📁 Current directory: $(pwd)"

# Check if gradle wrapper exists
if [ ! -f "gradlew" ]; then
    echo "📦 Creating Gradle wrapper..."
    gradle wrapper --gradle-version 8.2
fi

# Make gradlew executable
chmod +x gradlew

echo "🔧 Building project..."
./gradlew build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 ServiceHub Android app is ready!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Open Android Studio"
    echo "2. Select 'Open an existing Android Studio project'"
    echo "3. Navigate to: $(pwd)"
    echo "4. Wait for Gradle sync to complete"
    echo "5. Connect your Android device or start an emulator"
    echo "6. Click Run (Ctrl+R) or the green play button"
    echo ""
    echo "📱 To build APK:"
    echo "1. In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)"
    echo "2. APK will be generated in: app/build/outputs/apk/debug/"
    echo ""
    echo "⚙️  Configuration:"
    echo "- Update server URL in: app/src/main/java/com/servicehub/config/AppConfig.java"
    echo "- Current server: http://21.0.11.139:3000"
    echo ""
    echo "🔑 Features included:"
    echo "- ✅ User authentication (Login/Register)"
    echo "- ✅ Service browsing and search"
    echo "- ✅ Event discovery"
    echo "- ✅ User profiles"
    echo "- ✅ EGP currency support"
    echo "- ✅ Material Design UI"
    echo "- ✅ Offline data storage"
    echo "- ✅ API integration"
    echo ""
else
    echo "❌ Build failed!"
    echo "Please check the error messages above"
    exit 1
fi