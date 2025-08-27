import {
  Platform,
  NativeModules,
  PermissionsAndroid,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from "../../styles/colors";
import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./MeetingContainer";
import { SCREEN_NAMES } from "../../navigators/screenNames";
const { ForegroundServiceModule } = NativeModules;

const requestPermissions = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    console.log('Requesting runtime permissions...');
    
    const permissions = [
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ];
    
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    console.log('Permission results:', granted);
    
    const allGranted = Object.values(granted).every(
      permission => permission === PermissionsAndroid.RESULTS.GRANTED
    );
    
    if (allGranted) {
      console.log('All permissions granted');
      return true;
    } else {
      console.log('Some permissions denied:', granted);
      return false;
    }
  } catch (err) {
    console.error('Error requesting permissions:', err);
    return false;
  }
}

export default function ({ navigation, route }) {
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled;
  const webcamEnabled = route.params.webcamEnabled;
  const name = route.params.name;
  const meetingType = route.params.meetingType;
  const defaultCamera = route.params.defaultCamera;

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
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
          {...{
            onMeetingJoined: async () => {
              await requestPermissions();
              if (Platform.OS === "android") {
                await ForegroundServiceModule.startService();
                console.log("Foreground service started successfully");
              }
            },
            onMeetingLeft: () => {
              if (Platform.OS === "android"){
                ForegroundServiceModule.stopService();
                console.log("Foreground service stopped successfully");
              }
              navigation.navigate(SCREEN_NAMES.Join);
            },
          }}
        >
          {() => {
            return (
              <MeetingContainer
                webcamEnabled={webcamEnabled}
                meetingType={meetingType}
              />
            );
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
