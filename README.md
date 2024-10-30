# 🚀 Video SDK for React Native

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/concept-and-architecture)
[![Firebase](https://img.shields.io/badge/Download%20Android-Firebase-green)](https://appdistribution.firebase.dev/i/a4c63049415c4356)
[![TestFlight](https://img.shields.io/badge/Download%20iOS-TestFlight-blue)](https://testflight.apple.com/join/LYj3QJPx)
[![Discord](https://img.shields.io/discord/876774498798551130?label=Join%20on%20Discord)](https://discord.gg/bGZtAbwvab)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://app.videosdk.live/signup)

At Video SDK, we’re building tools to help companies create world-class collaborative products with capabilities for live audio/video, cloud recordings, RTMP/HLS streaming, and interaction APIs.

### 🥳 Get **10,000 minutes free** every month! **[Try it now!](https://app.videosdk.live/signup)**

### ⚡️From Clone to Launch - Get Started with the Example in 5 mins!

[![ReactNative](https://cdn.videosdk.live/docs/images/youtube/ReactNative.png)](https://youtu.be/TGF109DN6lI?si=NawtfwbalfNeqZ5h "ReactNative")

## 📚 **Table of Contents**

- [🖥️ **Demo App**](#%EF%B8%8F-demo-app)
- [⚡ **Quick Setup**](#-quick-setup)
- [🔧 **Prerequisites**](#-prerequisites)
- [📦 **Running the Sample App**](#-running-the-sample-app)
- [🔥 **Meeting Features**](#-meeting-features)
- [🧠 **Key Concepts**](#-key-concepts)
- [🔑 **Token Generation**](#-token-generation)
- [🧩 **Project OverView**](#-project-overview)
- [📖 **Examples**](#-examples)
- [📝 **VideoSDK's Documentation**](#-documentation)
- [💬 **Join Our Community**](#-join-our-community)


## 🖥️ Demo App

📱 Download the Sample iOS app here: https://testflight.apple.com/join/LYj3QJPx

📱 Download the Sample Android app here: https://appdistribution.firebase.dev/i/a4c63049415c4356

## ⚡ Quick Setup

1. Sign up on [VideoSDK](https://app.videosdk.live/) to grab your API Key and Secret.
2. Familiarize yourself with [Token](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/authentication-and-token)

## 🛠 Prerequisites

- React Native 0.59.10 or later
- Node 10 or later
- Valid Video SDK [Account](https://app.videosdk.live/)
- For Android
  - Java Development Kit (JDK) 8 or later
  - Android Studio (latest version recommended)
  - A physical or virtual mobile device running Android 5.0 or later
- For iOS
  - Xcode 10 or later
  - CocoaPods
  - A physical or virtual mobile device running iOS 12.0 or later

## 📦 Running the Sample App

Follow these steps to get the sample app up and running:

### 1. Clone the sample project

Clone the repository to your local environment.

```js
git clone https://github.com/videosdk-live/videosdk-rtc-react-native-sdk-example.git
```

### 2. Copy the `.env.example` file to `.env` file.

Open your favorite code editor and copy `.env.example` to `.env` file.

```js
cp .env.example .env
```

### 3. Modify `.env` file

Generate a temporary token from [Video SDK Account](https://app.videosdk.live/signup).

```js title=".env"
REACT_APP_VIDEOSDK_TOKEN = "TEMPORARY-TOKEN";
```

### 4. Install the dependencies

Install all the dependencies to run the project.

```js
npm install
```

### 5. Set Up for iOS (if applicable)

For iOS, navigate to the ios folder and install the pods.

```js
cd ios
pod install
```

### 6. Run the sample app

Bingo, it's time to push the launch button.

```js
npm run start
npm android
npm ios
```

## 🔥 Meeting Features

Unlock a suite of powerful features to enhance your meetings:

| Feature                        | Documentation                                                                                                                | Description                                                                                                      |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| 📋 **Precall Setup**           | [Setup Precall](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/setup-call/precall)                   | Configure audio, video devices, and other settings before joining the meeting.                                              |
| 🤝 **Join Meeting**            | [Join Meeting](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/setup-call/join-meeting)                | Allows participants to join a meeting.                                                                 |
| 🚪 **Leave Meeting**            | [Leave Meeting](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/setup-call/leave-end-meeting)                | Allows participants to leave a meeting.                                                                 |
| 🎤 **Toggle Mic**         | [Mic Control](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/mute-unmute-mic)          | Toggle the microphone on or off during a meeting.                                                                  |
| 📷 **Toggle Camera**           | [Camera Control](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/on-off-camera)         | Turn the video camera on or off during a meeting.                                                                  |
| 🖥️ **Screen Share**            | [Screen Share](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/screen-share)          | Share your screen with other participants during the call.                                                      |
| 📸 **Image Capture**           | [Image Capturer](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/image-capturer)        | Capture images of other participant from their video stream, particularly useful for Video KYC and identity verification scenarios.     |
| 🔊 **Change Audio Output**     | [Switch Audio Output](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/change-audio-ouptut-device) | Select an output device for audio during a meeting.                                                                |
| 🔌 **Change Video Output**     | [Switch Video Output](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/handling-media/change-video-input-device) | Select an output device for audio during a meeting.                                                                |
| ⚙️ **Optimize Audio Track**         | [Audio Track Optimization](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/render-media/optimize-audio-track)                                       | Enhance the quality and performance of media tracks.                                                            |
| ⚙️ **Optimize Video Track**         | [Video Track Optimization](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/render-media/optimize-video-track)                                       | Enhance the quality and performance of media tracks.                                                            |
| 🖼️ **Virtual Background**        | [Virtual Background](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/render-media/virtual-background)                                       | Add a virtual background or blur effect to your video during the call.                                                            |
| 💬 **Chat**                    | [In-Meeting Chat](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/pubsub)      | Exchange messages with participants through a Publish-Subscribe mechanism.                                                   |
| 📝 **Whiteboard**              | [Whiteboard](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/whiteboard)      | Collaborate visually by drawing and annotating on a shared whiteboard.                                           |
| 📁 **File Sharing**            | [File Sharing](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/upload-fetch-temporary-file) | Share files with participants during the meeting.                                                               |
| 📺 **Picture-in-Picture**      | [Picture-in-Picture](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/render-media/picture-in-picture) | Allows the video call to continue in a floating, minimized window. |
| 📼 **Recording**               | [Recording](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/recording/Overview)                | Record the meeting for future reference.                                                                        |
| 📡 **RTMP Livestream**         | [RTMP Livestream](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/live-streaming/rtmp-livestream)        | Stream the meeting live to platforms like YouTube or Facebook.                                                  |
| 📝 **Real-time Transcription**           | [Real-time Transcription](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/transcription-and-summary/realtime-transcribe-meeting) | Generate real-time transcriptions of the meeting.                                                               |
| 🔇 **Toggle Remote Media**     | [Remote Media Control](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/control-remote-participant/remote-participant-media) | Control the microphone or camera of remote participants.                                                        |
| 🚫 **Mute All Participants**   | [Mute All](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/control-remote-participant/mute-all-participants) | Mute all participants simultaneously during the call.                                                           |
| 🗑️ **Remove Participant**      | [Remove Participant](https://docs.videosdk.live/react-native/guide/video-and-audio-calling-api-sdk/control-remote-participant/remove-participant) | Eject a participant from the meeting.  |

## 🧠 Key Concepts

Understand the core components of our SDK:

- `Meeting` - A Meeting represents Real-time audio and video communication.

  **` Note: Don't confuse the terms Room and Meeting; both mean the same thing 😃`**

- `Sessions` - A particular duration you spend in a given meeting is referred as a session, you can have multiple sessions of a specific meetingId.
- `Participant` - A participant refers to anyone attending the meeting session. The `local participant` represents yourself (You), while all other attendees are considered `remote participants`.
- `Stream` - A stream refers to video or audio media content that is published by either the `local participant` or `remote participants`.


## 🔐 Token Generation

The token is used to create and validate a meeting using API and also initialize a meeting.

🛠️ `Development Environment`:

- You may use a temporary token for development. To create a temporary token, go to VideoSDK's [dashboard](https://app.videosdk.live/api-keys) .

🌐 `Production Environment`:

- You must set up an authentication server to authorize users for production. To set up an authentication server, please take a look at our official example repositories. [videosdk-rtc-api-server-examples](https://github.com/videosdk-live/videosdk-rtc-api-server-examples)


## 🧩 Project Overview

### App Behaviour with Different Meeting Types

- **One-to-One meeting** - The One-to-One meeting allows 2 participants to join a meeting in the app.

- **Group Meeting** - The Group meeting allows any number of participants to join a meeting in the app with a maximum of 6 participants on screen.

## 🏗️ Project Structure

We have separated screens and components in the following folder structure:

```
src
└── scenes
    └── join
      └── index.js
    └── meeting
```

### 1. Join Screen

- [scenes/join/index.js](src/scenes/join/index.js): This file provides an interface for users to create or join meetings, allowing control over audio, video, and camera orientation.

 <p align="center">
  <img width="230" height="450" src="./public/create_join.gif"/>
  </p>

### 2. Meeting Screen

```
scenes
└── meeting
    └── index.js
    └── MeetingContainer.js
    └── Components
    └── Conference
    └── OneToOne
```

- [meeting/index.js](src/scenes/meeting/index.js) : This file essentially initializes the meeting based on the provided configuration, such as meeting ID, participant name, and mic/camera status.
- [meeting/MeetingContainer.js](src/scenes/meeting/MeetingContainer.js) : `MeetingContainer.js` manages joining and leaving meetings, tracking participant status and limits using `useMeeting`. It dynamically renders either `ConferenceMeetingViewer`, `OneToOneMeetingViewer`, or a waiting view based on the meeting type and participant count.

### [Components](src/scenes/meeting/Components)

This folder contains all the common components used in the `Conference` and `OneToOne` meeting types.

```
Components
    └── ChatViewer
    └── ParticipantListViewer
    └── LocalParticipantPresenter.js
    └── WaitingToJoinView.js
```

#### 1. ChatViewer

- [ChatViewer](src/scenes/meeting/Components/ChatViewer) provides a real-time chat interface, displaying messages in a scrollable list with sender names and timestamps.

  <p align="center">
  <img width="180"  src="./public/chat.png"/>
  </p>

#### 2. ParticipantListViewer

- [ParticipantListViewer](src/scenes/meeting/Components/ParticipantListViewer) displays a list of meeting participants using their IDs, with each participant represented by a `ParticipantListItem` component.

  <p align="center">
  <img width="180"  src="./public/participant_list.png"/>
  </p>

#### 3. LocalParticipantPresenter.js

- [LocalParticipantPresenter.js](src/scenes/meeting/Components/LocalParticipantPresenter.js) displays a view indicating that the local user is presenting, with options to manage screen sharing.

  <p align="center">
  <img width="180"  src="./public/local_screen_share.png"/>
  </p>

#### 4. WaitingToJoinView.js

- [WaitingToJoinView.js](src/scenes/meeting/Components/WaitingToJoinView.js) provides a waiting screen with animation and message while a meeting room is being created.

  <p align="center">
  <img width="180"  src="./public/waiting.png"/>
  </p>

### [Conference](src/scenes/meeting/Conference)

The whole user interface and business logic for the meeting type `Conference` are contained in this folder.

```
Conference
    └── ConferenceMeetingViewer.js
    └── ConferenceParticipantGrid.js
    └── ParticipantView.js
    └── PauseInvisibleParticipant.js
    └── RemoteParticipantPresenter.js
```

#### 1. ConferenceMeetingViewer.js

- [ConferenceMeetingViewer.js](src/scenes/meeting/Conference/ConferenceMeetingViewer.js) manages the primary layout and interaction for conference-style meetings, showing participant views, recording status, and controls for toggling audio, video, and screen sharing. 

  <p align="center">
  <img width="180"  src="./public/conference.png"/>
  </p>

#### 2. ConferenceParticipantGrid.js

- [ConferenceParticipantGrid.js](src/scenes/meeting/Conference/ConferenceParticipantGrid.js) arranges participant video feeds in a responsive grid, adjusting the number of participants per row and video quality based on the total participant count and whether someone is presenting. It uses a memoized [ParticipantView](src/scenes/meeting/Conference/ParticipantView.js) to improve rendering efficiency and includes a `BottomSheet` for viewing individual participant stats.

#### 3. ParticipantView.js

- [ParticipantView.js](src/scenes/meeting/Conference/ParticipantView.js) maintains the stream of a particular participant as well as the status of controls (Mic and Cam).

#### 4. PauseInvisibleParticipant.js

- [PauseInvisibleParticipant.js](src/scenes/meeting/Conference/PauseInvisibleParticipant.js) optimizes resource usage by pausing video streams of participants who are not visible on the screen. It maps through all participants and checks if each participant ID is within the list of visible participants, resuming streams for visible ones and pausing others.

#### 5. RemoteParticipantPresenter.js

- [RemoteParticipantPresenter.js](src/scenes/meeting/Conference/RemoteParticipantPresenter.js) displays the screen share of a remote participant.

  <p align="center">
  <img width="180"  src="./public/remote_screen_share.png"/>
  </p>

### [OneToOne](src/scenes/meeting/OneToOne)

The whole user interface and business logic for the meeting type `OneToOne` are contained in this folder.

```
OneToOne
    └── index.js
    └── LargeView
    └── MiniView
    └── LocalViewContainer.js
    └── ParticipantLimitViewer.js
```

#### 1. index.js

- The [OneToOneMeetingViewer](src/scenes/meeting/OneToOne/index.js) component defines the layout for one-on-one meetings, managing primary views for [LargeView](src/scenes/meeting/OneToOne/LargeView/index.js) and [MiniView](src/scenes/meeting/OneToOne/MiniView/index.js) participants. It provides controls for toggling audio, video, and screen sharing, and includes a `BottomSheet` for viewing participant stats, chat, and the participant list. The interface adapts dynamically based on participant count, screen-sharing status, and device orientation.

  <p align="center">
  <img width="180"  src="./public/one_to_one.png"/>
  </p>

#### 2. LargeView

- [LargeView](src/scenes/meeting/OneToOne/LargeView/index.js) displays a participant's video or screen share in full view, prioritizing high video quality.

#### 3. MiniView

- [MiniView](src/scenes/meeting/OneToOne/MiniView/index.js) is dedicated to displaying a minimized view of a local participant’s video stream.

#### 4. LocalViewContainer.js

- [LocalViewContainer.js](src/scenes/meeting/OneToOne/LocalViewContainer.js) handles displaying the local participant’s video stream when no other participants are present in the meeting. 

  <p align="center">
  <img width="180"  src="./public/local_participant.png"/>
  </p>

#### 5. ParticipantLimitViewer.js

- [ParticipantLimitViewer.js](src/scenes/meeting/OneToOne/ParticipantLimitViewer.js) notifies users when the maximum participant limit is reached in a meeting, displaying a message that only two participants are allowed.

  <p align="center">
  <img width="180"  src="./public/oops.png"/>
  </p>
  
<br/>

## 📖 Examples

- [**Prebuilt Examples**](https://github.com/videosdk-live/videosdk-rtc-prebuilt-examples)
- [**JavaScript SDK Example**](https://github.com/videosdk-live/videosdk-rtc-javascript-sdk-example)
- [**React SDK Example**](https://github.com/videosdk-live/videosdk-rtc-react-sdk-example.git)
- [**Flutter SDK Example**](https://github.com/videosdk-live/videosdk-rtc-flutter-sdk-example)
- [**Android Java SDK Example**](https://github.com/videosdk-live/videosdk-rtc-android-java-sdk-example)
- [**Android Kotlin SDK Example**](https://github.com/videosdk-live/videosdk-rtc-android-kotlin-sdk-example)
- [**iOS SDK Example**](https://github.com/videosdk-live/videosdk-rtc-ios-sdk-example)

## 📝 Documentation

Explore more and start building with our [**Documentation**](https://docs.videosdk.live/)

## 🤝 Join Our Community

- **[Discord](https://discord.gg/Gpmj6eCq5u)**: Engage with the Video SDK community, ask questions, and share insights.
- **[X](https://x.com/video_sdk)**: Stay updated with the latest news, updates, and tips from Video SDK.
