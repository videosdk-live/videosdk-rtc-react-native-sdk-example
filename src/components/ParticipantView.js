import React from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import Person from "../icons/Person";

export default function ParticipantView({ participantId }) {
  const { displayName, webcamStream, webcamOn, micOn, isLocal } =
    useParticipant(participantId, {});

  const TextContainer = ({ fText, sText }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 4,
          marginVertical: 4,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {fText}
        </Text>
        <Text
          style={{
            color: "white",
            marginLeft: 4,
            fontSize: 16,
          }}
        >
          {sText}
        </Text>
      </View>
    );
  };

  const InfoOverLay = () => {
    return (
      <View
        style={{
          backgroundColor: "rgba(0,0,0, 0.5)",
          position: "absolute",
          padding: 12,
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: 8,
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <TextContainer fText={"Name :"} sText={displayName} />
        <TextContainer fText={"Mute :"} sText={micOn ? "No" : "Yes"} />
        <TextContainer fText={"WebCam :"} sText={webcamOn ? "Yes" : "No"} />
        <TextContainer fText={"Local :"} sText={isLocal ? "Yes" : "No"} />
      </View>
    );
  };

  return (
    <View
      key={participantId}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#333244",
      }}
    >
      {webcamOn ? (
        <RTCView
          streamURL={new MediaStream([webcamStream?.track]).toURL()}
          style={{
            backgroundColor: "black",
            flex: 1,
          }}
        />
      ) : (
        <View
          style={{
            backgroundColor: "#333244",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 80,
              aspectRatio: 1,
              backgroundColor: "white",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Person fill={"black"} height={50} width={50} />
          </View>
        </View>
      )}
      <InfoOverLay />
    </View>
  );
}
