import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";

export default function ParticipantView({ participantId }) {
  const {
    displayName,
    webcamStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    isMainParticipant,
    setViewPort
  } = useParticipant(participantId, {});

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
        <TextContainer
          fText={"Screen Share :"}
          sText={screenShareOn ? "Yes" : "No"}
        />
        <TextContainer
          fText={"Active Speaker :"}
          sText={isActiveSpeaker ? "Yes" : "No"}
        />
        <TextContainer fText={"Local :"} sText={isLocal ? "Yes" : "No"} />
        <TextContainer
          fText={"Main Participant :"}
          sText={isMainParticipant ? "Yes" : "No"}
        />
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
      }}
    >
      {screenShareOn ? (
        <>
          <View style={{ flexDirection: "row", flex: 1 }}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              if (!isLocal && webcamStream) {
                setViewPort(width, height);
              }
            }}>
            <RTCView
              streamURL={new MediaStream([webcamStream?.track]).toURL()}
              objectFit={"cover"}
              mirror={isLocal ? true : false}
              style={{
                flex: 0.5,
              }}
            />
            <RTCView
              streamURL={new MediaStream([screenShareStream?.track]).toURL()}
              style={{
                backgroundColor: "black",
                flex: 0.5,
              }}
            />
          </View>
          <InfoOverLay />
        </>
      ) : webcamOn ? (
        <>
          <RTCView
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              if (!isLocal && webcamStream) {
                setViewPort(width, height);
              }
            }}
            streamURL={new MediaStream([webcamStream.track]).toURL()}
            objectFit={"cover"}
            mirror={isLocal ? true : false}
            style={{
              flex: 1,
            }}
          />
          <InfoOverLay />
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: "grey",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
          </View>
          <InfoOverLay />
        </>
      )}
    </View>
  );
}
