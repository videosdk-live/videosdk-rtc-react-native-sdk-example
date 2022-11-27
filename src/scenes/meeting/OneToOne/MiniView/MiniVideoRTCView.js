import { RTCView, MediaStream } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View } from "react-native";
import Avatar from "../../../../components/Avatar";
import colors from "../../../../styles/colors";

export default MiniVideoRTCView = ({ stream, isOn, displayName, isLocal }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 160,
        aspectRatio: 0.7,
        borderRadius: 8,
        borderColor: "#ff0000",
        overflow: "hidden",
      }}
    >
      {isOn && stream ? (
        <RTCView
          objectFit="cover"
          zOrder={1}
          mirror={isLocal ? true : false}
          style={{ flex: 1, backgroundColor: "#424242" }}
          streamURL={new MediaStream([stream.track]).toURL()}
        />
      ) : (
        <Avatar
          fullName={displayName}
          containerBackgroundColor={colors.primary[600]}
          fontSize={24}
          style={{
            backgroundColor: colors.primary[500],
            height: 60,
            aspectRatio: 1,
            borderRadius: 40,
          }}
        />
      )}
    </View>
  );
};
