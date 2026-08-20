import { useMeeting, useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";

const PauseInvisibleParticipant = ({ participantId, isVisible }) => {
  const { webcamStream, webcamOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    (async () => {
      try {
        if (typeof isVisible === "string") {
          if (!isLocal) {
            if (isVisible) {
              if (typeof webcamStream?.resume === "function") {
                await webcamStream.resume();
              }
            } else {
              if (typeof webcamStream?.pause === "function") {
                await webcamStream.pause();
              }
            }
          }
        } else {
          if (!isLocal) {
            if (typeof webcamStream?.pause === "function") {
              await webcamStream.pause();
            }
          }
        }
      } catch (err) {
        console.error("Failed to pause/resume webcam stream:", err);
      }
    })();
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
