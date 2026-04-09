import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useMeeting, Constants } from "@videosdk.live/react-native-sdk";
import Lottie from "lottie-react-native";
import recording_lottie from "../../../../assets/animation/recording_lottie.json";
import Blink from "../../../../components/Blink";

export default function RecordingIndicator() {
  const { recordingState } = useMeeting({});
  const recordingRef = useRef();

  useEffect(() => {
    if (recordingRef.current) {
      if (
        recordingState === Constants.recordingEvents.RECORDING_STARTING ||
        recordingState === Constants.recordingEvents.RECORDING_STOPPING
      ) {
        recordingRef.current.start();
      } else {
        recordingRef.current.stop();
      }
    }
  }, [recordingState]);

  const isRecording =
    recordingState === Constants.recordingEvents.RECORDING_STARTED ||
    recordingState === Constants.recordingEvents.RECORDING_STOPPING ||
    recordingState === Constants.recordingEvents.RECORDING_STARTING;

  if (!isRecording) return null;

  return (
    <View style={{ marginRight: 8 }}>
      <Blink ref={recordingRef} duration={500}>
        <Lottie
          source={recording_lottie}
          autoPlay
          loop
          style={{
            height: 30,
            width: 5,
          }}
        />
      </Blink>
    </View>
  );
}
