import React from "react";
import { SafeAreaView } from "react-native";
import colors from "../../styles/colors";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingViewer from "./Components/MeetingViewer";

export default function ({ navigation }) {
  const token = "PROVIDE_TOKEN";
  const meetingId = "PROVIDE_MEETINGID";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary[900], padding: 18 }}
    >
      <MeetingProvider
        config={{
          meetingId: meetingId,
          participantId: "ahmed@videosdk.live",
          micEnabled: true,
          webcamEnabled: true,
          name: "Demo User",
          notification: {
            title: "Video SDK Meeting",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingViewer />
      </MeetingProvider>
    </SafeAreaView>
  );
}
