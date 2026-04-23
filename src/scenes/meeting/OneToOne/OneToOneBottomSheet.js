import React from "react";
import { Dimensions } from "react-native";
import BottomSheet from "../../../components/BottomSheet";
import ChatViewer from "../Components/ChatViewer";
import ParticipantListViewer from "../Components/ParticipantListViewer";
import ParticipantStatsViewer from "../Components/ParticipantStatsViewer";

export default function OneToOneBottomSheet({
  bottomSheetRef,
  bottomSheetView,
  statParticipantId,
  onClose,
}) {
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
      {bottomSheetView === "CHAT" ? (
        <ChatViewer />
      ) : bottomSheetView === "PARTICIPANT_LIST" ? (
        <ParticipantListViewer />
      ) : bottomSheetView === "PARTICIPANT_STATS" ? (
        <ParticipantStatsViewer participantId={statParticipantId} />
      ) : null}
    </BottomSheet>
  );
}
