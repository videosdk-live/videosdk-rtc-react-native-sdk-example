import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { Copy } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import Toast from "react-native-simple-toast";

function MeetingIdDisplay() {
  const { meetingId } = useMeeting({});

  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: ROBOTO_FONTS.RobotoBold,
          color: colors.primary[100],
        }}
      >
        {meetingId ? meetingId : "xxx - xxx - xxx"}
      </Text>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          marginLeft: 10,
        }}
        onPress={() => {
          Clipboard.setString(meetingId);
          Toast.show("Meeting Id copied Successfully");
        }}
      >
        <Copy fill={colors.primary[100]} width={18} height={18} />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(MeetingIdDisplay);
