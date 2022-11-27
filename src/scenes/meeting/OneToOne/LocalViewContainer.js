import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import { View } from "react-native";
import colors from "../../../styles/colors";
import LargeVideoRTCView from "./LargeView/LargeVideoRTCView";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter";
import MiniVideoRTCView from "./MiniView/MiniVideoRTCView";

export default function LocalViewContainer({ participantId }) {
  const {
    screenShareOn,
    webcamOn,
    webcamStream,
    displayName,
    setQuality,
    isLocal,
  } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

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
          <LocalParticipantPresenter />
          <MiniVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
            isLocal={isLocal}
          />
        </>
      ) : (
        <LargeVideoRTCView
          isOn={webcamOn}
          stream={webcamStream}
          displayName={displayName}
          objectFit={"cover"}
          isLocal={isLocal}
        />
      )}
    </View>
  );
}
