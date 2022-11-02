# Video SDK for React Native (Android and iOS)

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/getting-started)
[![Firebase](https://img.shields.io/badge/Download%20Android-Firebase-green)](https://appdistribution.firebase.dev/i/a4c63049415c4356)
[![TestFlight](https://img.shields.io/badge/Download%20iOS-TestFlight-blue)](https://testflight.apple.com/join/LYj3QJPx)
[![Discord](https://img.shields.io/discord/876774498798551130?label=Join%20on%20Discord)](https://discord.gg/bGZtAbwvab)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://app.videosdk.live/signup)

At Video SDK, we’re building tools to help companies create world-class collaborative products with capabilities of live audio/videos, compose cloud recordings/rtmp/hls and interaction APIs

## Demo App
Check out demo [here](https://videosdk.live/prebuilt/)

📲 Download the Sample iOS app here: https://testflight.apple.com/join/LYj3QJPx

📱 Download the Sample Android app here: https://appdistribution.firebase.dev/i/a4c63049415c4356

## Steps to Integrate

### Prerequisites
- React Native 0.59.10 or later
- Node 10 or later
- Valid Video SDK [Account](https://app.videosdk.live/)
- For Android
  - Java Development Kit (JDK) 8 or later
  - Android Studio (latest version recommended)
  - A physical or virtual mobile device running Android 5.0 or later
- For iOS
  - Xcode 9.4 or later
  - CocoaPods
  - A physical or virtual mobile device running iOS 9.0 or later

### Step 1: Clone the sample project
Clone the repository to your local environment.
```js
git clone https://github.com/videosdk-live/videosdk-rtc-react-sdk-example.git
```

### Step 2: Copy the .env.example file to .env file.
Open your favorite code editor and copy `.env.example` to `.env` file.
```js 
cp .env.example .env
```

### Step 3: Modify .env file
Generate temporary token from [Video SDK Account](https://app.videosdk.live/signup).
```js title=".env"
REACT_APP_VIDEOSDK_TOKEN = "TEMPORARY-TOKEN"
```

### Step 4: Install the dependecies
Install dependecies all the project dependencies.
```js
npm install
```

### Step 5: Run the sample app
Bingo, it's time to push the launch button. 
```js
npm run start
npm android
npm ios
```


## Examples
- [Prebuilt SDK Examples](https://github.com/videosdk-live/videosdk-rtc-prebuilt-examples)
- [JavaScript SDK Example](https://github.com/videosdk-live/videosdk-rtc-javascript-sdk-example)
- [React JS SDK Example](https://github.com/videosdk-live/videosdk-rtc-react-sdk-example)
- [React Native SDK Example](https://github.com/videosdk-live/videosdk-rtc-react-native-sdk-example)
- [Flutter SDK Example](https://github.com/videosdk-live/videosdk-rtc-flutter-sdk-example)
- [Android SDK Example](https://github.com/videosdk-live/videosdk-rtc-android-java-sdk-example)
- [iOS SDK Example](https://github.com/videosdk-live/videosdk-rtc-ios-sdk-example)

## Documentation
[Read the documentation](https://docs.videosdk.live/) to start using Video SDK.

## Community
- [Discord](https://discord.gg/Gpmj6eCq5u) - To get involved with the Video SDK community, ask questions and share tips.
- [Twitter](https://twitter.com/video_sdk) - To receive updates, announcements, blog posts, and general Video SDK tips.
