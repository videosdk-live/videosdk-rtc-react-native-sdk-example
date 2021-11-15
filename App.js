import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingGrid from "./src/components/MeetingGrid";

export default function App() {
  const [token, setToken] = useState("abc-pqr-xyz");
  const [meetingId, setMeetingId] = useState("butj-a5gy-6u26");

  return token ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212032" }}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          name: "Event User",
          micEnabled: false,
          webcamEnabled: true,
          notification: {
            title: "Code Sample",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingGrid />
      </MeetingProvider>
    </SafeAreaView>
  ) : null;
}
