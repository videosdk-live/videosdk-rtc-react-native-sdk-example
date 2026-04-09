import React from "react";
import { Dimensions } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import BottomSheet from "../../../components/BottomSheet";
import ChatViewer from "../Components/ChatViewer";
import ParticipantListViewer from "../Components/ParticipantListViewer";

export default function ConferenceBottomSheet({
  bottomSheetRef,
  bottomSheetView,
  setBottomSheetView,
}) {
  const { participants } = useMeeting({});

  return (
    <BottomSheet
      sheetBackgroundColor={"#2B3034"}
      draggable={false}
      radius={12}
      hasDraggableIcon
      closeFunction={() => {
        setBottomSheetView("");
      }}
      ref={bottomSheetRef}
      height={Dimensions.get("window").height * 0.5}
    >
      {bottomSheetView === "CHAT" ? (
        <ChatViewer />
      ) : bottomSheetView === "PARTICIPANT_LIST" ? (
        <ParticipantListViewer participantIds={[...participants.keys()]} />
      ) : null}
    </BottomSheet>
  );
}
