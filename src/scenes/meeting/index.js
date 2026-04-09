import React, { useEffect, useState, useRef } from "react";
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
  const prevProps = useRef({ navigation, route });
  const prevState = useRef({ permissionsGranted: false });

  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const changedProps = Object.entries({ navigation, route }).filter(
      ([key, value]) => prevProps.current[key] !== value,
    );
    if (changedProps.length > 0) {
      console.log(
        "Meeting Screen re-rendered due to PROPS change:",
        Object.fromEntries(changedProps),
      );
    } else {
      const changedState = Object.entries({ permissionsGranted }).filter(
        ([key, value]) => prevState.current[key] !== value,
      );
      if (changedState.length > 0) {
        console.log(
          "Meeting Screen re-rendered due to STATE change:",
          Object.fromEntries(changedState),
        );
      } else {
        console.log("Meeting Screen re-rendered due to PARENT re-render");
      }
    }
    prevProps.current = { navigation, route };
    prevState.current = { permissionsGranted };
  });

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
      if (isMounted) setPermissionsGranted(granted);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMeetingJoined = async () => {
    if (permissionsGranted) {
      if (Platform.OS === "android") {
        setTimeout(async () => {
          try {
            await ForegroundServiceModule.startService();
          } catch (err) {
            console.error("[Error starting foreground service:", err);
          }
        }, 300);
      }
    }
  };

  const handleMeetingLeft = () => {
    if (Platform.OS === "android") {
      ForegroundServiceModule.stopService();
    }
    navigation.navigate(SCREEN_NAMES.Join);
  };

  if (Platform.OS === "android" && !permissionsGranted) {
    return (
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{ flex: 1, backgroundColor: colors.primary[900], padding: 12 }}
      />
    );
  }

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
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
