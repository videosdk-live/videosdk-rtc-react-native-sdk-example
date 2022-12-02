import React from "react";
import { View } from "react-native";
import ParticipantView from "./ParticipantView";

const MemoizedParticipant = React.memo(
  ParticipantView,
  ({ participantId }, { participantId: oldParticipantId }) =>
    participantId === oldParticipantId
);

function ConferenceParticipantGrid({ participantIds }) {
  const participantCount = participantIds.length;

  const perRow = participantCount >= 3 ? 2 : 1;

  console.log("NEW COMPONENT === ", participantIds);

  return Array.from(
    { length: Math.ceil(participantCount / perRow) },
    (_, i) => {
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
              return <ParticipantView participantId={participantId} />;
            })}
        </View>
      );
    }
  );
}

export const MemoizedParticipantGrid = React.memo(
  ConferenceParticipantGrid,
  ({ participantIds }, { participantIds: oldParticipantIds }) =>
    JSON.stringify(participantIds) === JSON.stringify(oldParticipantIds)
);
