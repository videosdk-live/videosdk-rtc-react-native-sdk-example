import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";

export default function App() {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getToken = async () => {
    const res = await fetch(`http://localhost:9000/get-token`, {
      method: "GET",
    });

    const { token } = await res.json();
    return token;
  };

  const validateMeeting = async (token) => {
    const res = await fetch(`http://localhost:9000/validate-meeting/${token}`, {
      method: "GET",
    });

    const { meetingId } = await res.json();
    return meetingId;
  };

  useEffect(async () => {
    const token = await getToken();
    const meetingId = await validateMeeting(token);

    setToken(token);
    setMeetingId(meetingId);
  }, []);

  return token ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: "Test User",
          notification: {
            title: "Code Sample",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingContainer setToken={setToken} />
      </MeetingProvider>
    </SafeAreaView>
  ) : null;
}
