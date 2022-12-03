import { useMeeting, useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";

const PauseInvisibleParticipant = ({ participantId, isVisible }) => {
  const { webcamStream, webcamOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    if (typeof isVisible === "string") {
      if (!isLocal) {
        if (isVisible) {
          typeof webcamStream?.resume === "function" && webcamStream?.resume();
          // consumeWebcamStreams();
        } else {
          typeof webcamStream?.pause === "function" && webcamStream?.pause();
          // stopConsumingWebcamStreams();
        }
      }
    } else {
      if (!isLocal) {
        typeof webcamStream?.pause === "function" && webcamStream?.pause();
        // stopConsumingWebcamStreams();
      }
    }
  }, [isLocal, isVisible, webcamStream]);

  return <></>;
};

const PauseInvisibleParticipants = ({ visibleParticipantIds }) => {
  const { participants } = useMeeting();

  return (
    <>
      {[...participants.keys()].map((participantId) => {
        return (
          visibleParticipantIds.length > 0 && (
            <PauseInvisibleParticipant
              key={`PauseInvisibleParticipant_${participantId}`}
              participantId={participantId}
              isVisible={visibleParticipantIds.find(
                (pId) => pId === participantId
              )}
            />
          )
        );
      })}
    </>
  );
};

export default PauseInvisibleParticipants;
