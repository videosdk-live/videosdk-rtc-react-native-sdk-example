import { Platform, NativeModules } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./MeetingContainer";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import { hasRequiredPermissions } from "../../utils/permissions";
const { ForegroundServiceModule } = NativeModules;

export default function ({ navigation, route }) {
  const {
    token,
    meetingId,
    micEnabled,
    webcamEnabled,
    name,
    meetingType,
    defaultCamera,
  } = route.params;

  // Permissions are requested on the Join screen. Here we only check them
  // (no dialog) and skip the foreground service if they were not granted.
  const handleMeetingJoined = async () => {
    if (Platform.OS === "android") {
      const granted = await hasRequiredPermissions();
      if (!granted) return;
      setTimeout(async () => {
        try {
          await ForegroundServiceModule.startService();
        } catch (err) {
          console.error("[Error starting foreground service:", err);
        }
      }, 300);
    }
  };

  const handleMeetingLeft = () => {
    if (Platform.OS === "android") {
      ForegroundServiceModule.stopService();
    }
    navigation.navigate(SCREEN_NAMES.Join);
  };

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
