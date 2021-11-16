import React from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";

export default function ParticipantView({ participantId }) {
  const { webcamOn, webcamStream } = useParticipant(participantId);

  return (
    <View
      key={participantId}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {webcamOn ? (
        <RTCView
          streamURL={new MediaStream([webcamStream?.track]).toURL()}
          objectFit={"cover"}
          style={{ backgroundColor: "black", flex: 1 }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, color: "white" }}>Webcam is off</Text>
        </View>
      )}
    </View>
  );
}
