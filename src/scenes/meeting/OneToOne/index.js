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

  const [chatViewer, setchatViewer] = useState(false);
  const [participantListViewer, setparticipantListViewer] = useState(false);
  const [participantStatsViewer, setparticipantStatsViewer] = useState(false);
  const [statParticipantId, setstatParticipantId] = useState("");

  const openStatsBottomSheet = useCallback(({ pId }) => {
    setparticipantStatsViewer(true);
    setstatParticipantId(pId);
    bottomSheetRef.current.show();
  }, []);

  const onParticipantPress = useCallback(() => {
    setparticipantListViewer(true);
    bottomSheetRef.current.show();
  }, []);

  const onChatPress = useCallback(() => {
    setchatViewer(true);
    bottomSheetRef.current.show();
  }, []);

  const onBottomSheetClose = useCallback(() => {
    setparticipantListViewer(false);
    setchatViewer(false);
    setparticipantStatsViewer(false);
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
        chatViewer={chatViewer}
        participantListViewer={participantListViewer}
        participantStatsViewer={participantStatsViewer}
        statParticipantId={statParticipantId}
        onClose={onBottomSheetClose}
      />
    </>
  );
}

export default React.memo(OneToOneMeetingViewer);
