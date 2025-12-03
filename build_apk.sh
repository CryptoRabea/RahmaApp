# ServiceHub APK Build Script

# This script builds the Android APK using Android Studio command line tools

echo "🤖 Building ServiceHub Android APK..."

# Check if Android command line tools are available
if ! command -v adb >/dev/null 2>&1; then
    echo "❌ Android command line tools not found"
    echo "Please install Android Studio or Android SDK build tools"
    echo "Visit: https://developer.android.com/studio"
    exit 1
fi

# Check if Android SDK is available
if [ ! -d "$ANDROID_HOME" ] && [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "❌ Android SDK not found"
    echo "Please install Android Studio which includes the SDK"
    echo "Visit: https://developer.android.com/studio"
    exit 1
fi

# Build the APK
echo "📱 Building APK..."
cd /home/z/my-project/android

# Clean previous builds
./gradlew clean

# Build the project
./gradlew assembleRelease

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ APK build successful!"
    echo "📦 APK Location: $(find . -name "*.apk" -type f | head -1)"
    
    # Copy APK to a more accessible location
    APK_FILE=$(find . -name "*.apk" -type f | head -1)
    cp "$APK_FILE" /home/z/my-project/ServiceHub.apk
    
    echo "✅ APK copied to: /home/z/my-project/ServiceHub.apk"
    echo ""
    echo "📋 APK Details:"
    echo "   File: ServiceHub.apk"
    echo "   Size: $(ls -lh /home/z/my-project/ServiceHub.apk | awk '{print $5}')"
    echo "   Location: /home/z/my-project/"
    echo ""
    echo "📱 Installation Instructions:"
    echo "   1. Enable 'Unknown Sources' on your Android device"
    echo "   2. Copy ServiceHub.apk to your device"
    echo "   3. Install the APK"
    echo "   4. Launch the app"
    echo ""
    echo "🔧 Advanced Options:"
    echo "   • Install on emulator: adb install ServiceHub.apk"
    echo "   • Install on connected device: adb -s <device_id> install ServiceHub.apk"
    echo "   • Open Android Studio for more customization"
    
else
    echo "❌ APK build failed!"
    echo "Check the error messages above for details"
    exit 1
fi