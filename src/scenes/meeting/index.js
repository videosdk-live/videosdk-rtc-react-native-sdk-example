import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, NativeModules, PermissionsAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./MeetingContainer";
import { SCREEN_NAMES } from "../../navigators/screenNames";
const { ForegroundServiceModule } = NativeModules;

const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const allGranted = Object.values(granted).every(
      (permission) => permission === PermissionsAndroid.RESULTS.GRANTED,
    );

    console.log(allGranted ? "permissions granted" : "permissions denied");

    return allGranted;
  } catch (err) {
    console.error("Error requesting permissions:", err);
    return false;
  }
};

export default function ({ navigation, route }) {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const permissionsGrantedRef = useRef(false);

  const {
    token,
    meetingId,
    micEnabled,
    webcamEnabled,
    name,
    meetingType,
    defaultCamera,
  } = route.params;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const granted = await requestPermissions();
      if (isMounted) {
        permissionsGrantedRef.current = granted;
        setPermissionsGranted(granted);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!meetingId || !token) {
      console.error("Meeting screen requires meetingId and token");
      navigation.navigate(SCREEN_NAMES.Join);
    }
  }, [meetingId, token, navigation]);

  const handleMeetingJoined = useCallback(async () => {
    if (permissionsGrantedRef.current) {
      if (Platform.OS === "android") {
        setTimeout(async () => {
          try {
            await ForegroundServiceModule.startService();
          } catch (err) {
            console.error("Error starting foreground service:", err);
          }
        }, 300);
      }
    }
  }, []);

  const handleMeetingLeft = useCallback(() => {
    if (Platform.OS === "android") {
      ForegroundServiceModule.stopService();
    }
    navigation.navigate(SCREEN_NAMES.Join);
  }, [navigation]);

  if (Platform.OS === "android" && !permissionsGranted) {
    return (
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{ flex: 1, backgroundColor: colors.primary[900], padding: 12 }}
      />
    );
  }

  if (!meetingId || !token) {
    return null;
  }

  return (
    <SafeAreaView
      edges={Platform.OS === "ios" ? ["bottom"] : ["top", "bottom"]}
      style={{ flex: 1, backgroundColor: colors.primary[900], padding: 12 }}
    >
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name: name,
          notification: {
            title: "Video SDK Meeting",
            message: "Meeting is running.",
          },
          defaultCamera: defaultCamera,
        }}
        token={token}
      >
        <MeetingConsumer
          onMeetingJoined={handleMeetingJoined}
          onMeetingLeft={handleMeetingLeft}
        >
          {() => (
            <MeetingContainer
              webcamEnabled={webcamEnabled}
              meetingType={meetingType}
            />
          )}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
