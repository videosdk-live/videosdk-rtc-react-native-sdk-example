import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import MiniVideoRTCView from "./MiniVideoRTCView";

export default MiniViewContainer = ({
  participantId,
  openStatsBottomSheet,
}) => {
  const { setQuality } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <MiniVideoRTCView
      participantId={participantId}
      openStatsBottomSheet={openStatsBottomSheet}
    />
  );
};
