import React from "react";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { MicOff, MicOn } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import IconContainer from "../../../../components/IconContainer";

export default function MicToggleButton({ onDropDownPress }) {
  const { localMicOn, toggleMic } = useMeeting({});

  return (
    <IconContainer
      style={{
        paddingLeft: 0,
        height: 52,
      }}
      isDropDown={true}
      onDropDownPress={onDropDownPress}
      backgroundColor={!localMicOn ? colors.primary[100] : "transparent"}
      onPress={() => {
        toggleMic();
      }}
      Icon={() => {
        return localMicOn ? (
          <MicOn height={24} width={24} fill="#FFF" />
        ) : (
          <MicOff height={28} width={28} fill="#1D2939" />
        );
      }}
    />
  );
}
