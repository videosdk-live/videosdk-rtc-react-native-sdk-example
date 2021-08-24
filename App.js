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
      const VIDEOSDK_API_ENDPOINT = `${API_URL}/create-meeting`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      };
      const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
        .then(async (result) => {
          const { meetingId } = await result.json();
          return meetingId;
        })
        .catch((error) => console.log("error", error));
      return response;
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
