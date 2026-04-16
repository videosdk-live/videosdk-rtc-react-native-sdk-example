import React from "react";
import { TouchableOpacity } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { CameraSwitch } from "../../../../assets/icons";
import colors from "../../../../styles/colors";

function CameraSwitchButton({ style }) {
  const { changeWebcam } = useMeeting({});

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        changeWebcam();
      }}
    >
      <CameraSwitch height={26} width={26} fill={colors.primary[100]} />
    </TouchableOpacity>
  );
}

export default React.memo(CameraSwitchButton);
