# ServiceHub Native Android App

This is a complete native Android Studio project for the ServiceHub application. This project uses pure Android components without WebView dependencies.

## Project Structure

```
android-native/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/servicehub/
│   │   │   │   ├── MainActivity.java
│   │   │   │   ├── ui/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── LoginActivity.java
│   │   │   │   │   │   └── RegisterActivity.java
│   │   │   │   │   ├── main/
│   │   │   │   │   │   ├── HomeActivity.java
│   │   │   │   │   │   ├── ServicesFragment.java
│   │   │   │   │   │   ├── EventsFragment.java
│   │   │   │   │   │   ├── SocialFragment.java
│   │   │   │   │   │   └── ProfileFragment.java
│   │   │   │   │   ├── booking/
│   │   │   │   │   │   ├── BookingActivity.java
│   │   │   │   │   │   └── BookingConfirmationActivity.java
│   │   │   │   │   └── admin/
│   │   │   │   │       └── AdminActivity.java
│   │   │   │   ├── models/
│   │   │   │   │   ├── Service.java
│   │   │   │   │   ├── Event.java
│   │   │   │   │   ├── User.java
│   │   │   │   │   └── Booking.java
│   │   │   │   ├── adapters/
│   │   │   │   │   ├── ServiceAdapter.java
│   │   │   │   │   ├── EventAdapter.java
│   │   │   │   │   └── BookingAdapter.java
│   │   │   │   ├── utils/
│   │   │   │   │   ├── ApiClient.java
│   │   │   │   │   ├── SharedPreferencesManager.java
│   │   │   │   │   └── Constants.java
│   │   │   │   └── config/
│   │   │   │       └── AppConfig.java
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   ├── values/
│   │   │   │   ├── drawable/
│   │   │   │   └── mipmap/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── build.gradle
├── gradle/
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## Features

- **Authentication**: Login and registration with role selection
- **Service Discovery**: Browse and search services with filters
- **Event Management**: View and register for events
- **Social Hub**: User-generated content and interactions
- **Booking System**: Multi-step booking flow with payment
- **Admin Panel**: Payment verification and content moderation
- **User Profiles**: Personalized dashboards and settings

## Technology Stack

- **Language**: Java
- **UI Framework**: Android Jetpack (AppCompat, Material Design)
- **Architecture**: MVC with Fragments
- **Networking**: Retrofit + OkHttp
- **Image Loading**: Glide
- **Local Storage**: SharedPreferences + Room Database
- **Navigation**: Android Navigation Component
- **Dependency Injection**: Manual DI (no Dagger/Hilt needed)

## Setup Instructions

1. Open Android Studio
2. Select "Open an existing Android Studio project"
3. Navigate to the `android-native` folder
4. Wait for Gradle sync to complete
5. Connect your Android device or start an emulator
6. Click Run (Ctrl+R) or the green play button

## Configuration

Before running the app, update the server URL in `AppConfig.java`:

```java
public static final String BASE_URL = "http://YOUR_SERVER_IP:3000/api";
```

## Building APK

1. In Android Studio, go to Build → Build Bundle(s) / APK(s) → Build APK(s)
2. The APK will be generated in `app/build/outputs/apk/debug/`
3. For production, use Build → Generate Signed Bundle / APK

## Requirements

- Android Studio Arctic Fox or later
- Android SDK (API 21+)
- Java 8 or later
- Minimum Android version: 5.0 (Lollipop)
- Target Android version: 13 (Tiramisu)

## Key Components

### MainActivity
Entry point with navigation setup and authentication check

### HomeActivity
Main container with bottom navigation and fragments

### Fragments
- ServicesFragment: Service browsing and search
- EventsFragment: Event discovery and registration
- SocialFragment: Social feed and interactions
- ProfileFragment: User profile and settings

### API Integration
All API calls use Retrofit with proper error handling and response parsing.

### Data Models
Complete data models matching the backend API structure.

## Troubleshooting

1. **Build Errors**: Make sure all dependencies are synced
2. **Network Issues**: Check internet permissions and server URL
3. **UI Issues**: Test on different screen sizes and orientations
4. **API Errors**: Verify server is running and endpoints are accessible

## Next Steps

1. Add push notifications
2. Implement offline mode
3. Add biometric authentication
4. Integrate payment gateways
5. Add analytics and crash reporting