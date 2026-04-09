import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import LocalViewContainer from "./LocalViewContainer";
import LargeView from "./LargeView";
import MiniView from "./MiniView";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter";

function ParticipantArea({ openStatsBottomSheet }) {
  const { participants, localScreenShareOn, presenterId } = useMeeting({});

  const participantIds = [...participants.keys()];
  const participantCount = participantIds ? participantIds.length : null;

  return (
    <View style={{ flex: 1, marginTop: 8, marginBottom: 12 }}>
      {participantCount > 1 ? (
        <>
          {localScreenShareOn ? (
            <LocalParticipantPresenter />
          ) : (
            <LargeView
              participantId={participantIds[1]}
              openStatsBottomSheet={openStatsBottomSheet}
            />
          )}
          <MiniView
            openStatsBottomSheet={openStatsBottomSheet}
            participantId={
              participantIds[localScreenShareOn || presenterId ? 1 : 0]
            }
          />
        </>
      ) : participantCount === 1 ? (
        <LocalViewContainer participantId={participantIds[0]} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
}

export default React.memo(ParticipantArea);
