import React, { useCallback, useRef, useState } from "react";
import Toast from "react-native-simple-toast";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import TopBar from "../Components/TopBar/TopBar";
import BottomControls from "../Components/Controls/BottomControls";
import ParticipantArea from "./ParticipantArea";
import OneToOneBottomSheet from "./OneToOneBottomSheet";
import { IOSScreenShareHandler } from "../Hooks/useIOSScreenShare";

function OneToOneErrorHandler() {
  useMeeting({
    onError: (data) => {
      const { code, message } = data;
      Toast.show(`Error: ${code}: ${message}`);
    },
  });
  return null;
}

function OneToOneMeetingViewer() {
  const bottomSheetRef = useRef();
  const [bottomSheetView, setBottomSheetView] = useState("");
  const [statParticipantId, setstatParticipantId] = useState("");

  const openStatsBottomSheet = useCallback(({ pId }) => {
    setBottomSheetView("PARTICIPANT_STATS");
    setstatParticipantId(pId);
    bottomSheetRef.current.show();
  }, []);

  const onParticipantPress = useCallback(() => {
    setBottomSheetView("PARTICIPANT_LIST");
    bottomSheetRef.current.show();
  }, []);

  const onChatPress = useCallback(() => {
    setBottomSheetView("CHAT");
    bottomSheetRef.current.show();
  }, []);

  const onBottomSheetClose = useCallback(() => {
    setBottomSheetView("");
    setstatParticipantId("");
  }, []);

  return (
    <>
      <OneToOneErrorHandler />
      <IOSScreenShareHandler />
      <TopBar showParticipantCount={false} />
      {/* Center */}
      <ParticipantArea openStatsBottomSheet={openStatsBottomSheet} />
      <BottomControls
        showParticipantMenuItem={true}
        onParticipantPress={onParticipantPress}
        onChatPress={onChatPress}
      />
      <OneToOneBottomSheet
        bottomSheetRef={bottomSheetRef}
        bottomSheetView={bottomSheetView}
        statParticipantId={statParticipantId}
        onClose={onBottomSheetClose}
      />
    </>
  );
}

export default React.memo(OneToOneMeetingViewer);
