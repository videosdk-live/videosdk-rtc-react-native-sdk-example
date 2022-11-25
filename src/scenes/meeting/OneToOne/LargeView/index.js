import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import { View } from "react-native";
import colors from "../../../../styles/colors";
import LargeVideoRTCView from "./LargeVideoRTCView";

export default LargeViewContainer = ({ participantId }) => {
  const {
    screenShareOn,
    screenShareStream,
    webcamOn,
    webcamStream,
    displayName,
    setQuality,
    isLocal,
  } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary[800],
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {screenShareOn ? (
        <LargeVideoRTCView
          stream={screenShareStream}
          isOn={screenShareOn}
          displayName={displayName}
          objectFit={"contain"}
          isLocal={isLocal}
        />
      ) : (
        <LargeVideoRTCView
          isOn={webcamOn}
          stream={webcamStream}
          displayName={displayName}
          objectFit={"cover"}
          isLocal={isLocal}
        />
      )}
    </View>
  );
};
