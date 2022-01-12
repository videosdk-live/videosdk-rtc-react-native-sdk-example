import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";
import { VIDEOSDK_API, AUTH_TOKEN, AUTH_URL } from "@env";

export default function App() {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getToken = async () => {
    try {
      const response = await fetch(`${AUTH_URL}/get-token`, {
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
    var auth_token = AUTH_TOKEN ?? "";
    var auth_url = AUTH_URL ?? "";

    console.log("token", auth_token);
    console.log("auth_url", auth_url);
    if (auth_token == "" && auth_url == "") {
      throw Error("Please provide AUTH_TOKEN or AUTH_URL in .env file");
      return;
    }
    if (auth_token != "" && auth_url != "") {
      throw Error("Please provide only AUTH_TOKEN or AUTH_URL in .env file");
      return;
    }

    if (auth_token == "") {
      auth_token = await getToken();
    }

    const meetingId = await createMeeting(auth_token);
    setToken(auth_token);
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
