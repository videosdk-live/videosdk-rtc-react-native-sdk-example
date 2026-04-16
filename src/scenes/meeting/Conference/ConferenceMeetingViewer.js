import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-simple-toast";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import TopBar from "../Components/TopBar/TopBar";
import BottomControls from "../Components/Controls/BottomControls";
import PresenterArea from "./PresenterArea";
import ParticipantGridContainer from "./ParticipantGridContainer";
import ConferenceBottomSheet from "./ConferenceBottomSheet";
import { IOSScreenShareHandler } from "../Hooks/useIOSScreenShare";
import { useOrientation } from "../../../utils/useOrientation";


function ConferenceErrorHandler() {
  useMeeting({
    onError: (data) => {
      const { code, message } = data;
      Toast.show(`Error: ${code}: ${message}`);
    },
  });
  return null;
}

function ConferenceMeetingViewer() {
  const bottomSheetRef = useRef();
  const orientation = useOrientation();
  const [bottomSheetView, setBottomSheetView] = useState("");

  const onParticipantCountPress = useCallback(() => {
    setBottomSheetView("PARTICIPANT_LIST");
    bottomSheetRef.current.show();
  }, []);

  const onChatPress = useCallback(() => {
    setBottomSheetView("CHAT");
    bottomSheetRef.current.show();
  }, []);

  return (
    <>
      <ConferenceErrorHandler />
      <IOSScreenShareHandler />
      <TopBar
        showParticipantCount={true}
        onParticipantCountPress={onParticipantCountPress}
      />
      {/* Center */}
      <View
        style={{
          flex: 1,
          flexDirection: orientation == "PORTRAIT" ? "column" : "row",
          marginVertical: 12,
        }}
      >
        <PresenterArea />
        <ParticipantGridContainer />
      </View>
      <BottomControls onChatPress={onChatPress} />
      <ConferenceBottomSheet
        bottomSheetRef={bottomSheetRef}
        bottomSheetView={bottomSheetView}
        setBottomSheetView={setBottomSheetView}
      />
    </>
  );
}

export default React.memo(ConferenceMeetingViewer);
