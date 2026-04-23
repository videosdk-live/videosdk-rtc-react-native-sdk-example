import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import {
  switchAudioDevice,
  useMediaDevice
} from "@videosdk.live/react-native-sdk";
import colors from "../../../../styles/colors";
import Menu from "../../../../components/Menu";
import MenuItem from "../MenuItem";

const AudioDeviceMenu = forwardRef((_, ref) => {

  const { getAudioDeviceList } = useMediaDevice();
  const menuRef = useRef();
  const [audioDevice, setAudioDevice] = useState([]);

  useImperativeHandle(ref, () => ({
    show: async () => {
      const devices = await getAudioDeviceList();
      setAudioDevice(devices);
      menuRef.current.show();
    },
    close: () => {
      menuRef.current.close();
    },
  }));

  return (
    <Menu
      ref={menuRef}
      menuBackgroundColor={colors.primary[700]}
      placement="left"
      left={70}
    >
      {audioDevice.map((device, index) => {
        return (
          <React.Fragment key={device}>
            <MenuItem
              title={device.label}
              onPress={() => {
                switchAudioDevice(device.label);
                menuRef.current.close();
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
