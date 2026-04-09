import React, { forwardRef } from "react";
import { View } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { Leave, EndForAll } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import Menu from "../../../../components/Menu";
import MenuItem from "../MenuItem";

const LeaveMenu = forwardRef(({ moreOptionsMenuRef }, ref) => {
  const { leave, end } = useMeeting({});

  return (
    <Menu ref={ref} menuBackgroundColor={colors.primary[700]} placement="left">
      <MenuItem
        title={"Leave"}
        description={"Only you will leave the call"}
        icon={<Leave width={22} height={22} />}
        onPress={() => {
          ref?.current?.close();
          leave();
        }}
      />
      <View
        style={{
          height: 1,
          backgroundColor: colors.primary["600"],
        }}
      />
      <MenuItem
        title={"End"}
        description={"End call for all participants"}
        icon={<EndForAll />}
        onPress={() => {
          ref?.current?.close();
          end();
        }}
      />
    </Menu>
  );
});

export default LeaveMenu;
