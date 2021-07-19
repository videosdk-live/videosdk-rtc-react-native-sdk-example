import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";
import { API_URL } from "@env";

export default function App() {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getToken = async () => {
    try {
      const response = await fetch(`${API_URL}/get-token`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const { token } = await response.json();
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const validateMeeting = async (token) => {
    try {
      const response = await fetch(`${API_URL}/validate-meeting/${token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const { meetingId } = await response.json();
      return meetingId;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    const token = await getToken();
    const meetingId = await validateMeeting(token);

    setToken(token);
    setMeetingId(meetingId);
  }, []);

  console.log("ID", meetingId);

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
