import { Platform, NativeModules } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import {
  RoomConsumer,
  RoomProvider,
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
    customMicrophoneTrack,
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
      <RoomProvider
        config={{
          roomId: meetingId,
          micEnabled: micEnabled,
          camEnabled: webcamEnabled,
          participantName: name,
          defaultCamera: defaultCamera,
          customMicrophoneTrack: customMicrophoneTrack,
        }}
        token={token}
      >
        <RoomConsumer
          onRoomJoined={handleMeetingJoined}
          onRoomLeft={handleMeetingLeft}
        >
          {() => (
            <MeetingContainer
              webcamEnabled={webcamEnabled}
              meetingType={meetingType}
            />
          )}
        </RoomConsumer>
      </RoomProvider>
    </SafeAreaView>
  );
}
