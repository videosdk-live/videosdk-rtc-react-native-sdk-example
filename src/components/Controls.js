import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CallEnd from "../icons/CallEnd";
import MicOn from "../icons/Micon";
import Micoff from "../icons/Micoff";
import CameraSwitch from "../icons/CameraSwitch";
import VideoEnable from "../icons/VideoEnable";
import More from "../icons/More";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import VideoDisable from "../icons/VideoDisable";

export default function Controls({ exit }) {
  const {
    leave,
    toggleMic,
    toggleWebcam,
    changeWebcam,
    localMicOn,
    localWebcamOn,
  } = useMeeting({});

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          changeWebcam();
        }}
      >
        <CameraSwitch height={25} width={25} fill="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={toggleWebcam}>
        {localWebcamOn ? (
          <VideoEnable height={25} width={25} fill="#FFF" />
        ) : (
          <VideoDisable height={35} width={35} fill="#FFF" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: "red" }]}
        onPress={() => {
          leave();
          exit();
        }}
      >
        <CallEnd height={30} width={30} fill="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={toggleMic}>
        {localMicOn ? (
          <MicOn height={25} width={25} fill="#FFF" />
        ) : (
          <Micoff height={25} width={25} fill="#FFF" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <More />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255, 0.2)",
    alignItems: "center",
    borderRadius: 30,
  },
});
