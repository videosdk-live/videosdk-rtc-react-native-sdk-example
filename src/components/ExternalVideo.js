import React, { useRef, useState } from "react";
import Video from "react-native-video";
import { View, Text } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
export default function ExternalVideo({}) {
  const externalPlayer = useRef();

  const [{ link, playing }, setVideoInfo] = useState({
    link: null,
    playing: false,
  });
  const [paused, setPause] = useState(false);

  const seekTo = (duration) => {
    externalPlayer.current &&
      externalPlayer.current.seek &&
      externalPlayer.current.seek(duration);
  };

  const onVideoStateChanged = (data) => {
    const { currentTime, link, status } = data;
    switch (status) {
      case "stopped":
        externalPlayer.current.src = null;
        setVideoInfo({ link: null, playing: false });
        break;
      case "resumed":
        if (typeof currentTime === "number") {
          seekTo(currentTime);
        }
        setPause(false);
        setVideoInfo((s) => ({ ...s, playing: true }));
        break;
      case "paused":
        setPause(true);
        setVideoInfo((s) => ({ ...s, playing: false }));
        break;
      case "started":
        seekTo(currentTime);
        setVideoInfo({ link, playing: true });
        break;
      default:
        break;
    }
  };

  const onVideoSeeked = (data) => {
    const { currentTime } = data;
    if (typeof currentTime === "number") {
      seekTo(currentTime);
    }
  };

  useMeeting({ onVideoStateChanged, onVideoSeeked });

  return link ? (
    <View
      style={{
        height: 300,
      }}
    >
      <Video
        ref={externalPlayer}
        style={{ flex: 1, backgroundColor: "black" }}
        onError={(e) => {}}
        resizeMode={"cover"}
        paused={paused}
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
  ) : null;
}
