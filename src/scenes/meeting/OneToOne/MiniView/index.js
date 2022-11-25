import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import MiniVideoRTCView from "./MiniVideoRTCView";

export default MiniViewContainer = ({ participantId }) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } =
    useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <MiniVideoRTCView
      isOn={webcamOn}
      stream={webcamStream}
      displayName={displayName}
      isLocal={isLocal}
    />
  );
};
