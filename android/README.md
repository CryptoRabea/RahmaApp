# ServiceHub Android App

A WebView-based Android application that wraps your ServiceHub web app.

## 🚀 Features

- **WebView Integration**: Loads your ServiceHub web app
- **Network Access**: Full internet connectivity
- **Storage Access**: Read/write external storage
- **Back Navigation**: Hardware back button support
- **Responsive Design**: Works on all screen sizes
- **Material Design**: Modern Android UI elements

## 📱 Requirements

- **Android Studio** (Recommended)
- **Android SDK** (API Level 34+)
- **Java Development Kit** (JDK 8+)

## 🛠️ Quick Start

### Method 1: Android Studio (Recommended)
1. Open Android Studio
2. Choose "Open an existing Android Studio project"
3. Navigate to `/home/z/my-project/android`
4. Wait for Gradle sync to complete
5. Click "Build" → "Build Bundle(s) APK"
6. Your APK will be in `android/app/build/outputs/apk/release/`

### Method 2: Command Line
```bash
cd /home/z/my-project/android
./gradlew assembleRelease
```

### Method 3: Using Build Script
```bash
cd /home/z/my-project
./build_apk.sh
```

## 📋 APK Details

- **Package Name**: com.servicehub.app
- **App Name**: ServiceHub
- **Web URL**: http://21.0.11.139:3000
- **Minimum SDK**: API 34
- **Target SDK**: API 34

## 🔧 Installation

1. Enable "Unknown Sources" on your Android device
2. Install the APK file
3. Launch the app

## 📁 Project Structure

```
android/
├── app/
│   ├── build/
│   │   └── outputs/
│   │       └── apk/
│   │           └── release/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── servicehub/
│   │       │           ├── MainActivity.java
│   │       └── AndroidManifest.xml
│   │       └── res/
│   │           ├── values/
│   │           │   ├── strings.xml
│   │           │   ├── styles.xml
│   │           │   └── drawable/
│   │           │       └── ic_launcher.xml
│   └── libs/
│   ├── build.gradle
│   └── gradlew
└── README.md
```

## 🎨 WebView Configuration

The app uses a WebView to load your ServiceHub web app. It includes:

- JavaScript enabled
- File access permissions
- Network access
- Hardware back button handling
- Custom error pages
- Loading indicators

## 📱 Features

✅ Full ServiceHub functionality
✅ Events browsing and booking
✅ Services discovery
✅ Social hub
✅ User authentication
✅ Payment system
✅ Responsive design
✅ Offline support

## 🔗 Integration

The Android app seamlessly integrates with your existing web app, providing:
- Native Android navigation
- WebView performance optimization
- Push notification support (ready for implementation)
- Native Android features (camera, GPS, etc.)

## 🚀 Ready to Build

Run any of the build methods above to generate your ServiceHub APK!