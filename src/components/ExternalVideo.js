import React, { useRef, useEffect } from "react";
import Video from "react-native-video";
import { View, Text } from "react-native";
export default function ExternalVideo({ link, currentTime }) {
  const player = useRef();

  const seekTo = (duration) => {
    player.current && player.current.seek && player.current.seek(duration);
  };

  return (
    <View
      style={{
        height: 300,
      }}
    >
      <Video
        ref={player}
        style={{ flex: 1, backgroundColor: "black" }}
        onError={(e) => {}}
        onLoad={() => {
          seekTo(currentTime);
        }}
        resizeMode={"cover"}
        source={{
          uri: link,
        }}
      />
      <View
        style={{
          height: 40,
          backgroundColor: "rgba(0,0,0, 0.5)",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          External Video
        </Text>
      </View>
    </View>
  );
}
