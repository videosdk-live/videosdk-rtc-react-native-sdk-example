import React from "react";
import { SafeAreaView } from "react-native";
import colors from "../../styles/colors";
import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./MeetingContainer";
import { SCREEN_NAMES } from "../../navigators/screenNames";

export default function ({ navigation, route }) {
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled;
  const webcamEnabled = route.params.webcamEnabled;
  const name = route.params.name;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary[900], padding: 18 }}
    >
      <MeetingProvider
        config={{
          meetingId: meetingId,
          // participantId: "ahmed@videosdk.live",
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name: name,
          notification: {
            title: "Video SDK Meeting",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.navigate(SCREEN_NAMES.Join);
            },
          }}
        >
          {() => {
            return <MeetingContainer webcamEnabled={webcamEnabled} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
