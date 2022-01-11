import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";
import { VIDEOSDK_API, AUTH_TOKEN } from "@env";

export default function App() {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const createMeeting = async (token) => {
    try {
      const VIDEOSDK_API_ENDPOINT = `${VIDEOSDK_API}/meetings`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
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
    const token = AUTH_TOKEN;
    const meetingId = await createMeeting(token);
    console.log(`Meeting Id: ${meetingId}`);
    setToken(token);
    setMeetingId(meetingId);
  }, []);

  return token && meetingId ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F6F6FF",
      }}
    >
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
