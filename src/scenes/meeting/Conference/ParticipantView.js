import React, { useEffect } from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { convertRFValue } from "../../../styles/spacing";
import colors from "../../../styles/colors";
import Avatar from "../../../components/Avatar";
import { MicOff } from "../../../assets/icons";

export default function ParticipantView({ participantId, quality }) {
  const {
    displayName,
    webcamStream,
    webcamOn,
    micOn,
    isLocal,
    setQuality,
    isActiveSpeaker,
  } = useParticipant(participantId, {});

  useEffect(() => {
    if (quality) {
      setQuality(quality);
    }
  }, [quality]);

  const MicStatusComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          top: 10,
          padding: 8,
          right: 10,
          height: 26,
          aspectRatio: 1,
          backgroundColor: colors.primary[700],
          flexDirection: "row",
          borderRadius: 12,
          justifyContent: "center",
        }}
      >
        <MicOff width={16} height={16} fill={"#fff"} />
      </View>
    );
  };

  const DisplayNameComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 8,
          padding: 8,
          left: 6,
          backgroundColor: "rgba(0,0,0,0.3)",
          flexDirection: "row",
          borderRadius: 5,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: "#fff",
            fontSize: convertRFValue(10),
          }}
        >
          {isLocal ? "You" : displayName || ""}
        </Text>
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
        marginHorizontal: 3,
        marginVertical: 3,
      }}
    >
      {webcamOn && webcamStream ? (
        <>
          <RTCView
            streamURL={new MediaStream([webcamStream.track]).toURL()}
            objectFit={"cover"}
            mirror={isLocal ? true : false}
            style={{
              flex: 1,
              backgroundColor: colors.primary[800],
            }}
          />
          <DisplayNameComponent />
          {micOn && isActiveSpeaker ? (
            <View
              style={{
                backgroundColor: "#00000066",
                position: "absolute",
                top: 10,
                right: 10,
                borderRadius: 16,
              }}
            ></View>
          ) : !micOn ? (
            <MicStatusComponent />
          ) : null}
        </>
      ) : (
        <>
          <Avatar
            fullName={displayName}
            containerBackgroundColor={colors.primary[600]}
            fontSize={24}
            style={{
              backgroundColor: colors.primary[500],
              height: 60,
              aspectRatio: 1,
              borderRadius: 40,
            }}
          />
          <DisplayNameComponent />
          {!micOn ? <MicStatusComponent /> : null}
        </>
      )}
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          borderWidth: isActiveSpeaker ? 2 : 0,
          borderColor: "#5568FE",
          borderRadius: 8,
        }}
      />
    </View>
  );
}
