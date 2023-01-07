import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { convertRFValue } from "../../../styles/spacing";
import colors from "../../../styles/colors";
import Avatar from "../../../components/Avatar";
import { MicOff, NetworkIcon } from "../../../assets/icons";
import useParticipantStat from "../Hooks/useParticipantStat";

const commonStyle = {
  alignItems: "center",
  position: "absolute",
  top: 10,
  padding: 8,
  height: 26,
  aspectRatio: 1,
  backgroundColor: colors.primary[700],
  borderRadius: 12,
  justifyContent: "center",
};

export default function ParticipantView({
  participantId,
  quality,
  openStatsBottomSheet,
}) {
  const {
    displayName,
    webcamStream,
    webcamOn,
    micOn,
    isLocal,
    setQuality,
    isActiveSpeaker,
    getVideoStats,
    isPresenting,
    micStream,
    getShareStats,
    getAudioStats,
  } = useParticipant(participantId, {});

  const { score } = useParticipantStat({
    participantId,
  });

  const updateStats = async () => {
    let stats = [];
    if (isPresenting) {
      stats = await getShareStats();
    } else if (webcamStream) {
      stats = await getVideoStats();
    } else if (micStream) {
      stats = await getAudioStats();
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (!isLocal) {
        updateStats();
      }
    }, 4000);
  }, []);

  useEffect(() => {
    if (quality) {
      setQuality(quality);
    }
  }, [quality]);

  const MicStatusComponent = () => {
    return (
      <View
        style={{
          ...commonStyle,
          right: 10,
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
      {micOn || webcamOn ? (
        <TouchableOpacity
          style={{
            ...commonStyle,
            left: 10,
            backgroundColor:
              score && score > 7
                ? "#3BA55D"
                : score > 4
                ? "#faa713"
                : "#FF5D5D",
          }}
          onPress={() => {
            openStatsBottomSheet({ pId: participantId });
          }}
        >
          <NetworkIcon fill={"#fff"} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
