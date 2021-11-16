import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import SessionGrid from "./src/components/SessionGrid";
import { REACT_APP_SERVER_URL } from "@env";

export default function App() {
  const [token, setToken] = useState("abc-pqr-xyz");
  const meetingId = "butj-a5gy-6u26";

  useEffect(async () => {
    // setToken();
  }, []);

  return token ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212032" }}>
      <SessionGrid />
    </SafeAreaView>
  ) : null;
}
