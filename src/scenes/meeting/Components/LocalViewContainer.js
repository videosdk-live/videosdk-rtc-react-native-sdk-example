import { useParticipant } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View } from "react-native";
import colors from "../../../styles/colors";
import LargeVideoRTCView from "./LargeView/LargeVideoRTCView";
import MiniVideoRTCView from "./MiniView/MiniVideoRTCView";

export default function LocalViewContainer({ participantId }) {
  const {
    screenShareOn,
    screenShareStream,
    webcamOn,
    webcamStream,
    displayName,
  } = useParticipant(participantId, {});

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary[800],
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {screenShareOn ? (
        <>
          <LargeVideoRTCView
            stream={screenShareStream}
            isOn={screenShareOn}
            objectFit={"contain"}
          />
          <MiniVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
          />
        </>
      ) : (
        <LargeVideoRTCView
          isOn={webcamOn}
          stream={webcamStream}
          displayName={displayName}
          objectFit={"cover"}

        />
      )}
    </View>
  );
}
