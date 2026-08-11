import { useParticipant } from "@videosdk.live/react-native-sdk";
import React from "react";
import MiniVideoRTCView from "./MiniVideoRTCView";

export default MiniViewContainer = ({
  participantId,
  openStatsBottomSheet,
}) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal, micOn } =
    useParticipant(participantId, {
      onStreamEnabled: async (stream) => {
        if (isLocal || stream?.kind !== "video") return;
        try {
          await setQuality("high");
        } catch (err) {
          console.error("Failed to set quality:", err);
        }
      },
    });

  return (
    <MiniVideoRTCView
      isOn={webcamOn}
      stream={webcamStream}
      displayName={displayName}
      isLocal={isLocal}
      micOn={micOn}
      participantId={participantId}
      openStatsBottomSheet={openStatsBottomSheet}
    />
  );
};
