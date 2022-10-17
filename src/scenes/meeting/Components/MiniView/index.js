import { useParticipant } from "@videosdk.live/react-native-sdk";
import React from "react";
import MiniVideoRTCView from "./MiniVideoRTCView";

export default MiniViewContainer = ({ participantId }) => {
  const { webcamOn, webcamStream, displayName } = useParticipant(
    participantId,
    {}
  );

  return (
    <MiniVideoRTCView
      isOn={webcamOn}
      stream={webcamStream}
      displayName={displayName}
    />
  );
};
