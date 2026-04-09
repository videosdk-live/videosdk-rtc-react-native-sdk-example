import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import VideosdkRPK from "../../../../VideosdkRPK";

// Isolated component — its useMeeting subscription won't cause parent re-renders
export function IOSScreenShareHandler() {
  const { enableScreenShare, disableScreenShare } = useMeeting({});

  useEffect(() => {
    if (Platform.OS == "ios") {
      VideosdkRPK.addListener("onScreenShare", (event) => {
        if (event === "START_BROADCAST") {
          enableScreenShare();
        } else if (event === "STOP_BROADCAST") {
          disableScreenShare();
        }
      });

      return () => {
        VideosdkRPK.removeAllListeners("onScreenShare");
      };
    }
  }, []);

  return null;
}
