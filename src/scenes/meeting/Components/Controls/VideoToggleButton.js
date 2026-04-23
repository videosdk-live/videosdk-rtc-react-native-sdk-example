import React from "react";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { VideoOff, VideoOn } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import IconContainer from "../../../../components/IconContainer";

function VideoToggleButton() {
  const { localWebcamOn, toggleWebcam } = useMeeting({});

  return (
    <IconContainer
      style={{
        borderWidth: 1.5,
        borderColor: "#2B3034",
      }}
      backgroundColor={!localWebcamOn ? colors.primary[100] : "transparent"}
      onPress={() => {
        toggleWebcam();
      }}
      Icon={() => {
        return localWebcamOn ? (
          <VideoOn height={24} width={24} fill="#FFF" />
        ) : (
          <VideoOff height={36} width={36} fill="#1D2939" />
        );
      }}
    />
  );
}

export default React.memo(VideoToggleButton);
