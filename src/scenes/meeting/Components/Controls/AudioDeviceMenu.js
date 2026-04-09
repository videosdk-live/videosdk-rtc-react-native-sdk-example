import React, { forwardRef } from "react";
import { View } from "react-native";
import { switchAudioDevice } from "@videosdk.live/react-native-sdk";
import colors from "../../../../styles/colors";
import Menu from "../../../../components/Menu";
import MenuItem from "../MenuItem";

const AudioDeviceMenu = forwardRef(({ audioDevice }, ref) => {
  return (
    <Menu
      ref={ref}
      menuBackgroundColor={colors.primary[700]}
      placement="left"
      left={70}
    >
      {audioDevice.map((device, index) => {
        return (
          <React.Fragment key={device}>
            <MenuItem
              title={
                device == "SPEAKER_PHONE"
                  ? "Speaker"
                  : device == "EARPIECE"
                  ? "Earpiece"
                  : device == "BLUETOOTH"
                  ? "Bluetooth"
                  : "Wired Headset"
              }
              onPress={() => {
                switchAudioDevice(device);
                ref.current.close();
              }}
            />

            {index != audioDevice.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.primary["600"],
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Menu>
  );
});

export default AudioDeviceMenu;
