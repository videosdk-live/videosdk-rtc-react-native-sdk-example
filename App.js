import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";
import { getToken, createMeeting, validateMeeting } from "./src/api";
import { notifyMessage } from "./src/utils";

export default function App() {
  const [token, setToken] = useState("");
  const [idValue, setIdValue] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const resetMeeting = () => {
    setToken("");
    setMeetingId("");
    setIdValue("");
  };

  const getTokenAndMeetingId = async () => {
    const token = await getToken();
    const meetingId = await createMeeting({ token });
    setToken(token);
    setMeetingId(meetingId);
    if (!token || !meetingId) {
      notifyMessage("Token or Meeting Id is not generated");
    }
  };

  const validateMeetingId = async () => {
    if (idValue) {
      const token = await getToken();
      const meetingId = await validateMeeting({ meetingId: idValue, token });
      setToken(token);
      setMeetingId(meetingId);
      if (!token || !meetingId) {
        notifyMessage("Token or Meeting Id is invalid");
      }
    } else {
      notifyMessage("Please provide meetingId in textinput");
    }
  };

  return token && meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <MeetingProvider
        config={{
          meetingId,
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
        <MeetingContainer resetMeeting={resetMeeting} />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F6F6FF",
        justifyContent: "center",
        paddingHorizontal: 6 * 10,
      }}
    >
      <TouchableOpacity
        onPress={getTokenAndMeetingId}
        style={{ backgroundColor: "#1178F8", padding: 12, borderRadius: 6 }}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
          Create Meeting
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          fontSize: 22,
          marginVertical: 16,
          fontStyle: "italic",
          color: "grey",
        }}
      >
        ---------- OR ----------
      </Text>
      <TextInput
        value={idValue}
        onChangeText={setIdValue}
        placeholder={"XXXX-XXXX-XXXX"}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 6,
          fontStyle: "italic",
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#1178F8",
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={validateMeetingId}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
          Join Meeting
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
