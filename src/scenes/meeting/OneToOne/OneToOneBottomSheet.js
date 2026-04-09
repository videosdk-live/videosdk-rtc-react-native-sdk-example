import React from "react";
import { Dimensions } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import BottomSheet from "../../../components/BottomSheet";
import ChatViewer from "../Components/ChatViewer";
import ParticipantListViewer from "../Components/ParticipantListViewer";
import ParticipantStatsViewer from "../Components/ParticipantStatsViewer";

export default function OneToOneBottomSheet({
  bottomSheetRef,
  chatViewer,
  participantListViewer,
  participantStatsViewer,
  statParticipantId,
  onClose,
}) {
  const { participants } = useMeeting({});

  return (
    <BottomSheet
      sheetBackgroundColor={"#2B3034"}
      draggable={true}
      radius={12}
      hasDraggableIcon
      closeFunction={onClose}
      ref={bottomSheetRef}
      height={Dimensions.get("window").height * 0.5}
    >
      {chatViewer ? (
        <ChatViewer />
      ) : participantListViewer ? (
        <ParticipantListViewer participantIds={[...participants.keys()]} />
      ) : participantStatsViewer ? (
        <ParticipantStatsViewer participantId={statParticipantId} />
      ) : null}
    </BottomSheet>
  );
}
