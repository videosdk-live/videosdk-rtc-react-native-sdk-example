import React, { useMemo } from "react";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { MemoizedParticipantGrid } from "./ConferenceParticipantGrid";

export default function ParticipantGridContainer() {
  const {
    localParticipant,
    participants,
    pinnedParticipants,
    presenterId,
    activeSpeakerId,
  } = useMeeting({});

  const participantIds = useMemo(() => {
    const pinnedParticipantId = [...pinnedParticipants.keys()].filter(
      (participantId) => {
        return participantId != localParticipant.id;
      },
    );
    const regularParticipantIds = [...participants.keys()].filter(
      (participantId) => {
        return (
          ![...pinnedParticipants.keys()].includes(participantId) &&
          localParticipant.id != participantId
        );
      },
    );
    const ids = [
      localParticipant?.id,
      ...pinnedParticipantId,
      ...regularParticipantIds,
    ].slice(0, presenterId ? 2 : 6);

    if (activeSpeakerId) {
      if (!ids.includes(activeSpeakerId)) {
        ids[ids.length - 1] = activeSpeakerId;
      }
    }
    return ids;
  }, [
    participants,
    activeSpeakerId,
    pinnedParticipants,
    presenterId,
  ]);

  return (
    <MemoizedParticipantGrid
      participantIds={participantIds}
      isPresenting={presenterId != null}
    />
  );
}
