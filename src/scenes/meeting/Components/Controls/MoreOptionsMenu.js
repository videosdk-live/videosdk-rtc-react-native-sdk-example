import React, { forwardRef } from "react";
import { View, Platform } from "react-native";
import { useMeeting, Constants } from "@videosdk.live/react-native-sdk";
import { Recording, ScreenShare, Participants } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import Menu from "../../../../components/Menu";
import MenuItem from "../MenuItem";
import VideosdkRPK from "../../../../../VideosdkRPK";

const MoreOptionsMenu = forwardRef(
  ({ showParticipantMenuItem, onParticipantPress }, ref) => {
    const {
      recordingState,
      startRecording,
      stopRecording,
      presenterId,
      localScreenShareOn,
      toggleScreenShare,
    } = useMeeting({});

    return (
      <Menu
        ref={ref}
        menuBackgroundColor={colors.primary[700]}
        placement="right"
      >
        <MenuItem
          title={`${
            !recordingState ||
            recordingState === Constants.recordingEvents.RECORDING_STOPPED
              ? "Start"
              : recordingState === Constants.recordingEvents.RECORDING_STARTING
              ? "Starting"
              : recordingState === Constants.recordingEvents.RECORDING_STOPPING
              ? "Stopping"
              : "Stop"
          } Recording`}
          icon={<Recording width={22} height={22} />}
          onPress={() => {
            if (
              !recordingState ||
              recordingState === Constants.recordingEvents.RECORDING_STOPPED
            ) {
              startRecording();
            } else if (
              recordingState === Constants.recordingEvents.RECORDING_STARTED
            ) {
              stopRecording();
            }
            ref.current.close();
          }}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary["600"],
          }}
        />
        {(presenterId == null || localScreenShareOn) && (
          <MenuItem
            title={`${localScreenShareOn ? "Stop" : "Start"} Screen Share`}
            icon={<ScreenShare width={22} height={22} />}
            onPress={() => {
              ref.current.close();
              if (presenterId == null || localScreenShareOn)
                Platform.OS === "android"
                  ? toggleScreenShare()
                  : VideosdkRPK.startBroadcast();
            }}
          />
        )}
        {showParticipantMenuItem && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: colors.primary["600"],
              }}
            />
            <MenuItem
              title={"Participants"}
              icon={<Participants width={22} height={22} />}
              onPress={() => {
                if (onParticipantPress) onParticipantPress();
                ref.current.close(false);
              }}
            />
          </>
        )}
      </Menu>
    );
  },
);

export default MoreOptionsMenu;
