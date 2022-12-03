import React from "react";
import { View } from "react-native";
import ParticipantView from "./ParticipantView";
import PauseInvisibleParticipants from "./PauseInvisibleParticipant";

const MemoizedParticipant = React.memo(
  ParticipantView,
  (
    { participantId, quality, key },
    { participantId: oldParticipantId, quality: oldQuality, key: oldkey }
  ) =>
    participantId === oldParticipantId &&
    quality === oldQuality &&
    key === oldkey
);

function ConferenceParticipantGrid({ participantIds }) {
  const participantCount = participantIds.length;

  const perRow = participantCount >= 3 ? 2 : 1;
  const quality =
    participantCount > 4 ? "low" : participantCount > 2 ? "med" : "high";
  return (
    <>
      <PauseInvisibleParticipants visibleParticipantIds={participantIds} />
      {Array.from({ length: Math.ceil(participantCount / perRow) }, (_, i) => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            {participantIds
              .slice(i * perRow, (i + 1) * perRow)
              .map((participantId) => {
                return (
                  <MemoizedParticipant
                    key={participantId}
                    participantId={participantId}
                    quality={quality}
                  />
                );
              })}
          </View>
        );
      })}
    </>
  );
}

export const MemoizedParticipantGrid = React.memo(
  ConferenceParticipantGrid,
  ({ participantIds }, { participantIds: oldParticipantIds }) =>
    JSON.stringify(participantIds) === JSON.stringify(oldParticipantIds)
);
